const functions = require('firebase-functions');
const admin = require('firebase-admin');
const bigquery = require('@google-cloud/bigquery')();
const cors = require('cors')({ origin: true });

admin.initializeApp(functions.config().firebase);

const db = admin.database();

exports.receiveTelemetry = functions.pubsub
  .topic('telemetry')
  .onPublish(event => {
    const attributes = event.attributes;
    const message = event.json;

    const deviceId = attributes['deviceId'];

    // Want to eventually calculate IAC
    // https://github.com/pimoroni/bme680/blob/master/examples/indoor-air-quality.py#L54
    const data = {
      temperature: message.temperature,
      pressure: message.pressure,
      humidity: message.humidity,
      gas: message.gas,
      deviceId: deviceId,
      timestamp: message.timestamp
    };

    if (
      message.humidity < 0 ||
      message.humidity > 100 ||
      message.temperature > 100 ||
      message.temperature < -50
    ) {
      return;
    }

    return Promise.all([
      insertIntoBigquery(data),
      updateCurrentDataFirebase(data)
    ]);
  });

function updateCurrentDataFirebase(data) {
  return db.ref(`/devices/${data.deviceId}`).set({
    temperature: data.temperature,
    pressure: data.pressure,
    humidity: data.humidity,
    gas: data.gas,
    timestamp: data.timestamp
  });
}

function insertIntoBigquery(data) {
  const dataset = bigquery.dataset(functions.config().bigquery.datasetname);
  const table = dataset.table(functions.config().bigquery.tablename);
  return table.insert(data);
}

function fetchAverageData() {
  const table = '`iot-project-204111.station_telemetry.raw`';
  const query = `
    SELECT
      TIMESTAMP_TRUNC(data.timestamp, HOUR, 'Europe/London') hourly_data,
      avg(data.temperature) as avg_temp,
      avg(data.humidity) as avg_hum,
      avg(data.gas) as avg_gas,
      avg(data.pressure) as avg_pressure,
      min(data.temperature) as min_temp,
      max(data.temperature) as max_temp,
      min(data.humidity) as min_hum,
      max(data.humidity) as max_hum,
      min(data.pressure) as min_pressure,
      max(data.pressure) as max_pressure,
      count(*) as data_points
    FROM ${table} data
    WHERE data.timestamp between timestamp_sub(current_timestamp, INTERVAL 7 DAY) and current_timestamp()
    group by hourly_data
    order by hourly_data
  `;

  return bigquery
    .query({
      query: query,
      useLegacySql: false
    });
}

function runOrCache(snapshot) {
  if (snapshot.val() && new Date(snapshot.val().lastRead).getDate() < new Date().getDate()) {
    return snapshot.val().data
  } else {
     return fetchAverageData().then(result => {
      db.ref("last_7_days").set({
        data: result[0],
        lastRead: new Date().getTime()
      })

      return result[0]
    });
  }
}

exports.getReportData = functions.https.onRequest((req, res) => {
  db.ref("last_7_days").once('value').then((snapshot) => {
    const rows = runOrCache(snapshot)

    cors(req, res, () => {
      res.json(rows);
    });
    return;
  })
  return;
});

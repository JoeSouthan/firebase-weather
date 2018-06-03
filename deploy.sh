#!/bin/bash

rm -rf public
mkdir public
cd frontend
npm run build
cd ..
firebase deploy

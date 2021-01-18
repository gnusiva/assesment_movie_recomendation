#!/bin/sh

rm -rf api/public/*
cd ui
npm run build
cp -r dist/ui/* ../api/public/

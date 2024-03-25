#!/bin/bash
echo "Waiting for MongoDB to start..."
sleep 10
echo "Initiating replica set..."
if ! mongosh --host mongo1:27017 /mongo-init.js -u rootuser -p rootpass --authenticationDatabase admin; then
    echo "Failed to initiate replica set"
    exit 1
fi
# booking-microservice
[![codecov](https://codecov.io/gh/SmartWasteCollection/booking-microservice/branch/main/graph/badge.svg?token=956ZL89Z2E)](https://codecov.io/gh/SmartWasteCollection/booking-microservice)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/SmartWasteCollection/booking-microservice/Delivery%20and%20Deployment)
![GitHub](https://img.shields.io/github/license/SmartWasteCollection/booking-microservice)

This repository contains the microservice that handles the generation and management of "At Home" collection bookings.

### Usage
To use this microservice you can download the latest release and run it with
```
npm install

npm start
```

Otherwise, you can download the latest package and run it with the command
```
docker run -p 3000:3000 --env-file <your-env-file> ghcr.io/smartwastecollection/booking-microservice:<latest-tag>
```
Your ".env" file must specify the MongoDB connection string in the following environment variable:
```
URI_MONGO_DB
```

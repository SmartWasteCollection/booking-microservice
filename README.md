# booking-microservice
[![codecov](https://codecov.io/gh/SmartWasteCollection/booking-microservice/branch/main/graph/badge.svg?token=956ZL89Z2E)](https://codecov.io/gh/SmartWasteCollection/booking-microservice)
[![GitHub](https://img.shields.io/github/license/SmartWasteCollection/booking-microservice)](/LICENSE)
[![Continuous Integration](https://github.com/SmartWasteCollection/booking-microservice/actions/workflows/ci.yml/badge.svg?event=push)](https://github.com/SmartWasteCollection/booking-microservice/actions/workflows/ci.yml)
[![Continuous Integration](https://github.com/SmartWasteCollection/booking-microservice/actions/workflows/cd.yml/badge.svg?event=push)](https://github.com/SmartWasteCollection/booking-microservice/actions/workflows/cd.yml)
[![GitHub issues](https://img.shields.io/github/issues-raw/SmartWasteCollection/booking-microservice?style=plastic)](https://github.com/SmartWasteCollection/booking-microservice/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/SmartWasteCollection/booking-microservice?style=plastic)](https://github.com/SmartWasteCollection/booking-microservice/pulls)
[![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/SmartWasteCollection/booking-microservice?include_prereleases&style=plastic)](https://github.com/SmartWasteCollection/booking-microservice/releases)

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

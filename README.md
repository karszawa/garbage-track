# Garbage Truck

Remove old tweets automatically.
Run on Google Cloud Functions.

# Deploy

```
gcloud beta functions deploy helloGET --trigger-http
```

Schedule it on cron.

# Dev Daialy

## 1. Set up a project

https://cloud.google.com/functions/docs/quickstart

## 2. Set up config

```
gcloud beta runtime-config configs create twitter
gcloud beta runtime-config configs variables set CONSUMER_KEY hoge --config-name twitter --is-text
gcloud beta runtime-config configs variables set CONSUMER_SECRET hoge --config-name twitter --is-text
gcloud beta runtime-config configs variables set ACCESS_TOKEN hoge --config-name twitter --is-text
gcloud beta runtime-config configs variables set ACCESS_TOKEN_SECRET hoge --config-name twitter --is-text
yarn add @google-cloud/rcloadenv
```

## 3. Get tweets

http://shomi3023.com/2018/01/21/twitter-api-get-tweet/

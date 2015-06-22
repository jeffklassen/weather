# weather
Charting for historic weather data

This project leverages Weather Underground's API and Elasticsearch to give you up to date historical weather charts.

## Prerequisites
### Weather Underground API

You can obtain a free one here: http://www.wunderground.com/weather/api/

I make sure your requests are throttled so you do not excede the max number of requests per day.

### Elasticsearch Node

You need a single elasticsearch node. Installation instructions for ES can be found here: https://www.elastic.co/guide/en/elasticsearch/guide/current/_installing_elasticsearch.html

## Installation

We now need to configure the correct elasticsearch mapping (make sure you are modifying the correct ES Node/Cluster):

```
curl -XPUT 'http://localhost:9200/weather/'
bash server/elasticsearch/mapping.sh
```

Once you have the pre requisites, edit config.js and enter the correct values.

Then install the nodejs dependencies:

```
cd ingest/
npm install
cd ../server
npm install
cd ../
```

To start the ingest process, run:

```
forever ./ingest/weather.js
```

To start the server, run:

```
DEBUG=*:* ./server/server/bin/www
```

Depending on how many locations you are gathering data for, it may take some time to gather enough data for the graphs to look like anything. Check back in an hour or two if things dont look right off the bat.

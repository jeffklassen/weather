
curl -XPUT 'http://localhost:9200/weather/_mapping/current_observation' -d '
{
    "current_observation": {
        "properties": {
            "display_location": {
                "type": "nested",
                "properties": {
                    "city": {
                        "type": "string",
                        "index": "not_analyzed"
                    }
                }
            },
            "wind_gust_mph": {
                "type": "double",
                "store": true,
                "ignore_conflicts": true
            },
            "wind_gust_kph": {
                "type": "double",
                "store": true,
                "ignore_conflicts": true
            },
            "wind_mph": {
                "type": "double",
                "store": true,
                "ignore_conflicts": true
            },
            "wind_kph": {
                "type": "double",
                "store": true,
                "ignore_conflicts": true
            },
            "dewpoint_c": {
                "type": "double",
                "store": true,
                "ignore_conflicts": true
            },
            "dewpoint_f": {
                "type": "double",
                "store": true,
                "ignore_conflicts": true
            },
            "wind_degrees": {
                "type": "double",
                "store": true,
                "ignore_conflicts": true
            },
            "observation_epoch": {
                "type": "long",
                "store": true,
                "ignore_conflicts": true
            }
        }
    }
}
'

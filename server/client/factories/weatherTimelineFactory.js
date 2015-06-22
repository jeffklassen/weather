WeatherTimelineFactory = Object.create(BaseChartFactory);

var timeField = 'observation_epoch';
var weatherField = 'weather';

WeatherTimelineFactory.convertElement = function (startTimestamp, endTimestamp, queryField) {
    var row = {
        c: [
            {
                v: queryField
            },
            {
                v: new Date(startTimestamp * 1000)
            },
            {
                v: new Date(endTimestamp * 1000)
            }
            ]
    };
    return row;
};

WeatherTimelineFactory.getColumns = function () {
    var cols = [
        {
            id: "WeatherType",
            type: "string"
        },
        {
            id: "Start",
            type: "datetime"
        },
        {
            id: "End",
            type: "datetime"
        }
    ];

    return cols;
};
WeatherTimelineFactory.addData = function (observations, queryField, rows, limit) {
    var previousTimestamp;
    var previousWeather;;
    angular.forEach(observations, function (observation) {
        if (previousTimestamp && previousWeather) {
            console.log(previousStartDate, currentTimestamp, observation[weatherField]);
            var currentTimestamp = observation[timeField];
            rows.push(this.convertElement(previousStartDate, currentTimestamp, previousWeather));
            previousTimestamp = currentTimestamp;
            previousWeather = observation[weatherField];
        }
    }, this);

    return rows;
};
weather.factory('WeatherTimelineFactory', function () {
    return WeatherTimelineFactory;
});
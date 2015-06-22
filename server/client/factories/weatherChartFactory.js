WeatherChartFactory = Object.create(BaseChartFactory);

var timeField = 'observation_epoch';

WeatherChartFactory.convertElement = function (timestamp, queryField) {
    var row = {
        c: [
            {
                v: new Date(timestamp * 1000)
                },
            {
                v: queryField
                }
            ]
    };
    return row;
};
WeatherChartFactory.getColumns = function (dataLabel) {
    var cols = [
        {
            id: "t",
            label: "Date",
            type: "datetime"
                    },
        {
            id: "s",
            label: dataLabel,
            type: "number"
                    }
    ];

    return cols;
}
WeatherChartFactory.addData = function (observations, queryField, rows, limit) {

    angular.forEach(observations, function (observation) {
        rows.push(this.convertElement(observation[timeField], observation[queryField]));
    }, this);

    return rows;
};

weather.factory('WeatherChartFactory', function () {
    return WeatherChartFactory;
});
//chart page
weather.controller('WeatherCtrl', function ($scope, apiFactory, WeatherChartFactory) {
    var limit = -1;
    $scope.location;

    var getMostRecent = function () {
        apiFactory.getMostRecent($scope.location, 1)
            .then(function (data) {
                    $scope.mostRecent = data;
                },
                function (error) {
                    // promise rejected
                    console.log('error', error);
                });
    };

    //enumerate all available charts
    apiFactory.getLocationList()
        .then(function (data) {
                $scope.locations = data;
                $scope.location = data[0];
            },
            function (error) {
                // promise rejected
                console.log('error', error);
            });



    $scope.$watch('location', function () {
        $scope.temperatureChart = undefined;
        //do something to update the dom
        if ($scope.location) {
            getMostRecent();
            buildCharts();
        }
    });


    var buildCharts = function () {

        apiFactory.getMostRecent($scope.location, 500)
            .then(function (data) {
                // console.log(data);
                var options = WeatherChartFactory.createOptions('Temperatures Over Time', 'Time', 'Degrees (F)', true);
                $scope.temperatureChart = WeatherChartFactory.createChart('LineChart', options, WeatherChartFactory.getColumns('Temp (F)'), []);
                WeatherChartFactory.addData(data, 'temp_f', $scope.temperatureChart.data.rows, limit);

                options = WeatherChartFactory.createOptions('Pressure Over Time', 'Time', 'Pressure', false);
                $scope.pressureChart = WeatherChartFactory.createChart('LineChart', options, WeatherChartFactory.getColumns('Pressure'), []);
                WeatherChartFactory.addData(data, 'pressure_in', $scope.pressureChart.data.rows, limit);


            }, function (error) {
                // promise rejected
                console.log('error', error);
            });
    }

});
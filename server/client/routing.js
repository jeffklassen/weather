weather.config(function ($routeProvider) {
    $routeProvider
        .when('/weather', {
            controller: 'WeatherCtrl',
            templateUrl: '/client/views/weather.html'
        })
        .otherwise({
            redirectTo: '/weather'
        });
});
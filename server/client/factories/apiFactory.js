weather.factory('apiFactory', function ($http, $q, BASEURL, HTTPMETHOD) {
    getUrl = function (url, method, postData) {
        var succussMethod = function (response) {
            return response.data;
        };

        var failureMethod = function (response) {
            // something went wrong
            return $q.reject(response.data);
        };

        //default to get
        if (!method) {
            method = HTTPMETHOD.GET;
        }

        console.log(url + "  " + method);

        var httpMethod;
        if (method == HTTPMETHOD.GET) {
            return $http.get(BASEURL.url + url).then(succussMethod, failureMethod);
        } else if (method == HTTPMETHOD.POST) {
            return $http.post(BASEURL.url + url, postData).then(succussMethod, failureMethod);

        }
    };
    return {

        getLocationList: function () {
            return getUrl('/locations');
        },
        getMostRecent: function (location, count) {
            return getUrl('/mostrecent/' + location + '/' + count);
        }
    };
});
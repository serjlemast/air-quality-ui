'use strict';

app.factory('restService', ['$http', '$location', function ($http) {
    let Response = {};

    let api = window.__env.API_BASE_URL;
    let apiPath = api + '/v1/api';

    Response.get = function (url) {
        return $http.get(apiPath.concat(url));
    };

    Response.post = function (url, inData) {
        return $http.post(apiPath.concat(url), inData);
    };

    return Response;
}]);
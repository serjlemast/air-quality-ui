'use strict';

app.factory('websocketService', function ($rootScope, $location) {
    let api = window.__env.API_WS_URL;
    let wsProtocol = $location.protocol() === "https" ? "wss://" : "ws://";
    // let newWsUrl = wsProtocol + api + ":" + $location.port() + "/sensor-data";
    let newWsUrl = wsProtocol + api + "/sensor-data";
    let service = {
        data: {}, connect: function () {
            let socket = new WebSocket(newWsUrl);

            socket.onopen = function () {
                console.log("WebSocket connected!");
            };

            socket.onmessage = function (event) {
                let data = JSON.parse(event.data);
                $rootScope.$apply(function () {
                    service.data = data;
                });
            };

            socket.onerror = function (error) {
                console.error("WebSocket Error:", error);
            };

            socket.onclose = function () {
                console.log("WebSocket closed!");
            };
        }
    };

    return service;
});
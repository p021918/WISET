/*global define */
define(['angular', './sample-module'], function (angular, module) {
    'use strict';
    /**
     * PredixViewService is a sample angular service that integrates with Predix View Service API
     */
    module.factory('PredixTimeseriesService', ['$http', '$q', '$log', function ($http, $q, $log) {
        return {
            baseUrl: '/api/timeseries-service/datapoints',

            query: function (content) {
                var deferred = $q.defer();
                $http.post(this.baseUrl, content)
                    .then(function (res) {
                            $log.debug('query result', res.data);
                            deferred.resolve(res.data);
                        },
                        function () {
                            deferred.reject();
                        });
                return deferred.promise;
            },
        };
    }]);
});

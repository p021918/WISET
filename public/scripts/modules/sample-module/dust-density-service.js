define(['angular', './sample-module'], function (angular, module) {
    'use strict';
    module.factory('DustDensityService', ['$http', '$q', '$log', 'PredixTimeseriesService', function ($http, $q, $log, PredixTimeseriesService) {

        function getDustDensity(dateTime, tag) {
            var timestamp = Date.parse(dateTime);
            var content = {
                'tags': [
                    {
                        'name': tag,
                        'limit': 1
                    }
                ],
                'start': timestamp
            };
            $log.debug('content', content);
            return PredixTimeseriesService.query(content);
//            return getFakeData(dateTime, location);
        }

        function getDustValuesLiveData() {
            var content = {
                'tags': [
                    {
                        'name': 'dust'
                    }
                ],
                'start': parseInt(new Date().getTime()) - (5 * 60 * 1000) // 5 minutes
            };
            return PredixTimeseriesService.query(content);
        }

        function getFakeData(dateTime, location) {

            var maxVal = 170;
            var minVal = 10;

            var deferred = $q.defer();

            deferred.resolve({
                location: location,
                dateTime: dateTime,
                value: Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal
            });

            return deferred.promise;
        }

        return {
            'getDustValuesLiveData': getDustValuesLiveData,
            'getDustDensity': getDustDensity,
            'createFakeData': getFakeData
        };
    }]);
});

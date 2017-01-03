define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('LiveDustDensityCtrl', ['$scope', '$log', '$interval', 'DustDensityService', function ($scope, $log, $interval, DustDensityService) {

        // $scope.chartData = [
        //     {x: 1465416480000, y: 0},
        //     {x: 1465416540000, y: 0.897277832},
        //     {x: 1465416600000, y: 1},
        //     {x: 1465416660000, y: 2},
        //     {x: 1465416720000, y: 1},
        //     {x: 1465416780000, y: 0.897697449},
        //     {x: 1465416840000, y: 0.897796631}
        // ];

        $scope.liveChartData = [];

        function convertToChartData(timeseriesResponse) {
            var values = timeseriesResponse.tags[0].results[0].values;
            var liveChartData = [];

            for (var i = 0; i < values.length; ++i) {
                liveChartData.push({
                    x: values[i][0],
                    y: values[i][1]
                });
            }

            return liveChartData;
        }

        function updateDensityChartData() {
            DustDensityService.getDustValuesLiveData().then(
                function (data) {
                    $scope.liveChartData = [];
                    $scope.liveChartData = convertToChartData(data);
                },
                function (message) {
                    $log.error(message);
                }
            );
        }

        updateDensityChartData();

        $interval(updateDensityChartData, 5000, 0);
    }]);
});

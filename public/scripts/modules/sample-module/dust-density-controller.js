define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('DustDensityCtrl', ['$scope', '$log', 'DustDensityService', function ($scope, $log, DustDensityService) {

        var placeData = {
            /*
             lat: 37.517399 lng: 127.040599
             value range [75, 130] unit: um
             */
            'gangnam-guchung': '강남구청역',
            /*
             lat: 37.4978431 lng: 127.0278915
             value range [120, 160] unit: um
             */
            'gangnam-station': '강남역 2호선',
            /*
             lat: 37.394762 lng: 127.108943
             value range [40, 90] unit: um
             */
            'pangyo-station': '판교역 신분당선'
        };

        var placeTagMap = {
            '강남구청역': 'dust:bike-1',
            '강남역 2호선': 'dust:bike-2',
            '판교역 신분당선': 'dust:bike-3'
        };

        $scope.places = [];
        for (var k in placeData) {
            var v = placeData[k];
            $scope.places.push({
                'key': k,
                'val': v
            });
        }

        $scope.location = '';
        $scope.dateTime = '';
        $scope.dustInfo = '';
        $scope.threshGood = 30;
        $scope.threshSoso = 80;
        $scope.threshBad = 150;

        $scope.updateData = function () {
            var tag = placeTagMap[$scope.location];
            DustDensityService.getDustDensity($scope.dateTime, tag).then(
                function (data) {
                    $log.debug('data', data);
                    $log.debug('dustInfo', data.tags[0].results[0].values);
                    $scope.dustInfo = {
                        value: data.tags[0].results[0].values[0][1],
                        location: $scope.location,
                        dateTime: $scope.dateTime
                    };
                },
                function () {
                    $scope.dustInfo = '';
                }
            );
        };
    }]);
});

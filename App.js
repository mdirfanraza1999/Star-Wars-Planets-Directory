        angular.module('planetsApp', [])
            .controller('PlanetsController', function ($scope, $http) {
                $scope.currentPage = 1;
                $scope.totalPages = 0;
                $scope.planets = [];

                $scope.fetchPlanets = function () {
                    $http.get(`https://swapi.dev/api/planets/?format=json&page=${$scope.currentPage}`)
                        .then(function (response) {
                            $scope.planets = response.data.results;
                            $scope.totalPages = Math.ceil(response.data.count / response.data.results.length);
                            $scope.pages = Array.from({ length: $scope.totalPages }, (_, i) => i + 1);
                        })
                        .catch(function (error) {
                            console.error('Error fetching planets:', error);
                        });
                };

                $scope.prevPage = function () {
                    if ($scope.currentPage > 1) {
                        $scope.currentPage--;
                        $scope.fetchPlanets();
                    }
                };

                $scope.nextPage = function () {
                    if ($scope.currentPage < $scope.totalPages) {
                        $scope.currentPage++;
                        $scope.fetchPlanets();
                    }
                };

                $scope.setPage = function (page) {
                    $scope.currentPage = page;
                    $scope.fetchPlanets();
                };

                // Initial fetch
                $scope.fetchPlanets();
            });

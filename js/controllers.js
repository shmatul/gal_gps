function Welcome($scope,geolocation){
    console.log("uo");
    var intervalId = setInterval(function () {
        geolocation.getCurrentPosition(function (position) {
            $scope.position = position;
        });
    }, 100);
    
    $scope.$on('$destroy', function () {
        clearInterval(intervalId);
    });
}
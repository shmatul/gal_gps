function Welcome($scope,geolocation){

    var intervalId = setInterval(function () {
        conole.log("call");
        geolocation.getCurrentPosition(function (position) {
            $scope.position = position;
            console.log(position);
        });
    }, 100);
    
    $scope.$on('$destroy', function () {
        clearInterval(intervalId);
    });
}
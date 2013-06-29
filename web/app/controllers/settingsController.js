define([], function() {
	return ['$scope', '$http', function($scope, $http) {
		console.log('settingsController.js loading...');
		// Access the scope of controller from here.
		$scope.message = 'Settings page';

		$scope.getAuthUrl = function() {
			$http({
				method: 'GET',
				url: 'http://localhost:8080/gapi/authUrl',
				withCredentials: false
			}).success(function(data) {
				if (data.url) window.location = data.url;
			});
			return 'http://localhost:8080/gapi/authUrl';
		};

		// Because this has happened asynchronously we've missed
		// Angular's initial call to $apply after the controller has been loaded,
		// hence we need to explicitly call it at the end of our Controller constructor.
		$scope.$apply();
	}];
});
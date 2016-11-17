angular.module('itemController', [])

	// inject the item service into the controller
	.controller('mainController', ['$scope','$http','Items', function($scope, $http, Items) {
		$scope.formData = {};
		$scope.loading = true;

		// Get List *************************************
		// when opening page load all grocery list items
		// **********************************************
		Items.get()
			.success(function(data) {
				$scope.items = data;
				$scope.sum = getSum("qty", data);
				$scope.estCost = getSum("cost", data);
				$scope.loading = false;
			});

		// Add Item *************************************************
		// submit the form and make sure the name text contains info
		// **********************************************************
		$scope.createItem = function() {

			// validate the formData to make sure that something is there
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function
				Items.create($scope.formData)

					// if successfully added get all items to display updates
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form
						$scope.items = data;
						$scope.sum = getSum("qty", data);
						$scope.estCost = getSum("cost", data);
					});
			}
		};

		// Delete Item ***********************
		// delete a todo after clicking the X
		// ***********************************
		$scope.deleteItem = function(id) {
			$scope.loading = true;

			Items.delete(id)
				// if delete works, get all the items
				.success(function(data) {
					$scope.loading = false;
					$scope.items = data;
					$scope.sum = getSum("qty", data);
					$scope.estCost = getSum("cost", data);
				});
		};		
	}]);
	
	
function getSum(key, obj) {
    var sum = 0;
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop) && key === prop) {
            sum += obj[prop];
        }
        else if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            sum += getSum(key, obj[prop]);
        }
    }
    return sum;
}
angular.module('hawkEye', []).controller('processorController', function($scope) {
   
			$scope.readTextFile = function()
			{
			    var rawFile = new XMLHttpRequest();
			    rawFile.open("GET", "file:///C:/Users/dbatheja/HawkEye/Processors.txt", false);
			    rawFile.onreadystatechange = function ()
			    {
			        if(rawFile.readyState === 4)
			        {
			            if(rawFile.status === 200 || rawFile.status == 0)
			            {
			                var allText = rawFile.responseText;
			                //alert(allText);
			               $scope.processors =  JSON.parse(allText);
			               $scope.acquirers = $scope.processors[0].acquirers;
			            }
			        }
			    }
			    rawFile.send(null);

			};
			$scope.processorChanged = function()
			{	
				var i = $scope.getAcquirers(this.$$childTail.title);
				$scope.acquirers = $scope.processors[i].acquirers;
				console.log("processorChanged" + this.$$childTail.title);
				
			};
			$scope.getAcquirers = function(title)
			{
				var arrayP = $scope.processors;
				for (var i = 0; i < arrayP.length; i++) {
   				 if(arrayP[i].name == title)
   				 {
   				 	return i;
   				 }

    
				}
				return 0;

			};


    
   //  [{"name":"Fdms","acquirers":["HSBC","WF"]}];

})

.directive('acquirer',function()

	{
	return {
		scope:{title : '@'},
    restrict: 'E',
    templateUrl: 'templates/acquirer.html',
    link: function(scope, element, attrs) {
        $compile(element.contents())(scope.$new());
    }
  		};


	})
.directive('processor',function(){
	return {
		scope:{title : '@', method: '&' },
    restrict: 'E',
    templateUrl: 'templates/processor.html',
    link: function(scope, element, attrs) {
        $compile(element.contents())(scope.$new());
    }
  		};

})
;
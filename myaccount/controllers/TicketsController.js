TicketsController = function(scope,RequestSender,rootScope) {
		  
		  if(rootScope.selfcare_sessionData){
			  scope.clientId = rootScope.selfcare_sessionData.clientId;
			  scope.ticketsData = [];
			  RequestSender.ticketResource.query({clientId: scope.clientId},function(data) {	        
				  scope.ticketsData = data;
				  angular.forEach(scope.ticketsData,function(val,key){
					  scope.ticketsData[key].ticketDate = filter('DateFormat')(val.ticketDate);
				  });
			  });
		  }
    };
    
selfcareApp.controller('TicketsController', ['$scope',
                                             'RequestSender',
                                             '$rootScope',
                                             TicketsController]);

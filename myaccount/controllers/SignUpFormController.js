SignUpFormController = function(scope,RequestSender,HttpService,rootScope,authenticationService,$modal) {

		  rootScope.signUpCredentials = {};
		  
		  //set the default values
		  scope.isProcessing  = false;
		  
		 //adding returnUrl to signUpCredentials form model returnURL.js
     	 scope.returnURL = selfcareModels.returnURL; 
		  
		  //submit functionality
          scope.submitEmail = function(){
        	  
        	  rootScope.signupErrorMsgs = [];rootScope.loginErrorMsgs = [];rootScope.infoMsgs = [];rootScope.popUpMsgs = [];
        	  
        	  if(rootScope.signUpCredentials.userName){
        		  rootScope.signUpCredentials.returnUrl = scope.returnURL+"/"+rootScope.signUpCredentials.userName+"/";
	        	  
	        	  authenticationService.authenticateWithUsernamePassword(function(data){
	        		  
	        		  scope.isProcessing  = true;
	    		  	 RequestSender.registrationResource.save(rootScope.signUpCredentials,function(successData){
	        			  scope.isProcessing  = false;
	        			  rootScope.signUpCredentials = {};
	        		 //popUp open
	        			  $modal.open({
	        		  	                templateUrl: 'messagespopup.html',
	        		  	                controller: approve,
	        		  	                resolve:{}
	        		  	         });
	        		      	function  approve($scope, $modalInstance) {
	        		      		rootScope.popUpMsgs.push({
	        		      			'image' : '../images/info-icon.png',
	        		      			'names' : [{'name' : 'title.thankyou'},
	        		      			           {'name' : 'title.conformation.registration'},
	        		      			           {'name' : 'title.conformation.email'},
	        		      			           {'name' : 'title.conformation.activation.link'}]
	        		      		});
	        		      		$scope.approve = function () { 
	        		      			 $modalInstance.dismiss('cancel');
	        		      		};
	        		        }  
	        			  
			          },function(errorData){
			        	  scope.isProcessing  = false;
			        	  rootScope.signUpCredentials = {};
			        	  $modal.open({
  		  	                templateUrl: 'messagespopup.html',
  		  	                controller: approve,
  		  	                resolve:{}
  		  	            });
  		            	function  approve($scope, $modalInstance) {
  		            	  rootScope.popUpMsgs.push({
		  						'image' : '../images/warning-icon.png',
		  						'names' : [{'name' : 'title.conformation.alreadyregistration'},
		  						           {'name' : 'title.login.msg'}]
	                     });
  		      		     $scope.approve = function () {
  		      		    	 $modalInstance.dismiss('cancel');
  		      		     };
  		              }    
			        });
	    		  });
        	  }else{
				  rootScope.signupErrorMsgs.push({"name":'title.fill.emailid'});
        	  }
          };
          
          $('#emailId').keypress(function(e) {
              if(e.which == 13) {
                  scope.submitEmail();
              }
           });
         
    };
selfcareApp.controller('SignUpFormController', ['$scope',
                                                'RequestSender',
                                                'HttpService',
                                                '$rootScope',
                                                'AuthenticationService',
                                                '$modal',
                                                SignUpFormController]);

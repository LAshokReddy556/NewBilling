(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateFeeMasterController: function(scope,webStorage, resourceFactory, location,$rootScope) {
		  
		  scope.chargeDatas,scope.regionDatas,scope.transactionTypeDatas = [];
		  scope.formData = {};
		  resourceFactory.feeMasterTemplateResource.get(function(data){
			 scope.chargeDatas = data.chargeDatas;
			 scope.regionDatas = data.regionDatas;
			 scope.transactionTypeDatas = data.transactionTypeDatas;
		  });
		  
		  scope.regionalPriceFormData={};scope.regionPrices = [];
		  scope.addReginalPrice = function () {
	           if (scope.regionalPriceFormData.regionId && scope.regionalPriceFormData.amount) {
	        	   
	                scope.regionPrices.push({regionId:scope.regionalPriceFormData.regionId, 
	                							amount:scope.regionalPriceFormData.amount
	                });
	              
	                scope.regionalPriceFormData.regionId = undefined;
	                scope.regionalPriceFormData.amount = undefined;
	                
	          	}
	       };
        scope.removeRegionPrices = function (index) {
            scope.regionPrices.splice(index,1);
          };
          
        scope.submit = function() {
          	 scope.formData.regionPrices =[];
          	 if (scope.regionPrices.length > 0) {
                   for (var i in scope.regionPrices) {
                	   
                     scope.formData.regionPrices.push({
                    	 								regionId:scope.regionPrices[i].regionId, 
                    	 								amount:scope.regionPrices[i].amount,
                    	 								locale:$rootScope.locale.code
                    	 							});
                   };
                 }
          	 
          	scope.formData.locale = $rootScope.locale.code;
             resourceFactory.feeMasterResource.save(scope.formData,function(data){
              location.path('/viewfeemaster/'+data.resourceId);
            });
          };
          
	  }
  });
  mifosX.ng.application.controller('CreateFeeMasterController', ['$scope','webStorage', 'ResourceFactory', '$location','$rootScope', mifosX.controllers.CreateFeeMasterController]).run(function($log) {
    $log.info("CreateFeeMasterController initialized");
  });
}(mifosX.controllers || {}));
(function(module) {
	mifosX.controllers = _.extend(module, {

		ViewPartnerController : function(scope, routeParams, rootScope,	resourceFactory, webStorage) {

			scope.agreements = [];
			scope.officeFinanceTrans = [];

			/* var callingTab = webStorage.get('callingTab', null);
			if (callingTab == null) {
				callingTab = "";
			} else {
				scope.displayTab = callingTab.someString;
				if (scope.displayTab == "Agreement") {
					scope.AgreementTab = true;
					webStorage.remove('callingTab');
				}
			}*/

			resourceFactory.partnerResource.get({partnerId : routeParams.id}, function(data) {
				scope.partner = data;
				scope.officeId = scope.partner.officeId;
				webStorage.add("partnerName", scope.partner.partnerName);
                
				//for agreement data
				resourceFactory.agreementResource.get({partnerId : scope.officeId}, function(data) {
					scope.agreements = data;
				});

			});

			//for office finance Transactions
			scope.getFinancialData = function() {

				resourceFactory.officeFinancialTransactionResource.get({officeId : scope.officeId}, function(data) {
					scope.officeFinanceTrans = data;
				});
				
				scope.partnersTab = function() {
					
					webStorage.add("callingTab", {someString : "Partners"});
				};
			};

		}
	});
	mifosX.ng.application.controller(
			'ViewPartnerController',
			[ '$scope', '$routeParams', '$rootScope', 'ResourceFactory',
					'webStorage', mifosX.controllers.ViewPartnerController ])
			.run(function($log) {
				$log.info("ViewPartnerController initialized");
			});
}(mifosX.controllers || {}));
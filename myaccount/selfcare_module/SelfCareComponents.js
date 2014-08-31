define(['underscore', 'selfcare'], function() {
  var components = {
	  
    selfcare_models:      [
							  'LoggedInUser',
							  'roleMap',
							  'Langs',
							  'paypalUser',
						      'paypalUser',
						      'returnURL',
						      'dalpayURL'
				          ],
				     
    selfcare_services:    [
						      'RequestSender',
						      'HttpServiceProvider',
						      'AuthenticationService',
						      'SessionManager',
						      'NavigationPage'
					      ],
					    
    selfcare_controllers: [
                           	  'main/SelfCareMainController',
						      'main/SignInFormController',
						      'main/SignUpFormController',
						      'main/RegistrationSuccessFormController',
						      'main/ActivateUserController',
						      'main/PaymentButtonsController',
						      'main/ActiveClientPreviewScreenController',
						      'main/ProfileController',
						      'main/OrdersController',
						      'main/StatementsController',
						      'main/PaymentsController',
						      'main/TicketsController',
						      'main/CreateTicketController',
						      'main/ChangePasswordController',
						      'main/AdditionalOrdersController',
						      'main/AdditionalOrdersPreviewScreenController',
						      'main/EventDetailsPreviewScreenController',
						      'main/HomeController',
						      'main/VODEventsController',
						      'main/ViewOrderController',
						      'main/ChangeOrderController',
						      'main/CloseClientController'
					      ],
					      
    selfcare_filters:    [
                       	      'DateFormat',
                       	      'StatusLookup'
                         ],
                       
    selfcare_directives: [
						      'LateValidateDirective',
						      'ScrollbarTopDirective',
						      'NgAutoFocusFunDirective'
					     ]
  };
  
  require(_.reduce(_.keys(components), function(list, group) {
    return list.concat(_.map(components[group], function(name) { return group + "/" + name; }));
  }, ['routeProvider','initialTasks','webstorage-configuration']
  ));
});

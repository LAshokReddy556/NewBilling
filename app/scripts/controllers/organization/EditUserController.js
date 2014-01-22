(function(module) {
  mifosX.controllers = _.extend(module, {
    EditUserController: function(scope, routeParams, resourceFactory, location) {
        scope.offices = [];
        scope.availableRoles = [];
        scope.user = [];
        scope.selectedRoles = [];
        resourceFactory.userListResource.get({userId: routeParams.id, template: 'true'} , function(data) {
            scope.formData = data;
            scope.userId = data.id;
            scope.offices = data.allowedOffices;
            scope.availableRoles = data.availableRoles.concat(data.selectedRoles);
            scope.selectedRoles = data.selectedRoles;

        });
        scope.submit = function() {
             delete this.formData.allowedOffices; // removing allowed office list
             delete this.formData.availableRoles; // removing allowed roles list 
             delete this.formData.officeName;     //
            // delete this.formData.id;     //
            // removing elected roles to re-format

             // reformatting selected roles
             var userId = this.formData.id;
             delete this.formData.id; 

             var roles = [];
             
             for(var i=0; i< this.formData.selectedRoles.length; i++){
            	
                    roles.push(this.formData.selectedRoles[i].id);
             }
             delete this.formData.selectedRoles;
             this.formData.roles = roles;

             resourceFactory.userListResource.update({'userId':  routeParams.id},this.formData,function(data){
                location.path('/viewuser/' + routeParams.id);
             });
        };
    }
  });
  mifosX.ng.application.controller('EditUserController', ['$scope', '$routeParams', 'ResourceFactory', '$location', mifosX.controllers.EditUserController]).run(function($log) {
    $log.info("EditUserController initialized");
  });
}(mifosX.controllers || {}));

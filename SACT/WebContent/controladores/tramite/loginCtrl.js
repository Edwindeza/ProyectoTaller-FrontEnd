appbase.controller('loginCtrl', function($http,$modal,$log,$rootScope,$scope,growl){
	 	 
	 $scope.datos={email:"fernando.supo6@gmail.com",password:"fsupo"}
	 
	 $rootScope.listaFiscales={};
	 $rootScope.login=false;
	 
	 $rootScope.windowLogin=true;
	 
	 $rootScope.toke="";

	 $rootScope.token='';
	 $rootScope.idUsuario='';

	 this.login=function(){
		  var datoLogin = JSON.stringify($scope.datos);
		  $http.post("http://138.197.17.11/api/login/",datoLogin).then(function(response){
		  		$rootScope.token=response.data.token;
		  		$rootScope.idUsuario=response.data.id;
		  		console.log($rootScope.idUsuario)
			    growl.addErrorMessage("Login Correcto.");
				$rootScope.validarMenu=true;
				$rootScope.windowLogin=false;
			}, function(response){
				growl.addErrorMessage("Error de consulta.");
				$rootScope.validarMenu=false;
				$rootScope.windowLogin=true;
			});
		  
	 }
	 
});
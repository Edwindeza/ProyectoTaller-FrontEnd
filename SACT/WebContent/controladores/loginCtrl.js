//appbase.service('loginService', function($http, $rootScope,$scope){
//		return{
//			login:function(datos){
//				return $http.post("http://138.197.17.11/api/login/",datos).then(function(response){
//					return response.data;
//				});
//			}
//		}
//	});
	
appbase.controller('loginCtrl', function($http,$modal,$log,$rootScope,$scope,growl){
	 	 
	 $scope.datos={email:"fernando.supo6@gmail.com",password:"fsupo"}
	 
	 $rootScope.listaFiscales={};
	 $rootScope.login=false;
	 
	 $rootScope.windowLogin=true;
	 
	 $rootScope.toke="";

	 this.login=function(){
		  var datoLogin = JSON.stringify($scope.datos);
		  $http.post("http://138.197.17.11/api/login/",datoLogin).then(function(response){
		  		$rootScope.token=response.data;
		  		console.log($rootScope.token)
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
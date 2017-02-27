appbase.controller('nuevoUsuarioCtrl',function($http, $modal, $rootScope,$scope,growl) {
		
		$scope.user={
				email:"",
				password:"",
				first_name:"",
				last_name:"",
				codigo:"",
				telefono:"",
				direccion:"",
		}
	
		this.AgregarUsuario=function(){
			var usuario = JSON.stringify($scope.user);
			$http.post("http://138.197.17.11/api/create-user/",usuario).then(function(response){
				JSON.stringify(response.data);
			    growl.addErrorMessage("Usuario registrado correctamente."+response.data);
			    $scope.user.length=0;
			}, function(response){
				JSON.stringify(response.data);
				if(!response.data.email[0]==undefined){
					growl.addErrorMessage("Error de registro de usuario, "+response.data.email[0]);
				}
				growl.addErrorMessage("Error de registro de usuario,");
			});
		}
	});
		
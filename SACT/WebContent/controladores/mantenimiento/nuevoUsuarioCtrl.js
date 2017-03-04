appbase.controller('nuevoUsuarioCtrl',function(usuarioService,$http, $modal, $rootScope,$scope,growl) {
		
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
			
			usuarioService.registrarUsuario(usuario).then(function(respuesta){
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
		
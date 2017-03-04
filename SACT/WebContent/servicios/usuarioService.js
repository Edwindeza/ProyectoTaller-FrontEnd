appbase.service('usuarioService', function($http, $rootScope) {
	return {
		registrarUsuario:function(usuario){
				return $http.post($rootScope.urlServidor+"create-user/",usuario).then(function(response){
					return response;
				});
			},
		
	}
});


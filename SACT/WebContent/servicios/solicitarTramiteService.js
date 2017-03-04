appbase.service('solicitarTramiteService', function($http, $rootScope) {
	return {
			solicitarTramite:function(idUsuario,idTramite){
				return $http.post($rootScope.urlServidor+"user/"+idUsuario+"/solicitar-tramite/"+idTramite+"/").then(function(response){
					return response;
				});
			},
		
		
	}
});


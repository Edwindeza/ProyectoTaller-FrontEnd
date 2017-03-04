
appbase.service('misTramitesService', function($http, $rootScope) {
	return {

			listarTramite:function(){
					return $http.get($rootScope.urlServidor+"tramites/").then(function(response){
						return response;
					});
				},

			listarTramitesUsuario:function(idUsuario){
				return $http.get($rootScope.urlServidor+"mis-tramites/"+idUsuario+"/").then(function(response){
					return response;
				});
			},

			cancelarTramite:function(idTramite){
				return $http.put($rootScope.urlServidor+"cancelar-tramite/"+idTramite+"/").then(function(response){
					return response;
				});
			},
		
	}
});
appbase.service('loginService', function($http, $rootScope) {
	return {
		listarTramite:function(){
				return $http.get($rootScope.urlServidor+"tramites/").then(function(response){
					return response;
				});
			},
		
	}
});


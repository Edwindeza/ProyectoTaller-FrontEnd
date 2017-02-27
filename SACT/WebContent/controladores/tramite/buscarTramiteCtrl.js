appbase.controller('buscarTramiteCtrl',function($http, $modal, $rootScope,$scope,$timeout, $q, $log,$mdDialog,$window,growl) {

		
	 		$rootScope.listaTramite=[];
			$scope.tramites=[];
			
			$scope.selectedTramite = function(selected) {
			      if (selected) {
			        $scope.tramiteSelected9 = selected.originalObject;
			        $scope.estadoTitulo=true;
			      } else {
			        $scope.tramiteSelected9 = null;
			        $scope.estadoTitulo=false;
			      }
			    }
			$http.get("http://138.197.17.11/api/tramites/").then(function(response) {
								JSON.stringify(response.data);
								$rootScope.listaTramite.push(response.data);
								for(var i=0;i<$rootScope.listaTramite.length;i++){
									for(var j=0;j<$rootScope.listaTramite[i].results.length;j++){
										$scope.tramites.push($rootScope.listaTramite[i].results[j]);
									}
								 }
			}, function(response) {alert("error: " + response.data);});

			
			this.solicitarTramite=function(){
				$window.location.href = '#/solicitarTramite'
			}
			
			
})

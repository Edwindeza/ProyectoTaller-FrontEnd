appbase.controller('buscarTramiteCtrl',function(buscarTramiteService,$http, $modal, $rootScope,$scope,$timeout, $q, $log,$mdDialog,$window,growl) {
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


							$rootScope.listaTramite4=[];
	  						$scope.tramites=[];
							buscarTramiteService.listarTramite().then(function(respuesta){
								JSON.stringify(respuesta.data);
								$rootScope.listaTramite4.push(respuesta.data);
								for(var i=0;i<$rootScope.listaTramite4.length;i++){
									for(var j=0;j<$rootScope.listaTramite4[i].results.length;j++){
										$scope.tramites.push($rootScope.listaTramite4[i].results[j]);
										console.log($scope.tramites)
									}
								 }
							});

			
			this.solicitarTramite=function(){
				$window.location.href = '#/solicitarTramite'
			}
			
			
})

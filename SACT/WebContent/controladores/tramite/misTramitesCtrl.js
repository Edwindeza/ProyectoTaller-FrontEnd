appbase.controller('misTramitesCtrl',function(misTramitesService,$http, $modal, $rootScope,$scope, $filter,growl) {


							$rootScope.listaTramite=[];
	  						$scope.tramites=[];
							misTramitesService.listarTramite().then(function(respuesta){
								JSON.stringify(respuesta.data);
								$rootScope.listaTramite.push(respuesta.data);
								for(var i=0;i<$rootScope.listaTramite.length;i++){
									for(var j=0;j<$rootScope.listaTramite[i].results.length;j++){
										$scope.tramites.push($rootScope.listaTramite[i].results[j]);
									}
								 }
							});


							$scope.listaTramites=[];
							$scope.listaTramiteUsuario=[];
							misTramitesService.listarTramitesUsuario($rootScope.idUsuario).then(function(respuesta){
								JSON.stringify(respuesta.data);
								console.log(respuesta.data)
								$scope.listaTramiteUsuario.push(respuesta.data);
								for(var i=0;i<$scope.listaTramiteUsuario.length;i++){
									for(var j=0;j<$scope.listaTramiteUsuario[i].results.length;j++){
										$scope.listaTramites.push($scope.listaTramiteUsuario[i].results[j]);
										console.log(oficina)
												}
											}
							});




							this.cancelarTramite=function(listaTramites,item){
									var codigoTramite = item.id;
									misTramitesService.cancelarTramite(codigoTramite).then(function(respuesta){
										growl.addErrorMessage("Solicitud de Cancelacion exitosa.");		
									});
								}


});
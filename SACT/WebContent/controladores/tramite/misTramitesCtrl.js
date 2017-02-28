
appbase.service('misTramitesService', function($http, $rootScope) {
	return {

			listarTramite:function(){
					return $http.get("http://138.197.17.11/api/tramites/").then(function(response){
						return response;
					});
				},

			listarTramitesUsuario:function(idUsuario){
				return $http.get("http://138.197.17.11/api/mis-tramites/"+idUsuario+"/").then(function(response){
					return response;
				});
			},

			cancelarTramite:function(idTramite){
				return $http.put("http://138.197.17.11/api/cancelar-tramite/"+idTramite+"/").then(function(response){
					return response;
				});
			},
		
	}
});

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

appbase.controller('designacionModalCtrl', function($modalInstance, $modal, $rootScope, $scope,$http) {
	var entorno2 = $scope;
	
	$rootScope.mPropuesta = {
			pdId : "",
			pdTipProp : "",
			pdEstProp : "",
			pdDisFiscal :"",
			pdCodBarra : "",
			pdNroDocumento : "",
			pdFecDocumento : "",
			pdSumilla : "",
			pdObs : ""
		};
	
		this.consultaDocumento = function(mPropuesta) {
			$http.get("http://localhost:8080/demoseguridadbackend/resources/mantenedor/"+$rootScope.mPropuesta[0].pdCodBarra).then(function(response){
				$rootScope.listaCodigoBarra.availableOptions = response.data;
				console.log($rootScope.listaCodigoBarra);
			}, function(response){
				alert("error: "+response.data);
			});
		}
	
		$scope.cDesignacion.tipoPropuesta = {
			availableOptions : [ {
				caDetId : "1",
				caDesc : "Fiscal"
			}, {
				caDetId : "2",
				caDesc : "Funcionario"
			} ],
			selectedOption : {
				caDetId : $rootScope.mPropuesta.pdTipProp,
				caDesc : ''
			}
		};


});




appbase.controller('misTramitesCtrl',function($http, $modal, $rootScope,$scope, $filter) {

					var entorno = this;
					var entorno3=$scope;
		
					$rootScope.listaDesignacion = {
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
					
					/**
					 * Datos de consulta
					 */
					$rootScope.cDesignacion = {
						tipoPropuesta : "",
						estadoPropuesta : "",
						fiscales : "",
						listaDependencia : "",
						listaDF : "",
						fechaInicio : "",
						fechaFin : "",
						numeroDocumento : "",
						codigoBarra : "",
						cargoPropuesto : "",
					};

					/**
					 * COMBOS
					 */
					
					$rootScope.cDesignacion.fechaInicio= $filter('date')(new Date(), 'yyyy-MM-dd');
					$rootScope.cDesignacion.fechaFin= $filter('date')(new Date(), 'yyyy-MM-dd');

					$rootScope.cDesignacion.listaDependencia = {
						availableOptions : [ {
							codiDepeTde : "",
							descLargTde : ""
						} ],
						selectedOption : {
							codiDepeTde : "",
							descLargTde : 'Seleccione'
						}
					};
					$http
							.get(
									"http://localhost:8080/demoseguridadbackend/resources/maestro/listaDependencias")
							.then(
									function(response) {
										$rootScope.cDesignacion.listaDependencia.availableOptions = response.data;

									}, function(response) {
										alert("error: " + response.data);
									});
					
					/**
					 * LISTADO CARGOS
					 */
					$scope.cDesignacion.listaCargos = {
							availableOptions : [ {
								codiCargTca : "",
								descCargTca : "",
								abreCargTca : "",
								cateNiveTni : ""
							} ],
							selectedOption : {
								codiCargTca : "",
								descCargTca : "",
								abreCargTca : "",
								cateNiveTni : ""
							}
						};
						$http.get("http://localhost:8080/demoseguridadbackend/resources/maestro/listaCargos").then(function(response) {
											$scope.cDesignacion.listaCargos.availableOptions = response.data;

										}, function(response) {
											alert("error: " + response.data);
										});
						
						
					$scope.tipoPropuesta = {
						availableOptions : [ {
							caDetId : "1",
							caDesc : "Fiscal"
						}, {
							caDetId : "2",
							caDesc : "Funcionario"
						} ],
						selectedOption : {
							caDetId : '1',
							caDesc : 'Fiscal'
						}
					};

					$scope.estadoPropuesta = {
						availableOptions : [ {
							caDetId : "1",
							caDesc : "Pendiente"
						}, {
							caDetId : "2",
							caDesc : "Atendido"
						} ],
						selectedOption : {
							caDetId : '1',
							caDesc : 'Pendiente'
						}
					};
					// fin

					/**
					 * CALENDARIO
					 */
					entorno.calendarioAbierto = false;
					entorno.calendarioAbierto2 = false;
					entorno.formats = [ 'dd/MM/yyyy', 'dd-MM-yyyy',
							'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate' ];
					entorno.format = entorno.formats[1];

					this.abrirCalendario = function($event) {
						$event.preventDefault();
						$event.stopPropagation();
						entorno.calendarioAbierto = true;
					};

					this.abrirCalendario2 = function($event) {
						$event.preventDefault();
						$event.stopPropagation();
						entorno.calendarioAbierto2 = true;
					};

					entorno.dateOptions = {
						formatYear : 'yyyy',
						startingDay : 1
					};

					/**
					 * FUNCION CONSULTA
					 */
					var today = $filter('date')
							($rootScope.cDesignacion.fechaInicio,
									"MMM-dd-yyyy ");

					this.consultaPropuesta = function() {
						$rootScope.datosConsulta = {

							tipoPropuesta : $scope.tipoPropuesta.selectedOption.caDetId,
							estadoPropuesta : $scope.estadoPropuesta.selectedOption.caDetId,
							distritoFiscal : $rootScope.listaDistritoFiscal.selectedOption.codiDijuDju,
							dependencia : $rootScope.cDesignacion.listaDependencia.selectedOption.codiDepeTde,
							fiscal : $rootScope.listaFiscales.codiEmplPer,

							numeroDocumento : $rootScope.cDesignacion.numeroDocumento,
							codigoBarra : $rootScope.cDesignacion.codigoBarra,
							cargo : $rootScope.cDesignacion.cargoPropuesto,
							fechaInicio : $rootScope.cDesignacion.fechaInicio,
							fechaFin : $rootScope.cDesignacion.fechaFin
						}
						consultaDesignacionService.consultarPropuesta($rootScope.datosConsulta).then(function(respuesta) {
									$rootScope.listaDesignacion = respuesta;
								}, function(response) {
									alert("error: " + response);
								});
					}

					/**
					 * MODAL MODIFICAR
					 */
					
					this.abriModalDesignacion = function(listaDesignacion,item) {
						var idPropuesta  = item;
						$http.get("http://localhost:8080/demobackend/resources/designacion/"+idPropuesta).then(function(response){
							$rootScope.mPropuesta = response.data;
			  			}, function(response){
			  				alert("error: "+response.data);
			  			});
					
						$rootScope.modalInstance = $modal.open({
							animation : true,
							templateUrl : 'modalDesignacion.html',
							controller : 'designacionModalCtrl',
							controllerAs : 'modalDesignado',
							size : 'lg',
							windowClass : 'app-modal-window',
							resolve : {
								
							}
						});
					};

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

		$scope.cDesignacion.estadoPropuesta = {
			availableOptions : [ {
				caDetId : "1",
				caDesc : "Pendiente"
			}, {
				caDetId : "2",
				caDesc : "Atendido"
			} ],
			selectedOption : {
				caDetId : $rootScope.mPropuesta.pdEstProp,
				caDesc : ''
			}
		};
		
		$scope.distritoFiscal = {
				availableOptions : [ {
					codiDijuDju : "",
					descDijuDju : ""
				} ],
				selectedOption:{
					codiDijuDju : $rootScope.mPropuesta.pdDisFiscal,
					descDijuDju : ''
				}
		};
		$http.get("http://localhost:8080/demoseguridadbackend/resources/maestro/listaDF").then(function(response) {
				$scope.distritoFiscal.availableOptions = response.data;
		}, function(response){
			alert("error: " + response.data);
		});
	

	this.cerrarModal = function() {
		$rootScope.modalInstance.close({
  			animation: true,
  			size: 'lg',	
  			resolve: {}
		});
	};

});


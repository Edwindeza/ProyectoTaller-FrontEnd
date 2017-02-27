appbase.controller('solicitarTramiteCtrl',function($http, $modal, $rootScope,$scope,$timeout, $q, $log,$mdDialog,$window) {
		
				$scope.showHints = true;
				this.myDate = new Date();
				this.isOpen = false;
				
				$scope.fut={
						cargo:"Jefe de la OGSBBC0",
						facultad:"Facultad de Ingeniera de Sistema e Informatica",
						nombres:"",
						codigo:""
				}
				
				var self = this;
				
				self.simulateQuery = true;
				self.isDisabled = false;
				self.states = loadAll();
				self.querySearch = querySearch;
				self.selectedItemChange = selectedItemChange;
				self.searchTextChange = searchTextChange;
			
				self.newState = newState;
			
				function newState(state) {
					alert("Sorry! You'll need to create a Constitution for "
							+ state + " first!");
				}
			
				/**
				 * Search for states... use $timeout to simulate remote
				 * dataservice call.
				 */
				function querySearch(query) {
					var results = query ? self.states
							.filter(createFilterFor(query)) : self.states, deferred;
					if (self.simulateQuery) {
						deferred = $q.defer();
						$timeout(function() {
							deferred.resolve(results);
						}, Math.random() * 1000, false);
						return deferred.promise;
					} else {
						return results;
					}
				}
				
				$scope.titulo="";
				$scope.estadoTitulo=false;
				function searchTextChange(text) {
					$log.info('Text changed to ' + text);
				}
			
				function selectedItemChange(item) {
					$scope.titulo=item.display;
					$scope.estadoTitulo=true;
					$log.info('Item changed to ' + JSON.stringify(item));
				}
			
				/**
				 * Build `states` list of key/value pairs
				 */
				function loadAll() {
var allStates='Expedito para optar Titulo Profesional,Expedito para optar el Grado Academico de Bachiller,Grado Academico de Bachiller,Expedito para optar Segunda Especialidad,Certificado de Estudios por Semestre Academico,Certificado de Estudio por Año Academico,\
			   Constancia de Ingreso, Constancia de no adeudar libros a la Facultad, Constancia de no adeudar libros a la Biblioteca Central, Constancia de no adeudar Dinero a la Universidad,Constancia de no adeudar Dinero a la Facultad';
					return allStates.split(/, +/g).map(function(state) {
						return {
							value : state.toLowerCase(),
							display : state
						};
					});
				}
			
				/**
				 * Create filter function for a query string
				 */
				function createFilterFor(query) {
					var lowercaseQuery = angular.lowercase(query);
			
					return function filterFn(state) {
						return (state.value.indexOf(lowercaseQuery) === 0);
					};
			
				}
				
				this.solicitarTramite=function(){
					console.log("entro a solicitar Tramite")
					$http.post("http://138.197.17.11/api/solicitar-tramite/18/").then(function(response) {
								
			}, function(response) {alert("error: " + response.data);});

				}
				
	

});
	

	
	
	
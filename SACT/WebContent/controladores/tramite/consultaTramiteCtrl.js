appbase.service('consultaTramiteService', function($http, $rootScope) {
	return {
			listarTramite:function(){
				return $http.get("http://138.197.17.11/api/tramites/").then(function(response){
					return response;
				});
			},
		
		
	}
});

appbase.controller('consultaTramiteCtrl', function(consultaTramiteService,$http, $modal, $rootScope, $scope,$timeout,$mdDialog,growl) {
					var self = this;
					
					$scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS '
							+ 'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI '
							+ 'WY').split(' ').map(function(state) {
						return {
							abbrev : state
						};
					});
					
						  
						  $scope.tramite=[
							    {name: 'Matricula de Ingresante', tipo: 'Matricula', 
							    	requisisto: [
								    { name: '1. Recibo de pago por derechos en el banco Finaciero'},
								    { name: '2. Fotocopia de la Constancia de Ingreso'}
								    ]
							    },
							    { name: 'Matricula Regular', tipo: 'Matricula', newMessage: false },
							    { name: 'Matricula Extemporánea', tipo: 'Matricula', newMessage: false },
							    { name: 'Reserva de Matricula', tipo: 'Matricula', newMessage: true },
							    { name: 'Reactualizacion de Matricula', tipo: 'Matricula', newMessage: false },
							    { name: 'Rectificacion de Matricula', tipo: 'Matricula', newMessage: false },
							    { name: 'Anulacion de Matricula', tipo: 'Matricula', newMessage: true },
							    { name: 'Anulacion de Ingreso', tipo: 'Matricula', newMessage: false },
							    { name: 'Certificados de Estudio', tipo: 'Registros Academicos', newMessage: false },
							    { name: 'Reporte de matricula (Duplicado)', tipo: 'Registros Academicos', newMessage: true },
							    { name: 'Constancia de Orden de Mérito', tipo: 'Registros Academicos', newMessage: false },
							    { name: 'Historial Academico (Récord Academico)', tipo: 'Registros Academicos', newMessage: false }
						];
						  
							  $scope.goToPerson = function(tramite, event) {
								    $mdDialog.show(
								      $mdDialog.alert()
								        .title('Datos Generales')
								        .textContent('Inspect ' + tramite.name)
								        .ariaLabel('Person inspect demo')
								        .ok('Gracias!')
								        .targetEvent(event)
								 );
							  };
		
						  
							  $scope.navigateTo = function(to, event) {
							    $mdDialog.show(
							      $mdDialog.alert()
							        .title('Navigating')
							        .textContent('Imagine being taken to ' + to)
							        .ariaLabel('Navigation demo')
							        .ok('Neat!')
							        .targetEvent(event)
							    );
							  };

							  $scope.doPrimaryAction = function(event) {
							    $mdDialog.show(
							      $mdDialog.alert()
							        .title('Primary Action')
							        .textContent('Primary actions can be used for one click actions')
							        .ariaLabel('Primary click demo')
							        .ok('Awesome!')
							        .targetEvent(event)
							    );
							  };

							  $scope.doSecondaryAction = function(event) {
							    $mdDialog.show(
							      $mdDialog.alert()
							        .title('Secondary Action')
							        .textContent('Secondary actions can be used for one click actions')
							        .ariaLabel('Secondary click demo')
							        .ok('Neat!')
							        .targetEvent(event)
							    );
							  };
	 

							$rootScope.listaTramite4=[];
	  						$scope.tramites=[];
							consultaTramiteService.listarTramite().then(function(respuesta){
								JSON.stringify(respuesta.data);
								$rootScope.listaTramite4.push(respuesta.data);
								for(var i=0;i<$rootScope.listaTramite4.length;i++){
									for(var j=0;j<$rootScope.listaTramite4[i].results.length;j++){
										$scope.tramites.push($rootScope.listaTramite4[i].results[j]);
										console.log($scope.tramites)
									}
								 }
							});

						  
			
		
		});




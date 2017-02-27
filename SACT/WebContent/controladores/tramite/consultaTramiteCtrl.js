appbase.service('consultaTramiteService', function($http, $rootScope) {
	return {

		
		
	}
});

		appbase.controller('consultaTramiteCtrl', function(consultaTramiteService,$http, $modal, $rootScope, $scope,$timeout,$mdDialog) {
					var self = this;
					
					$scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS '
							+ 'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI '
							+ 'WY').split(' ').map(function(state) {
						return {
							abbrev : state
						};
					});
					
//					    $scope.tramite = null;
//						$scope.tramites = null;
//						$scope.loadTramites = function() {
//						    return $timeout(function() {
//						      $scope.tramites =  $scope.tramites  || [
//						        { id: 1, name: 'Matricula' },
//						        { id: 2, name: 'Registros Académicos' },
//						        { id: 3, name: 'Grados y Títulos' },
//						        { id: 4, name: 'Prácticas Profesionales' }
//						      ];
//						    }, 350);
//						  };
						  
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
	  
							
						  
			
		
		});

appbase.controller('requerimientoModalCtrl', function($modalInstance, $modal, $rootScope, $scope,$http) {
	
	
});





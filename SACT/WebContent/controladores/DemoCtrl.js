appbase.controller('DemoCtrl', function($timeout, $q, $log, $scope, $mdDialog,$window,$rootScope) {
					
					$rootScope.validarMenu=false;
	
					var originatorEv;
					var vm = this;
					vm.notificationsEnabled = true;
					vm.toggleNotifications = function() {
						vm.notificationsEnabled = !vm.notificationsEnabled;
					};

					vm.redial = function(e) {
						$mdDialog
								.show($mdDialog
										.alert()
										.title('Suddenly, a redial')
										.content(
												'You just called someone back. They told you the most amazing story that has ever been told. Have a cookie.')
										.ok('That was easy'));
					};

					vm.checkVoicemail = function() {
						// This never happens.
					};

					this.openMenu = function($mdMenu, ev) {
						originatorEv = ev;
						$mdMenu.open(ev);
					};

					this.notificationsEnabled = true;
					this.toggleNotifications = function() {
						this.notificationsEnabled = !this.notificationsEnabled;
					};

					this.redial = function() {
						$mdDialog
								.show($mdDialog
										.alert()
										.targetEvent(originatorEv)
										.clickOutsideToClose(true)
										.parent('body')
										.title('Suddenly, a redial')
										.textContent(
												'You just called a friend; who told you the most amazing story. Have a cookie!')
										.ok('That was easy'));

						originatorEv = null;
					};

					this.checkVoicemail = function() {
						// This never happens.
					};

					this.settings = {
						printLayout : true,
						showRuler : true,
						showSpellingSuggestions : true,
						presentationMode : 'edit'
					};

					this.sampleAction = function(name, ev) {
						if(name=="consulta"){
							$window.location.href = '#/consultaTramite'
						}
						if(name=="nuevo"){
							console.log("entro1")
							$window.location.href = '#/tramite'
						}
						if(name=="BuscarTramite"){
							$window.location.href = '#/buscarTramite'
						}
						if(name=="misTramites"){
							$window.location.href = '#/misTramites'
						}
						if(name=="misMovimientos"){
							$window.location.href = '#/misMovimientos'
						}
						if(name=="nuevoUsuario"){
							$window.location.href = '#/nuevoUsuario'
						}
						//$window.location.href = '#/tramite'
//						$mdDialog.show($mdDialog.alert().title(name) .textContent( 'You triggered the "' + name + '" action').ok('Great') .targetEvent(ev));
					};

					$scope.user = {
						title : 'Developer',
						email : 'ipsum@lorem.com',
						firstName : '',
						lastName : '',
						company : 'Google',
						address : '1600 Amphitheatre Pkwy',
						city : 'Mountain View',
						state : 'CA',
						biography : 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
						postalCode : '94043'
					};

					$scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS '
							+ 'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI '
							+ 'WY').split(' ').map(function(state) {
						return {
							abbrev : state
						};
					});

					var self = this;

					self.simulateQuery = false;
					self.isDisabled = false;

					// list of `state` value/display objects
					self.states = loadAll();
					self.querySearch = querySearch;
					self.selectedItemChange = selectedItemChange;
					self.searchTextChange = searchTextChange;

					self.newState = newState;

					function newState(state) {
						alert("Sorry! You'll need to create a Constitution for "
								+ state + " first!");
					}

					// ******************************
					// Internal methods
					// ******************************

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

					function searchTextChange(text) {
						$log.info('Text changed to ' + text);
					}

					function selectedItemChange(item) {
						$log.info('Item changed to ' + JSON.stringify(item));
					}

					/**
					 * Build `states` list of key/value pairs
					 */
					function loadAll() {

						var listaTramites = 'Matricula de Ingresantes,Matricula Regular,Matricula Extemporanea';

						var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
			              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
			              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
			              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
			              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
			              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
			              Wisconsin, Wyoming';

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

				}).config(
				function($mdThemingProvider) {

					// Configure a dark theme with primary foreground yellow

					$mdThemingProvider.theme('docs-dark', 'default')
							.primaryPalette('yellow').dark();

				});

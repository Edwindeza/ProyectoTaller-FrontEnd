	var appbase = angular.module('appbase', ['ui.bootstrap','ngRoute','satellizer','ngMaterial','material.components.menu','md.data.table','angular-growl','angucomplete','angucomplete-alt'])
	
	
	appbase.config(function($routeProvider,$mdIconProvider,$mdThemingProvider){
		$mdThemingProvider.theme('altTheme')
	    .primaryPalette('purple')
		
		$mdIconProvider.iconSet('call', 'recursos/img/mpfn.png', 24);
		$mdIconProvider.iconSet('fisi', 'recursos/img/fisi.png', 24);
		$mdIconProvider.defaultIconSet('recursos/img/iconsets/ico_mod.png', 24);

		$mdIconProvider
	    .iconSet('social', 'recursos/img/iconsets/social-icons.svg', 24)
	    .iconSet('device', 'recursos/img/iconsets/device-icons.svg', 24)
	    .iconSet('communication', 'recursos/img/iconsets/communication-icons.svg', 24)
	    .defaultIconSet('recursos/img/iconsets/core-icons.svg', 24);
		
		
		$routeProvider
		.when('/tramite', {
			templateUrl:'vistas/tramite/tramite.html',
			controller: 'tramiteCtrl',
			controllerAs: 'ctrl'				
		})
		.when('/consultaTramite', {
			templateUrl:'vistas/tramite/consultaTramite.html',
			controller: 'consultaTramiteCtrl',
			controllerAs: 'ctrl'				
		})
		.when('/buscarTramite', {
			templateUrl:'vistas/tramite/buscarTramite.html',
			controller: 'buscarTramiteCtrl',
			controllerAs: 'ctrl'				
		})
		.when('/solicitarTramite', {
			templateUrl:'vistas/tramite/solicitarTramite.html',
			controller: 'solicitarTramiteCtrl',
			controllerAs: 'ctrl'				
		})
		.when('/misTramites', {
			templateUrl:'vistas/tramite/misTramites.html',
			controller: 'misTramitesCtrl',
			controllerAs: 'ctrl'				
		})
		.when('/misMovimientos', {
			templateUrl:'vistas/tramite/misMovimientos.html',
			controller: 'misMovimientosCtrl',
			controllerAs: 'ctrl'				
		})
		.when('/nuevoUsuario', {
			templateUrl:'vistas/mantenimiento/nuevoUsuario.html',
			controller: 'nuevoUsuarioCtrl',
			controllerAs: 'ctrl'				
		})
		.when('/login', {
			templateUrl:'vistas/login.html',
			controller: 'loginCtrl',
			controllerAs: 'ctrl'				
		})
		.when('/index', {
			templateUrl:'vistas/index.html',
			controller: 'indexCtrl',
			controllerAs: 'ctrl'				
		})
		.otherwise({redirectTo: '/login'});
	});
	
	appbase.config(['growlProvider', function (growlProvider) {
		  growlProvider.globalTimeToLive(4000);
		 
		}]);
	
	appbase.controller('globalCtrl', function( $scope, $rootScope, $auth, $location, $http, $filter,$mdDialog) {
		$scope.validar=true;
	});
	
	
	
	appbase.filter('keyboardShortcut', function($window) {
	    return function(str) {
	      if (!str) return;
	      var keys = str.split('-');
	      var isOSX = /Mac OS X/.test($window.navigator.userAgent);

	      var seperator = (!isOSX || keys.length > 2) ? '+' : '';

	      var abbreviations = {
	        M: isOSX ? '⌘' : 'Ctrl',
	        A: isOSX ? 'Option' : 'Alt',
	        S: 'Shift'
	      };

	      return keys.map(function(key, index) {
	        var last = index == keys.length - 1;
	        return last ? key : abbreviations[key];
	      }).join(seperator);
	    };
	  })
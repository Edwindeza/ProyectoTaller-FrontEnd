	appbase.service('carpetasAsistenciaService', function($http, $rootScope){
		return{

			obtener:function(id){
				return $http.get($rootScope.udavitRESTUrlRecurso+'/carpetasfiscales/obtener/'+id).then(function(response){
					return response.data;
				});
			},
			
		
			listarBeneficiarios:function(id){
				return $http.get($rootScope.udavitRESTUrlRecurso+'/carpetasfiscales/listarBeneficiarios/'+id).then(function(response){
					return response.data;
				});
			},
			
			
			listarpaginadobusqueda:function(pagina, cantidad, buscar){
				return $http.get($rootScope.udavitRESTUrl2+'/resources/aplicaciones/listado/'+pagina+'/'+cantidad+'/'+buscar).then(function(response){
					return response.data;
				});
			},
			
			listarBeneficiariosCAI:function(id){
				return $http.get($rootScope.udavitRESTUrlApp+'/beneficiarios/listado/'+id).then(function(response){
					return response.data;
				});
			},
			
		}
	});
	
	
	appbase.service('beneficiariosService', function($http, $rootScope){
		return{
			
			obtener:function(nuCaso,nuBeneficiario){
				return $http.get($rootScope.udavitRESTUrlRecurso+'/carpetasfiscales/obtener/'+nuCaso+'/'+nuBeneficiario).then(function(response){
					return response.data;
				});
			},
			
			nuevoBeneficiario:function(datos){
				return $http.post($rootScope.udavitRESTUrlApp+'/beneficiarios/agregarBeneficiario', datos).then(function(response){
					return response.data;
				});
			},
			
			nuevoResponsable:function(datos){
				return $http.post($rootScope.udavitRESTUrlApp+'/beneficiarios/agregarResponsable', datos).then(function(response){
					return response.data;
				});
			},
			
			
			nuevoAgresor:function(datos){
				return $http.post($rootScope.udavitRESTUrlApp+'/beneficiarios/agregarAgresor', datos).then(function(response){
					return response.data;
				});
			},
			
			
			nuevoMotivoIngreso:function(datos){
				return $http.post($rootScope.udavitRESTUrlApp+'/beneficiarios/agregarMotivo', datos).then(function(response){
					return response.data;
				});
			},
			
//			listarBeneficiariosCAI:function(id){
//				return $http.get($rootScope.udavitRESTUrlApp+'/beneficiarios/listado/'+id).then(function(response){
//					return response.data;
//				});
//			},
		}
	});
	
		  
	appbase.filter("filteri18n",["$filter",function($filter){
		var filterFn=$filter("filter"); 
		  /** Transforma el texto quitando todos los acentos diéresis, etc. **/
		  function normalize(texto) {
		    texto = texto.replace(/[áàäâ]/g, "a");
		    texto = texto.replace(/[éèëê]/g, "e");
		    texto = texto.replace(/[íìïî]/g, "i");
		    texto = texto.replace(/[óòôö]/g, "o");
		    texto = texto.replace(/[úùüü]/g, "u");
		    texto = texto.toUpperCase();
		    return texto;
		  }
		    
		  /** Esta función es el comparator en el filter **/
		  function comparator(actual, expected) {
		      if (normalize(actual).indexOf(normalize(expected))>=0) {
		        return true;
		      } else {
		        return false;
		      }
		  }
		   
		  /** Este es realmente el filtro **/
		  function filteri18n(array,expression) {
		    //Lo único que hace es llamar al filter original pero pasado
		    //la nueva función de comparator
		    return filterFn(array,expression,comparator)
		  }
		   
		  return filteri18n;
		   
		}
	]);
	
	
	
	appbase.filter("formateo",["$filter",function($filter){
		var filterFn=$filter("filter"); 
		
		function formateo(array,expression) {
		    //Lo único que hace es llamar al filter original pero pasado
		    //la nueva función de comparator
		    return filterFn(array,expression,comparator)
		  }
		   
		  return formateo;
	}
	]);
	
	
	
	appbase.controller('carpetasAsistenciaCtrl',function(beneficiariosService,carpetasAsistenciaService,$http, $modal, $rootScope) {
		var entorno=this;
		
		entorno.mostrarFormulario=false;
		entorno.listaCasos = [];
		entorno.beneficiarios = []; 
		entorno.beneficiariosCAI=[];
		entorno.idActivo=0;
		entorno.idBeneficiarioActivo=0;
		
		entorno.tamanoMaximo = 5;
  		entorno.cantidadTotal = 0;
  		entorno.pagina = 1;
  		entorno.numeroPaginas=0;
  		entorno.itemsPorPagina=5;
  		entorno.buscar="";
  		
		entorno.caso;
		
		
		$http.get($rootScope.udavitRESTUrl).then(function(response){
			//entorno.cambioPagina();
			entorno.listaCasos = response.data;
			
		}, function(response){
			alert("error: "+response.data);
		});
	
		
		this.cambioPagina = function() {
    		entorno.listarpaginadobusqueda();
  		};

		
  		this.listarpaginadobusqueda=function(){
			var buscartemp="__VACIO__";
			if(entorno.buscar!==""){
				buscartemp=entorno.buscar;
			}

			carpetasAsistenciaService.listarpaginadobusqueda(entorno.pagina, entorno.itemsPorPagina, buscartemp).then(function(data){
				entorno.listaCasos=data.lista;				
				entorno.cantidadTotal = data.cantidadTotal;
				entorno.pagina = data.pagina;
				entorno.numeroPaginas=lista.numeroPaginas;
			});
		};
  		
		entorno.fechaAuxIncorporacion;
		entorno.idAux;
		
		
		this.ver=function(id){
			alert(id);
			carpetaAsistenciaService.listarBeneficiariosCAI(id).then(function(respuesta){
				if(respuesta.estado=="OK"){
					entorno.beneficiariosCAI=respuesta.dato;
					
				}else{
					alert("No existen Beneficiarios con Carpetas de Asistencia para mostrar");
				}
	
			});	
				
		};
		
		
		
		this.editar=function(id){
			carpetasAsistenciaService.obtener(id).then(function(respuesta){
				if(respuesta.estado=="OK"){
					entorno.mostrarFormulario=true;
					entorno.caso=respuesta.dato;
					entorno.idAux=entorno.caso.idFormateado
				
					var date = new Date(entorno.caso.fechaEmision);
					entorno.fechaAuxIncorporacion=date.getDay()+ '-' +date.getMonth()+'-'+date.getFullYear();
					entorno.idActivo=id;
					
				}
				carpetasAsistenciaService.listarBeneficiarios(id).then(function(respuesta){
					entorno.beneficiarios=respuesta;
				});
				beneficiariosService.listarBeneficiariosCAI(id).then(function(response){
					entorno.beneficiariosCAI=response;
				});
			});	
				
		};
		
		
		
		this.editarBeneficiario=function(idBeneficiario){
  			entorno.idBeneficiarioActivo=idBeneficiario;
  		};
		
		
		//para los modales

  		this.abrirBeneficiarios = function () {
    		var modalInstance =  $modal.open({
      			animation: true,
      			templateUrl: 'modalComisionado.html',
      			controller: 'beneficiariosModalCtrl',
      			controllerAs: 'beneficiariosModal',
      			size: 'lg',	
      			resolve: {
        			datosBeneficiarioModal: function () {
          				return {
          					idBeneficiario:entorno.idBeneficiarioActivo,
          					idCarpetaAsistencia:entorno.idActivo
          				};
        			}
      			}
    		});
  		};
  		
		
	});
	
	
	
	appbase.controller('beneficiariosModalCtrl',function (beneficiariosService,parametrosService,$scope, $modalInstance , datosBeneficiarioModal) {
		var entorno=this;
//		entorno.relaciones=[];
//		entorno.tiposDocumentos=[];
		entorno.gradosInstruccion=[];
		entorno.estadosCivil=[];
		entorno.medidasProteccion=[]; 
		entorno.beneficiariosCAI=[];
		
  		entorno.idBeneficiario = datosBeneficiarioModal.idBeneficiario;
  		entorno.idCaso = datosBeneficiarioModal.idCarpetaAsistencia;
  		entorno.beneficiario;
  		entorno.mostrarExito=false;
		entorno.mostrarFalla=false;
		
		parametrosService.listarporparentesco().then(function(lista){
			entorno.relaciones=lista;
		});
		
		parametrosService.listarportiposDocumentos().then(function(lista){
			entorno.tiposDocumento=lista;
		});
		
		parametrosService.listarportiposGrados().then(function(lista){
			entorno.gradosInstruccion=lista;
		});
		
		parametrosService.listarporEstado().then(function(lista){
			entorno.estadosCivil=lista;
		});
		
		parametrosService.listarporProcedencia().then(function(lista){
			entorno.procedencias=lista;
		});
		
		parametrosService.listarporMotivo().then(function(lista){
			entorno.motivos=lista;
		});
		
		
		parametrosService.listarporGenero().then(function(lista){
			entorno.generos=lista;
		});
		
		
  		if(entorno.idBeneficiario>0){
  		beneficiariosService.obtener(entorno.idCaso, entorno.idBeneficiario).then(function(respuesta){
  			if(respuesta.estado=="OK"){
  				entorno.poblarFormulario(respuesta.dato);
  			}else{
				//entorno.mostrarFormulario=false;
			}
  		});
  				
  		}
  		
  		$scope.showMe = false;
  	    $scope.myFunc = function() {
  	        $scope.showMe = !$scope.showMe;
  	    }
  		
  		
  		this.poblarFormulario=function(datos){
  			entorno.idActivo=datos.beneficiarioID;//id.beneficiarioID;
  			entorno.idCaso=datos.id_unico;//id.nuCaso;
			entorno.apellidoPaterno=datos.apePaterno;
			entorno.apellidoMaterno=datos.apeMaterno;
			entorno.nombres=datos.nombres;
			entorno.edad=datos.edad;
			entorno.tipoDocumento=datos.id_tip_doc;
			entorno.detalletipoDocumento=datos.nombreTipoDocumento;
			entorno.numDocumentoBeneficiario=datos.numdoc;
			entorno.genero=datos.sexo;
			entorno.gradoInstruccion=datos.gradoInstruccion;
			entorno.estadoCivil=datos.estadoCivil;
			entorno.ocupacion=datos.ocupacion;
			entorno.nombreTipoBeneficiario=datos.nombreTipoBeneficiario;
			entorno.tipoBeneficiario=datos.tipoBeneficiario;
			entorno.fechaNacimiento=datos.fechaNacimiento;
			entorno.fechaIncorporacion=datos.fechaIncorporacion;
			entorno.telefonoBeneficiario=datos.telefono;
			entorno.direccion=datos.direccion;
			entorno.correo=datos.correo;
			entorno.casoFormato=datos.id_unico.substring(17,21)+"-"+datos.id_unico.substring(11,15);
			entorno.medidasProteccion=datos.medidasProteccion;
  		}
  		
  		this.limpiarMensajes= function(){
			entorno.mostrarExito=false;
			entorno.mostrarFalla=false;	
		}
  	//graba Beneficiario en carpeta fiscal
  		this.guardarDatos=function(){
  			var ahora = new Date(); 
  			var bene =  {
  					beneficiarioID:entorno.idActivo,
					casoID:entorno.idCaso,
  			}
			var datos={
					id:bene,
					apePaternoBeneficiario:entorno.apellidoPaterno,
					apeMaternoBeneficiario:entorno.apellidoMaterno,
					nombreBeneficiario:entorno.nombres,
					direccionBeneficiario:entorno.direccion,
					edadBeneficiario:entorno.edad,
					estadoCivilBeneficiario:entorno.estadoCivil,
					fecNacimientoBeneficiario:entorno.fechaNacimiento,
					instruccionBeneficiario:entorno.gradoInstruccionBeneficiario,
					nombreOtraMedida:entorno.otraMedida, //
					numDocumentoBeneficiario:entorno.numDocumentoBeneficiario,
					ocupacionBeneficiario:entorno.ocupacion,
					paisBeneficiario:entorno.pais, //
					referenciaBeneficiario: entorno.referencia, //
					sexoBeneficiario:entorno.genero,
					telefonoBeneficiario:entorno.telefonoBeneficiario,	
					tiempoUnion:entorno.tiempoUnion, //
					tipoBeneficiario:entorno.tipoBeneficiario,
					tipoDocumentoBeneficiario:entorno.tipoDocumento,
					correo:entorno.correo,
					fechaIncorporacion:entorno.fechaIncorporacion,
					
					
					usuarioCreacion:"no aplica",
					fechaCreacion:ahora,
					usuarioModificacion:"no aplica",
					fechaModificacion:null,
					
			}
			
			beneficiariosService.nuevoBeneficiario(datos).then(function(respuesta){
				if(respuesta.estado=="OK"){
					
					entorno.mostrarExito=true;
					entorno.mostrarFalla=false;
				}else{
					
					entorno.mostrarExito=false;
					entorno.mostrarFalla=true;
				}
			});
  			
//  			beneficiariosService.listarBeneficiariosCAI(datos.id.casoID).then(function(response){
//  				alert("entro");
//				entorno.beneficiariosCAI=response;
//			});
  			
  			
  		}
  		
  		//graba responsable en carpeta fiscal
  		this.guardarResponsable=function(){
  			var ahora = new Date();
  			var bene =  {
  					beneficiarioID:entorno.idActivo,
					casoID:entorno.idCaso,
  			}
			var datos={
  					id:bene,
					
					nombreResponsable:entorno.nombreResponsable,
					apePaternoResponsable:entorno.apePaternoResponsable,
					apeMaternoResponsable:entorno.apeMaternoResponsable,
					
					tipoParentescoResponsable:entorno.relacionResponsable,
					edadResponsable:entorno.edadResponsable,
					tipoDocumentoResponsable:entorno.tipoDocumentoResponsable,
					direccionResponsable:entorno.direccionResponsable,
					instruccionResponsable:entorno.gradoInstruccionResponsable,
					numDocumentoResponsable:entorno.documentoResponsable,
					referenciaResponsable:entorno.referenciaResponsable,
					sexoResponsable:entorno.generoResponsable,			
					telefonoResponsable:entorno.telefonoResponsable,
					
					usuarioCreacion:"no aplica",
					fechaCreacion:ahora,
					usuarioModificacion:"no aplica",
					fechaModificacion:null,
			}
			
			beneficiariosService.nuevoResponsable(datos).then(function(respuesta){
				if(respuesta.estado=="OK"){
					
					entorno.mostrarExito=true;
					entorno.mostrarFalla=false;
				}else{
					
					entorno.mostrarExito=false;
					entorno.mostrarFalla=true;
				}
			});
  		}
  		
  		
  		
  	//graba agresor en carpeta fiscal
  		this.guardarAgresor=function(){
  			var ahora = new Date();
  			var bene =  {
  					beneficiarioID:entorno.idActivo,
					casoID:entorno.idCaso,
  			}
			var datos={
  					id:bene,
					
					nombreAgresor:entorno.nombreAgresor,
					apePaternoAgresor:entorno.apePaternoAgresor,
					apeMaternoAgresor:entorno.apeMaternoAgresor,
//					apeMaternoResponsable:entorno.apeMaternoAgresor,
					tipoParentescoAgresor:entorno.relacionAgresor,
					edadAgresor:entorno.edadAgresor,
					tipoDocumentoAgresor:entorno.tipoDocumentoAgresor,
					numDocumentoAgresor:entorno.documentoAgresor,
					instruccionAgresor:entorno.gradoInstruccionAgresor,
					sexoAgresor:entorno.generoAgresor,
					
					direccionAgresor:entorno.direccionAgresor,
					
					referenciaAgresor:entorno.referenciaAgresor,

					usuarioCreacion:"no aplica",
					fechaCreacion:ahora,
					usuarioModificacion:"no aplica",
					fechaModificacion:null,
			}
			
			beneficiariosService.nuevoAgresor(datos).then(function(respuesta){
				if(respuesta.estado=="OK"){
					
					entorno.mostrarExito=true;
					entorno.mostrarFalla=false;
				}else{
					
					entorno.mostrarExito=false;
					entorno.mostrarFalla=true;
				}
			});
  		}
  		
  		
  	//graba agresor en carpeta fiscal
  		this.guardarMotivo=function(){
  			var ahora = new Date();
  			var bene =  {
  					beneficiarioID:entorno.idActivo,
					casoID:entorno.idCaso,
  			}
			var datos={
  					id:bene,
					procedenciaID:entorno.procedencia,
					detalleProcedencia:entorno.detalleProcedencia,
					motivoID:entorno.motivo,
					detalleMotivo:entorno.detalleMotivo,
					responsable:entorno.responsableDerivacion,
					//fechaDerivacion:entorno.fechaDerivacion,
					usuarioCreacion:"no aplica",
					fechaCreacion:ahora,
					usuarioModificacion:"no aplica",
					fechaModificacion:null,
			}
			
			beneficiariosService.nuevoMotivoIngreso(datos).then(function(respuesta){
				if(respuesta.estado=="OK"){
					
					entorno.mostrarExito=true;
					entorno.mostrarFalla=false;
				}else{
					
					entorno.mostrarExito=false;
					entorno.mostrarFalla=true;
				}
			});
  		}
  		
  		
  	    //calendario
		//para los calendarios
		entorno.calendarioAbierto = false;
		entorno.calendarioAbierto2 = false;
		entorno.formats = ['dd/MM/yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		entorno.format = entorno.formats[0];

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
    		formatYear: 'yyyy',
    		startingDay: 1
  		};
		//fin calendario
  		
  		
  		
  		
  		this.ok = function () {
    		$modalInstance.close(entorno.idActivo);
  		}
  		
	});
	
	
	
	
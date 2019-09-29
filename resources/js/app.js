/*require('./bootstrap');
*/
new Vue({
	el: '#crud',
	created: function(){
		this.getKeeps();
	},
	data:{
		keeps:[],
		newKeep: '',
		pagination:{
			'total'       : 0,//Total de los registros a paginar
            'current_page': 0,//Pagina actual donde nos encontramos
            'per_page'    : 0,//Cantidad de registros por paginas
            'last_page'   : 0,//Ultima pagina
            'from'        : 0,//Pagina Desde
            'to'          : 0//Pagina Hasta
		},
		fillKeep: {'id': '', 'keep': ''},
		errors: [],
		offset: 3,
	},
	computed:{
		isActived: function(){
			return this.pagination.current_page;
		},
		pageNumber: function(){
			if(!this.pagination.to){
				return [];
			}

			var from = this.pagination.current_page - this.offset;

			if(from < 1){
				from = 1;
			}

			var to = from + (this.offset * 2);

			if(to >= this.pagination.last_page){
				to = this.pagination.last_page
			}

			var pagesArray = [];

			while(from <= to){
				pagesArray.push(from);
				from++;
			}

			return pagesArray;
		}
	},
	methods:{
		//getKeeps: function(){//Sin paginación
			//var urlKeeps = 'tasks';//ruta donde van a ser listados todos los registros
		getKeeps: function(page){
			var urlKeeps = 'tasks?page='+page;
			axios.get(urlKeeps).then(response => {
				//this.keeps = response.data//Todos los parametros que van a ser listados sin paginacion
				this.keeps      = response.data.task.data,
				this.pagination = response.data.pagination
			});
		},
		editKeeps: function(keep){
			this.fillKeep.id   = keep.id;
			this.fillKeep.keep = keep.keep;
			$('#edit').modal('show');
		},
		updateKeeps: function(id){
			var urlEdit = 'tasks/' + id;
			axios.put(urlEdit, this.fillKeep).then(response => {
				this.getKeeps();
				this.fillKeep = {'id': '', 'keep': ''};
				this.errors   = [];
				$('#edit').modal('hide');
				toastr.success('Task update Successfully'); 
			}).catch(error => {
				this.errors = error.response.data
			});
		},
		deleteKeeps: function(keep){
			var urlDel = 'tasks/' + keep.id;//ruta donde va a trabajar con el id correspondiente
			const con  = confirm('Are you sure to delete the task ' + keep.id);
      		if(con){
				axios.delete(urlDel).then(response => {//Eliminamos el registro
					this.getKeeps();//Listamos los registros nuevamente
					toastr.success('Successfully removed N°.'+ keep.id);//Mensaje de Eliminado con Exito
				});
			}
		},
		createKeeps: function(){
			var urlSave = 'tasks';
			axios.post(urlSave, {//ruta donde va a trabajar
				keep: this.newKeep//Todos los parametros que van a ser grabados
			}).then(response => {//Si todo sale bien
				this.getKeeps();//refresch la lista
				this.newKeep = '';//colocamos en blanco la caja de texto
				this.errors  = [];//Blanqueamos los errores
				$('#create').modal('hide');//usamos JQuery para desaparecer la ventana modal create
				toastr.success('New task created successfully');////Mensaje de Creado con Exito
			}).catch(error => {//Si todo no va bien
				this.errors = error.response.data
			});
		},
		changesPage: function(page){
			this.pagination.current_page = page;
			this.getKeeps(page);
		}
	}
});
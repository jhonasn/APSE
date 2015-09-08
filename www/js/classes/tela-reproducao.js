var TelaReproducao = function() {
	var self = this

	this.titulo = new String
	this.descricao = new String
	this.instrucoes = new Array
	
	if(arguments.length > 0) {
			self.titulo = arguments[0]
	}
	if(arguments.length > 1) {
			self.descricao = arguments[1]
	}
	if(arguments.length > 2) {
		if(Array.isArray(arguments[2])) {
			self.instrucoes = arguments[2]
		}
	}
}

$(document).ready(function () {
	debugger
	$('.escolha').click(function() {
		var obj = $(this).closest('.row').find('img')
		var selecionado = $(obj).attr('id')

		$('img').fadeTo('fast', 1)
		$(obj).fadeTo('fast', 0.6)

		var telaContent = app.dadosTela.escolhas.filter(function(t) {
				return t.icone === selecionado
		})

		if(telaContent.length > 0) {
			telaContent = telaContent[0]
			telaContent.icone = app.dadosTela.icone
		} else {
			return
		}

		app.abrirTelaReproducao(telaContent)
	})

	app.ready()

	/*
	var container = $('.container').first()
	var content = $('#content')
	if($(container).height() < $(content).height()) {
		$(container).css('position', 'absolute')
		$(container).css('top', '50%')
		$(container).css('margin-top', ((($(container).height() / 2) * -1) + 'px'))
	}
       */
})

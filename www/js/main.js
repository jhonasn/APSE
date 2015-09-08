$(document).ready(function() {
	var svgDoc = $('#main-btns').get(0)
	var contentHtml = null

	$(svgDoc).on('load', function() {
		svgDoc = svgDoc.contentDocument

		$(svgDoc).find('g[id].clicable').click(function() {
			var selecionado = $(this).attr('id')
			var html = $(contentHtml)

			switch(selecionado) {
				case 'btn-fogo':
					selecionado = 'queimaduras'
					break;
				case 'btn-cabeca':
					selecionado = 'epilepsia'
					break;
				case 'btn-mao-faca':
					selecionado = 'cortes-hemorragia'
					break;
				case 'btn-cabeca-garganta':
					selecionado = 'engasgo'
					break;
				case 'btn-pessoa-caindo':
					selecionado = 'quedas'
					break;
				case 'btn-mao-agua':
					selecionado = 'afogamento'
					break;
				case 'btn-coracao':
					selecionado = 'parada-cardiaca'
					break;
				case 'btn-carro':
					selecionado = 'acidentes-transito'
					break;
				/*
				case 'btn-logo':
					break;
				*/
			       default:
				       selecionado = null
				       break;

			}

			if(selecionado !== null) {
				var content = $(html).find('#' + selecionado)
				console.log(content)
			}
		})
	})

	$.get('/templates/content.html')
	.success(function(data) {
		contentHtml = data
	})
	.error(function(err) {
		alert('Houve um erro ao acessar os dados base do aplicativo. Tente reiniciar o aplicativo.')
	})

	/*
	$('#reproduzir').click(function() {
		var txt = $('#texto').val()
		TTS.speak(
			txt,
			function() {
				alert('terminou de reproduzir a bagaca')
			},
			function(reason) {
				alert('Deu erro, segue: ', reason)
			}
		)
	})
        */
})

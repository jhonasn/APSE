$(document).ready(function() {
	var svgDoc = $('#main-btns').get(0)

	$(svgDoc).on('load', function() {
		svgDoc = svgDoc.contentDocument

		$(svgDoc).find('g[id].clicable').click(function() {
			var selecionado = $(this).attr('id')
			var soso = null

			switch(selecionado) {
				case 'btn-fogo':
					soso = 'fogo!'
					break;
				case 'btn-cabeca':
					soso = 'cabeca!'
					break;
				case 'btn-mao-faca':
					soso = 'olha faca!'
					break;
				case 'btn-cabeca-garganta':
					soso = 'gargantilha!'
					break;
				case 'btn-pessoa-caindo':
					soso = 'cainndooooo!'
					break;
				case 'btn-mao-agua':
					soso = 'to me afogano carae'
					break;
				case 'btn-coracao':
					soso = 'ae meo core'
					break;
				case 'btn-carro':
					soso = 'vrum vrummm'
					break;
				case 'btn-logo':
					soso = 'criko no meio.'
					break;

			}
			if(soso !== null) {
				alert(soso)
			}
		})
	})

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
})

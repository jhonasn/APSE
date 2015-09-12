$(document).ready(function () {
	debugger
	var svgDoc = $('#maleta-btn').get(0)

	$(svgDoc).on('load', function () {
		svgDoc = svgDoc.contentDocument

		$(svgDoc).find('g[id]').click(function () {
			var id = $(this).attr('id')
			alert('voce clicou no btn #{id}'.replace('{id}', id))
		})
	})

	$('#reproduzir').click(function () {
		var txt = $('maleta louca').val()
		TTS.speak(
			txt,
			function () {
				alert('terminou de reproduzir a bagaca')
			},
			function (reason) {
				alert('Deu erro, segue: ', reason)
			}
		)
	})
})

$(document).ready(function() {
	var svgDoc = $('#btns-player').get(0)

	$(svgDoc).on('load', function() {
		svgDoc = svgDoc.contentDocument

		$(svgDoc).find('g[id].clicable').click(function() {
			var selecionado = $(this).attr('id')
			var tst = null

			switch(selecionado) {
				case 'btn-play':
					tst = 'play'
					break
				case 'btn-pause':
					tst = 'pause'
					break
				case 'btn-stop':
					tst = 'pause'
					break
				case 'btn-foward':
					tst = 'foward'
					break
				case 'btn-back':
					tst = 'back'
					break
				default:
					break
			}
		})
		
		alert('teste: ', tst)
	})
})

$(document).ready(function() {
	debugger
	app.ready()
	var svgDoc = $('#btns-player').get(0)
	var player = {
		instrucaoAtual: 0,
		avancar: true,
		play: function() {
			this.avancar = true
			trocaInstrucaoUI(this.instrucaoAtual)
			this.reproduzirAudio(this.instrucaoAtual, this.proximoAudio)
		},
		parar: function() {
			this.instrucaoAtual = 0
			this.avancar = false
			trocaInstrucaoUI(this.instrucaoAtual)
			this.pararAudio()
		},
		pausar: function() {
			this.avancar = false
			this.pararAudio()
		},
		proximo: function() {
				this.instrucaoAtual++
				this.avancar = false
				this.pararAudio(function() {
					player.play()
				})
		},
		anterior: function() {
			if(this.instrucaoAtual > 0) {
				this.instrucaoAtual--
				this.avancar = false
				this.pararAudio(function() {
					player.play()
				})
			}
		},
		pararAudio: function (cb) {
			TTS.speak('', cb, cb)
		},
		reproduzirAudio: function (id, cb) {
			TTS.speak({
				text: app.dadosTela.instrucoes[id],
				locale: 'pt-BR',
				//rate: 0.75
			}, function() {
				cb(null)
			}, function(err) {
				cb('Error: ' + err)
			})
		},
		proximoAudio: function(err) {
			if(!err && player.avancar && player.instrucaoAtual < (app.dadosTela.instrucoes.length - 1)) {
				player.instrucaoAtual++
				trocaInstrucaoUI(player.instrucaoAtual)
				player.reproduzirAudio(player.instrucaoAtual, player.proximoAudio)
			} else if(err) {
				alert('Ocorreu um erro ao reproduzir o audio, tente novamente.')
			} else if(!player.avancar) {
			} else {
				player.parar()
			}
		}
	}

	$(svgDoc).on('load', function() {
		svgDoc = svgDoc.contentDocument

		$(svgDoc).find('g[id].clicable').click(function() {
			var selecionado = $(this).attr('id')

			switch(selecionado) {
				case 'btn-play':
					player.play()
				break
				case 'btn-pause':
					player.pausar()
				break
				case 'btn-stop':
					player.parar()
				break
				case 'btn-foward':
					player.proximo()
				break
				case 'btn-backward':
					player.anterior()
				break
				default:
					break
			}
		})
	})

	$('#instrucoes').find('.list-group-item').click(function(e) {
		e.preventDefault()
		player.instrucaoAtual = parseInt($(this).attr('id'))
		player.avancar = false
		trocaInstrucaoUI(player.instrucaoAtual)
		player.pararAudio(function() {
			player.play()
		})
	})

	var trocaInstrucaoUI = function (id, scrollWindow) {
		$('#instrucoes').find('.list-group-item').removeClass('active')
		$('#instrucoes').find('.list-group-item#{id}'.replace('{id}', id))
					.addClass('active')
		if(scrollWindow !== false) {
			$('html,body').animate({ scrollTop: $('#instrucoes').find('.list-group-item.active').offset().top }, 'slow')
		}
	}

	$('#btn-phone').click(function(e) {
		window.location.href = 'tel:192'
	})

	trocaInstrucaoUI(player.instrucaoAtual, false)
})

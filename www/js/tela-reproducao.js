$(document).ready(function() {
	debugger
	app.ready()
	var svgDoc = $('#btns-player').get(0)
	var player = {
		audio: null,
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
			// TTS.speak('', cb, cb)
			player.audio.pause()
			player.audio.currentTime = 0
			player.audio.src = ''
			cb ? cb() : void(0)
			// audioEl.get(0).load()
		},
		reproduzirAudio: function (id, cb) {
			// TTS.speak({
			// 	text: app.dadosTela.instrucoes[id],
			// 	locale: 'pt-BR',
			// 	//rate: 0.75
			// }, function() {
			// 	cb(null)
			// }, function(err) {
			// 	cb('Error: ' + err)
			// })
			player.audio = new Audio()
			player.audio.autoplay = true
			player.audio.preload = 'auto'

			var url = 'media/{e}{id}_{i}.mp3'
			url = url.replace('{e}', app.dadosTela.escolhaId ? app.dadosTela.escolhaId.concat('_') : '')
			.replace('{id}', app.dadosTela.id)
			.replace('{i}', id)

			player.audio.src = url
			/*
				audio.networkState
				0 = NETWORK_EMPTY - audio/video has not yet been initialized
				1 = NETWORK_IDLE - audio/video is active and has selected a resource, but is not using the network
				2 = NETWORK_LOADING - browser is downloading data
				3 = NETWORK_NO_SOURCE - no audio/video source found
			*/
			// if(player.audio.networkState == 0) {
				// player.audio.load()
			// }
			// $(player.audio).on('loadeddata', function() {
			// 	player.audio.play()
			// })
			$(player.audio).on('ended', function() {
				cb ? cb() : void(0)
			})
			$(player.audio).on('error, stalled, abort, suspend', function(err) {
				console.log(err)
				console.log(arguments)
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
			$(svgDoc).find('g[id].clicable').fadeTo('fast', 1)
			$(this).fadeTo('fast', 0.6)

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
			$('html,body').animate({ scrollTop: $('#instrucoes').find('.list-group-item.active').offset().top - (window.innerHeight / 2) }, 'slow')
		}
	}

	$('#btn-phone').click(function(e) {
		window.location.href = 'tel:192'
	})

	trocaInstrucaoUI(player.instrucaoAtual, false)
})

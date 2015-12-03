var mensagemErro = 'Houve um erro ao acessar os dados base do aplicativo. Tente reiniciar o aplicativo.'
var app = {
	tela: null,
	dadosTelas: null,
	dadosTela: null,
	autoplay: true,
	mostrouLigar: false,
	tempoCorrecaoTela: 0,
	ready: function() {
		var btnHome = $('#btn-home')
		if(btnHome.length) {
			$(btnHome).off('click')
			$(btnHome).click(function(e) {
				// $('#content').fadeOut('fast', function() {
				// 	$('#content').hide()
				app.abrirTelaHome()
				// })
			})
		}

		var autoplayEl = $('#autoplay')
		$(autoplayEl).find('.btn-success').click(function() {
			app.autoplay = true
			app.autoplayChangeUI()
		})
		$(autoplayEl).find('.btn-default').click(function() {
			app.autoplay = false
			app.autoplayChangeUI()
		})
		app.autoplayChangeUI()

		app.show()
	},
	autoplayChangeUI: function () {
        var autoplayEl = $('#autoplay')
        $(autoplayEl).find('.btn').removeClass('active')
		if(app.autoplay) {
			$(autoplayEl).find('.btn-success').addClass('active')
		} else {
			$(autoplayEl).find('.btn-default').addClass('active')
		}
    },
	ligarEmergencia: function() {
		window.location.href = 'tel:192'
	},
	getDadosTelas: function() {
		$.get('data/conteudo-telas.json')
		.success(function(data) {
			if(typeof data === 'string') {
				app.dadosTelas = JSON.parse(data)
			} else {
				app.dadosTelas = data
			}
		})
		.error(function(err) {
			alert(mensagemErro)
		})
	},
	abrirTelaHome: function() {
		app.tela = 'home'
		var svgDoc = null
		var svgDocOnLoad = null
		$.get('templates/tela-home.html')
		.success(function(content) {
			$('#content').html(content)
			svgDoc = $('#main-btns').get(0)
			$(svgDoc).on('load', svgDocOnLoad)
			$(svgDoc).ready(app.correcoesOrientacaoTela)
			$('#content').ready(mainReady)
		})
		.error(function(err) {
			alert(mensagemErro)
		})

		svgDocOnLoad = function() {
			svgDoc = svgDoc.contentDocument

			var timeMouseDown = null

			$(svgDoc).find('g[id].clicable').on('touchstart', function() {
				timeMouseDown = new Date()
				var selecionado = $(this).attr('id')
				var telaContent = app.dadosTelas.telas.filter(function(t) {
					return t.icone === selecionado
				})[0]

				var elNomeElSelecionado = $('#nome-btn-selecionado')
				$(elNomeElSelecionado).text(telaContent.titulo)
				$(elNomeElSelecionado).visible()
			})

			$(svgDoc).find('g[id].clicable').on('touchend', function() {
				var elNomeElSelecionado = $('#nome-btn-selecionado')
				$(elNomeElSelecionado).invisible()
			})

			$(svgDoc).find('g[id].clicable').click(function() {
				$(svgDoc).find('g[id].clicable').fadeTo('fast', 1)
				$(this).fadeTo('fast', 0.6)
				var selecionado = $(this).attr('id')

				var telaContent = app.dadosTelas.telas.filter(function(t) {
					return t.icone === selecionado
				})

				if(telaContent.length > 0) {
					telaContent = telaContent[0]
				} else {
					return
				}

				if(telaContent.hasOwnProperty('escolhas') && Array.isArray(telaContent.escolhas)) {
					app.abrirTelaEscolha(telaContent)
				} else {
					app.abrirTelaReproducao(telaContent)
				}
			})
		}

		app.correcoesOrientacaoTela()
	},
	abrirTelaReproducao: function(dadosTela) {
		app.tela = 'reproducao'
		dadosTela.escolhaId = dadosTela.escolhaId || ''
		app.dadosTela = dadosTela
		$.get('templates/tela-reproducao.html')
		.success(function(content) {
			// $('#content').fadeOut('fast')
			// $('#content').hide()
			content = content.replace(/\{titulo\}/g, dadosTela.titulo)
			.replace(/\{icone\}/g, dadosTela.icone)

			content = $(content)

			var instrucoesTemplate = $(content).filter('#instrucoes')
			var instrucaoTemplate = $(instrucoesTemplate).children().first().get(0).outerHTML

			$(instrucoesTemplate).empty()

			dadosTela.instrucoes.forEach(function(instrucao, i) {
				var template = instrucaoTemplate
				.replace(/\{instrucao\}/g, instrucao)
				.replace(/\{id\}/g, i)
				$(instrucoesTemplate).append(template)
			})

			$('#content').html(content)
		})
		.error(function(err) {
			alert(mensagemErro)
		})
	},
	abrirTelaEscolha: function(dadosTela) {
		app.tela = 'escolha'
		app.dadosTela = dadosTela
		$.get('templates/tela-escolha.html')
		.success(function(content) {
			// $('#content').fadeOut('fast')
			// $('#content').hide()
			content = $(content)

			var principal = $(content).children().filter('#detalhes-tela')
			strPrincipal = $(principal).get(0).outerHTML
			$(principal).remove()
			strPrincipal = strPrincipal.replace(/\{titulo\}/g, dadosTela.titulo)
			.replace(/\{icone\}/g, dadosTela.icone)

			$(content).prepend(strPrincipal)

			var templateEl = $(content).children().filter('#item-template')
			var template = $(templateEl).get(0).innerHTML
			$(templateEl).remove()

			dadosTela.escolhas.forEach(function(e, i) {
				var strTemplate = template.replace(/\{titulo\}/g, e.titulo)
				.replace(/\{icone\}/g, e.icone)
				.replace(/\{descricao\}/g, e.descricao)

				if(!e.descricao) {
					strTemplate = $(strTemplate)
					$(strTemplate).children().filter('.subtitulo')
					.children().filter('h3').remove()
				}

				$(content).append(strTemplate)
			})

			$('#content').html(content)
		})
		.error(function(err) {
			alert(mensagemErro)
		})
	},
	correcoesOrientacaoTela: function () {
		$('#content').css('min-height', window.innerHeight + 'px')
        // $('#content').css('height', window.innerHeight + 'px')

        if(app.tela === 'home') {
            //ajustes de centralização na tela
            var mainBtns = $('#main-btns')
            var mcBtns = $('#modo-continuo')
			// var hBtns = $(mainBtns).height()
			// var hModoContinuo = $(modoContinuo).height()
   //          var hTitulo = $('#nome-btn-selecionado').height()
			// var hTela = window.innerHeight

   //          if ($(mainBtns).height() >= (hTela - hTitulo)) {
   //              $(mainBtns).height(hTela - hTitulo - (hTela * 0.2))
   //          } else {
   //              $(mainBtns).css('height', 'auto')
   //          }

   //          var distanciaTopMainBtns = hTela / 2 //Math.floor((hTela / 2) - (hBtns / 2))
   //          var distanciaTopModoContinuo = distanciaTopMainBtns + ((hBtns / 2) + 20)

   //          $(mainBtns).css('margin-top', distanciaTopMainBtns * -1)
   //          $(modoContinuo).css('margin-top', distanciaTopModoContinuo * -1)
   			$(mainBtns).css('margin-top', ($(mainBtns).height() / 2) * -1)
   			$(mcBtns).css('margin-top', ($(mainBtns).height() / 2) + 20)
   			$(mcBtns).css('margin-left', ($(mcBtns).width() / 2) * -1)
        }
	},
	show: function() {
		// $('#content').fadeIn('fast', function() {
			// $('#content').show()
			app.correcoesOrientacaoTela()
		// })
	},
	correcaoTela: function() {
		var tempo = (new Date()) - app.tempoCorrecaoTela
		console.log('correcao tela: '.concat(tempo))

		app.correcoesOrientacaoTela()

		if(tempo < 500) {
			setTimeout(app.correcaoTela, 50)
		}		
	}
}


var mainReady = function() {
	if(!app.tela) {
		app.abrirTelaHome()
	}

	window.onscroll = function(e) {
		if(window.scrollY > (window.screen.height * 0.3)) {
			$('#scroll-top').fadeIn('fast')
		} else {
			$('#scroll-top').fadeOut('fast')
		}
	}

	$('#scroll-top').click(function(e) {
		$('html,body').animate({ scrollTop: 0 }, 'slow')
	})

	// $(document).on('deviceready', function() {
	// 	window.navigator.splashscreen.hide()
	// })

	$(document).on('backbutton', function() {
		if(app.tela !== 'home') {
			// $('#content').fadeOut('fast', function() {
				// $('#content').hide()
				app.abrirTelaHome()
			// })
		} else {
			navigator.app.exitApp()
		}
	})

	app.correcoesOrientacaoTela()

	if(!app.mostrouLigar) {
		navigator.notification.confirm(
			'Antes de qualquer coisa, ligue para a emergência',
			function (btnIdx) {
				if(btnIdx === 1) {
						app.ligarEmergencia()
				}
				app.correcoesOrientacaoTela()
			},
			'Ligar para emergência',
			['Ligar', 'Fechar']
		)
		app.mostrouLigar = true
	}
	
	app.getDadosTelas()
	app.ready()
	app.correcoesOrientacaoTela()
	app.tempoCorrecaoTela = new Date()
	app.correcaoTela()
}

$(document).on('deviceready', mainReady)
$(document).ready(app.correcoesOrientacaoTela)
$(document).load(app.correcoesOrientacaoTela)
window.resize = app.correcoesOrientacaoTela

jQuery.fn.visible = function() {
    return this.css('visibility', 'visible')
}

jQuery.fn.invisible = function() {
    return this.css('visibility', 'hidden')
}

jQuery.fn.visibilityToggle = function() {
    return this.css('visibility', function(i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible'
    })
}

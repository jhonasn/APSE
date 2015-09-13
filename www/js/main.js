var app = {
	ready: function() {
		var btnHome = $('#btn-home')
		if(btnHome.length) {
			$(btnHome).off('click')
			$(btnHome).click(function(e) {
				window.location.href = ''
			})
		}
	},
	dadosTelas: null,
	dadosTela: null,
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
	abrirTelaReproducao: function(dadosTela) {
		app.dadosTela = dadosTela
		$.get('templates/tela-reproducao.html')
		.success(function(content) {
			$('#content').fadeOut()
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
			$('#content').fadeIn()
		})
		.error(function(err) {
			alert(mensagemErro)
		})
	},
	abrirTelaEscolha: function(dadosTela) {
		app.dadosTela = dadosTela
		$.get('templates/tela-escolha.html')
		.success(function(content) {
			$('#content').fadeOut()
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
			$('#content').fadeIn()
		})
		.error(function(err) {
			alert(mensagemErro)
		})
	}
}


$(document).ready(function() {
	app.ready()

	var svgDoc = $('#main-btns').get(0)
	var mensagemErro = 'Houve um erro ao acessar os dados base do aplicativo. Tente reiniciar o aplicativo.'

	$(svgDoc).on('load', function() {
		svgDoc = svgDoc.contentDocument

		$(svgDoc).find('g[id].clicable').click(function() {
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
	})

	window.onscroll = function(e) {
		if(window.scrollY > (window.screen.height * 0.3)) {
			$('#scroll-top').fadeIn()
		} else {
			$('#scroll-top').fadeOut()
		}
	}

	$('#scroll-top').click(function(e) {
		//window.scroll(0, 0)
		$('html,body').animate({ scrollTop: 0 }, 'slow')
	})

	var correcoesOrientacaoTela = function () {
		$('#content').css('min-height', window.innerHeight + 'px')
		var mainBtns = $('#main-btns')

		if($(mainBtns).height() >= window.innerHeight) {
			$(mainBtns).height(window.innerHeight - (window.innerHeight * 0.2))
		} else {
			$(mainBtns).css('height', 'auto')
		}

		$(mainBtns).css('margin-top', (($(mainBtns).height() / 2) * -1) + 'px')
	}

	/*
	//isso n funciona certo, tem um delay estranho
	window.addEventListener('orientationchange', function(){
		var currentOrientation = ""

		if (window.orientation === 90 || window.orientation === -90) {
			currentOrientation = "landscape"
		} else {
			currentOrientation = "portrait"
		}
	})
       */

	window.onresize = correcoesOrientacaoTela
	$(document).on('deviceready', correcoesOrientacaoTela)
	$(document).on('deviceready', window.navigator.splashscreen.hide)

	correcoesOrientacaoTela()
	app.getDadosTelas()
})

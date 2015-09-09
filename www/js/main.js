$(document).ready(function() {
	var svgDoc = $('#main-btns').get(0)
	var content = null
	var mensagemErro = 'Houve um erro ao acessar os dados base do aplicativo. Tente reiniciar o aplicativo.'

	$(svgDoc).on('load', function() {
		svgDoc = svgDoc.contentDocument

		$(svgDoc).find('g[id].clicable').click(function() {
			var selecionado = $(this).attr('id')

			var telaContent = content.telas.filter(function(t) {
				return t.icone === selecionado
			})

			if(telaContent.length > 0) {
				telaContent = telaContent[0]
			} else {
				return
			}

			if(telaContent.hasOwnProperty('escolhas') && Array.isArray(telaContent.escolhas)) {
				console.log('tela escolha preencher com:', telaContent)
			} else {
				console.log('tela reproducao preencher com:', telaContent)
			}
		})
	})

	$.get('data/conteudo-telas.json')
	.success(function(data) {
		content = data
		console.log('ok json pego:', data)
	})
	.error(function(err) {
		alert(mensagemErro)
	})

	var abrirTelaReproducao = function(dadosTela) {
		$.get('templates/tela-reproducao.html')
		.success(function(content) {
			content.replace('{titulo}', dadosTela.titulo)
				.replace('{icone}', dadosTela.icone)
			content = $(content)

			var instrucoesTemplate = $(content).find('#instrucoes').clone()
			dadosTela.instrucoes.forEach(function(i) {
				var template = $(instrucoesTemplate).clone()
			})
			$('#content').html(content)
		})
		.error(function(err) {
			alert(mensagemErro)
		})
	}

	var abrirTelaEscolha = function(dadosTela) {
		$.get('templates/tela-escolha.html')
		.success(function(content) {
			content.replace('{titulo}', dadosTela.titulo)
				.replace('{icone}', dadosTela.icone)
			content = $(content)

			/*
			var instrucoesTemplate = $(content).find('#instrucoes').clone()
			dadosTela.instrucoes.forEach(function(i) {
				var template = $(instrucoesTemplate).clone()
			})
			$('#content').html(content)
		        */
		})
		.error(function(err) {
			alert(mensagemErro)
		})
	}

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

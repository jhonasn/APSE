var mensagemErro = 'Houve um erro ao acessar os dados base do aplicativo. Tente reiniciar o aplicativo.'
var app = {
    tela: null,
    dadosTelas: null,
    dadosTela: null,
    autoplay: true,
    ready: function() {
        var btnHome = $('#btn-home')
        if (btnHome.length) {
            $(btnHome).off('click')
            $(btnHome).click(function(e) {
                $('#content').fadeOut('fast', function() {
                    $('#content').hide()
                    app.abrirTelaHome()
                })
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
    autoplayChangeUI: function() {
        var autoplayEl = $('#autoplay')
        $(autoplayEl).find('.btn').removeClass('active')
        if (app.autoplay) {
            $(autoplayEl).find('.btn-success').addClass('active')
        } else {
            $(autoplayEl).find('.btn-default').addClass('active')
        }
    },
    ligarEmergencia: function() {
        window.location.href = 'tel:192'
    },
    isMobileOrTablet: function() {
        var check = false;
        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    },
    getDadosTelas: function() {
        $.get('data/conteudo-telas.json')
            .success(function(data) {
                if (typeof data === 'string') {
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
                $('#content').ready(mainReady)
            })
            .error(function(err) {
                alert(mensagemErro)
            })

        svgDocOnLoad = function() {
            svgDoc = svgDoc.contentDocument

            var timeMouseDown = null

            var touchOrClickStart = 'mousedown'
            var touchOrClickEnd = 'mouseup'
            if(app.isMobileOrTablet()) {
                touchOrClickStart = 'touchstart'
                touchOrClickEnd = 'touchend'
            }

            $(svgDoc).find('g[id].clicable').on(touchOrClickStart, function() {
                timeMouseDown = new Date()
                var selecionado = $(this).attr('id')
                var telaContent = app.dadosTelas.telas.filter(function(t) {
                    return t.icone === selecionado
                })[0]

                var elNomeElSelecionado = $('#nome-btn-selecionado')
                $(elNomeElSelecionado).text(telaContent.titulo)
                $(elNomeElSelecionado).visible()
            })

            $(svgDoc).find('g[id].clicable').on(touchOrClickEnd, function() {
                var elNomeElSelecionado = $('#nome-btn-selecionado')
                $(elNomeElSelecionado).invisible()
            })

            $(svgDoc).find('g[id].clicable').click(function(e) {
                timeMouseDown = new Date() - timeMouseDown
                if (timeMouseDown >= 200) {
                    return
                }

                $(svgDoc).find('g[id].clicable').fadeTo('fast', 1)
                $(this).fadeTo('fast', 0.6)
                var selecionado = $(this).attr('id')

                var telaContent = app.dadosTelas.telas.filter(function(t) {
                    return t.icone === selecionado
                })

                if (telaContent.length > 0) {
                    telaContent = telaContent[0]
                } else {
                    return
                }

                if (telaContent.hasOwnProperty('escolhas') && Array.isArray(telaContent.escolhas)) {
                    app.abrirTelaEscolha(telaContent)
                } else {
                    app.abrirTelaReproducao(telaContent)
                }
            })
        }
    },
    abrirTelaReproducao: function(dadosTela) {
        app.tela = 'reproducao'
        dadosTela.escolhaId = dadosTela.escolhaId || ''
        app.dadosTela = dadosTela
        $.get('templates/tela-reproducao.html')
            .success(function(content) {
                $('#content').fadeOut('fast')
                $('#content').hide()
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
                $('#content').fadeOut('fast')
                $('#content').hide()
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

                    if (!e.descricao) {
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
    correcoesOrientacaoTela: function() {
        $('#content').css('min-height', window.innerHeight + 'px')
            // $('#content').css('height', window.innerHeight + 'px')

        if (app.tela === 'home') {
            //ajustes de centralização na tela
            var mainBtns = $('#main-btns')
            var hBtns = $(mainBtns).height()
            var hTitulo = $('#nome-btn-selecionado').height()
            var hTela = window.innerHeight

            if ($(mainBtns).height() >= (hTela - hTitulo)) {
                $(mainBtns).height(hTela - hTitulo - (hTela * 0.2))
            } else {
                $(mainBtns).css('height', 'auto')
            }

            $(mainBtns).css('margin-top', ((hTela / 2) - (hBtns / 2) - hTitulo))
        }
    },
    show: function() {
        $('#content').fadeIn('fast', function() {
            $('#content').show()
            app.correcoesOrientacaoTela()
        })
    }
}


var mainReady = function() {
    if (!app.tela) {
        app.abrirTelaHome()
    }

    window.onscroll = function(e) {
        if (window.scrollY > (window.screen.height * 0.3)) {
            $('#scroll-top').fadeIn('fast')
        } else {
            $('#scroll-top').fadeOut('fast')
        }
    }

    $('#scroll-top').click(function(e) {
        $('html,body').animate({
            scrollTop: 0
        }, 'slow')
    })

    window.onresize = app.correcoesOrientacaoTela
    $(document).on('deviceready', app.correcoesOrientacaoTela)
    $(document).on('deviceready', function() {
        window.navigator.splashscreen.hide()
    })

    $(document).on('backbutton', function() {
        if (app.tela !== 'home') {
            $('#content').fadeOut('fast', function() {
                $('#content').hide()
                app.abrirTelaHome()
            })
        } else {
            navigator.app.exitApp()
        }
    })

    $('#main-btns').ready(app.correcoesOrientacaoTela)

    var ligarAlert = $('#ligar-alert')
    $(ligarAlert).find('.btn.btn-success').click(function(e) {
        $(ligarAlert).modal('hide')
        app.ligarEmergencia()
    })
    $(ligarAlert).modal('show')

    app.correcoesOrientacaoTela()
    app.getDadosTelas()
    app.ready()
}

$(document).ready(mainReady)

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

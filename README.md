## Instruções para instalação
baixar e instalar node.js em http://nodejs.org
baixar e instalar o github em https://windows.github.com/ (selecionar o modo bash)

abrir o terminal de comandos e entrar com os comandos:

instalar o cordova/phonegap
``
npm install -g cordova
``

baixar o projeto
``
git clone https://github.com/jhonasn/br.cnec.faculdadecampolargo.salva-vidas-op2
``

entrar na pasta do projeto, instalar a plataforma e o plugin do tts
``
cd br.cnec.faculdadecampolargo.salva-vidas-op2
cordova platform add [wp8/ios/android] //escolher uma delas
cordova plugin add com.wordsbaking.cordova.tts
``

Note que para instalar o plugin primeiro precisamos instalar a plataforma.

Para reconhecimento de voz acredito que vamos poder usar ou o plugin do navegador ou este:

https://github.com/macdonst/SpeechRecognitionPlugin

para instalar ele no cordova usamos os comandos:
```
cordova plugin add https://github.com/macdonst/SpeechRecognitionPlugin
```

ok, para framework que nos ajudara com o estilo e programação javascript após uma pesquisa achei o framework 7 um framework mais facil de usar, muito parecido com o jquery com bootstrap e já vem com o estilo parecido com o ios.

Podemos consultar para aprender como usar esse cara aqui:

http://www.idangero.us/framework7/


para debug em windows phone e ios instalar o weinre
``
npm install -g weinre
``




para utilização do weire conferir os links a seguir:

http://stackoverflow.com/questions/11262236/ios-remote-debugging
http://developer.telerik.com/featured/a-concise-guide-to-remote-debugging-on-ios-android-and-windows-phone/


dependendo da plataforma escolhida deve ser feito o dowload do sdk de desenvolvimento apenas para que seja possivel fazer o build do projeto:

http://cordova.apache.org/docs/en/2.5.0/guide_getting-started_ios_index.md.html
http://cordova.apache.org/docs/en/4.0.0/guide_platforms_win8_index.md.html
https://cordova.apache.org/docs/en/4.0.0/guide_platforms_android_index.md.html

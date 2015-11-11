cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.wordsbaking.cordova.tts/www/tts.js",
        "id": "com.wordsbaking.cordova.tts.tts",
        "clobbers": [
            "TTS"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/com.mediamatrixdoo.keepscreenon/www/keepscreenon.js",
        "id": "com.mediamatrixdoo.keepscreenon.keepscreenon",
        "clobbers": [
            "keepscreenon"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.wordsbaking.cordova.tts": "0.2.1",
    "cordova-plugin-whitelist": "1.0.0",
    "org.apache.cordova.splashscreen": "1.0.0",
    "com.mediamatrixdoo.keepscreenon": "1.0.1"
}
// BOTTOM OF METADATA
});
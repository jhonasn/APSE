cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.mediamatrixdoo.keepscreenon/www/keepscreenon.js",
        "id": "com.mediamatrixdoo.keepscreenon.keepscreenon",
        "clobbers": [
            "keepscreenon"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/com.wordsbaking.cordova.tts/www/tts.js",
        "id": "com.wordsbaking.cordova.tts.tts",
        "clobbers": [
            "TTS"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.mediamatrixdoo.keepscreenon": "1.0.1",
    "cordova-plugin-dialogs": "1.1.1",
    "org.apache.cordova.splashscreen": "1.0.0",
    "com.wordsbaking.cordova.tts": "0.2.1",
    "cordova-plugin-whitelist": "1.0.0"
}
// BOTTOM OF METADATA
});
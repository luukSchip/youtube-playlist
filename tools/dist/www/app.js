var main = null;
var gapiReady = false;
var requireReady = false;
require.config({
    baseUrl: '.',
    paths: {
        jquery: "../../bower_components/jquery/dist/jquery",
    	mustache: "../../bower_components/mustache.js/mustache",
    	async: '../../bower_components/requirejs-plugins/src/async',
        goog: '../../bower_components/requirejs-plugins/src/goog',
        propertyParser : '../../bower_components/requirejs-plugins/src/propertyParser',
        gapi: 'https://apis.google.com/js/client.js?onload=googleApiClientReady'
    }
});

function googleApiClientReady(){
	gapiReady = true;
	if( requireReady){
		initMain();
	}
}

function initMain(){
	main.init(gapi);
}

require([
		'main',
		"jquery",
		"mustache",
        "gapi"],
	function(_main,_config,jquery,mustache){
		main = _main;
		if(gapiReady){
			initMain();
		}
		requireReady = true;
	}
);

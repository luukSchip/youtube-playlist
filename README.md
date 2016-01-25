
###[Youtube-playlist](http://luukschipperheyn.nl/youtubePlaylist/www/)

This web project has the following setup:

* www/ - the web assets for the project
    * index.html - the entry point into the app.
    * css/style.css - css style.
    * app.js - the top-level config script used by index.html
    * app/ - the directory to store project-specific scripts.
    	* config/ - config files
    	* views/ - Mustache templates
    	* *.js Project-specific JavaScript files. Defined as require.js modules.
* bower.json - bower configuration file
* bower_components/ - the directory to hold packages managed by bower.

To get all dependencies, run:
	
	bower install


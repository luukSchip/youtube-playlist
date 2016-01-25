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

To optimize, run:

    node tools/r.js -o tools/build.js

That build command creates an optimized version of the project in a
**www-built** directory. The app.js file will be optimized to include
all of its dependencies.

For more information on the optimizer:
http://requirejs.org/docs/optimization.html

For more information on using requirejs:
http://requirejs.org/docs/api.html

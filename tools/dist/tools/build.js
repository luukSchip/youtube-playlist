/*{
    "appDir": "../www",
    "mainConfigFile": "../www/app.js",
    "dir": "../www-built",
    "modules": [
        {
            "name": "app"
        }
    ]
}*/

{
   appDir: "../",
   baseUrl: "./www/app/",
   dir: "dist",
   modules: [
        {
            name: "main"
        }
    ],
    paths: {
       // libraries path
      "jquery": "lib/jquery",
      "underscore": "lib/underscore",
      "bootstrap": "lib/bootstrap",
      "backbone": "lib/backbone",
      "hogan": "lib/hogan",

       // require plugins
      "css": "lib/css",
      "hgn": "lib/hgn",
      "text": "lib/text"
   }
}
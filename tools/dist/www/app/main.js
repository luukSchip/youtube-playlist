define(
	["config/config","SearchBar","SearchResultList", "Playlist","Player"],
	function(config,searchBar,searchResultList,playlist,player){
		function loadTemplates(_templates, _callback){
		    var deferreds = [];
		    for (key in _templates) {
		        (function(staticKey){
		        	deferreds.push(
				        $.get(_templates[staticKey].path, function(response){
				            _templates[staticKey].html = response;
				    }));
		        })(key);
		    }
		    $.when.apply(null, deferreds).done(function() {
		        _callback();
		    });
		}
		function onLoadedTemplates(){
			searchBar.init(config.selectors.searchBar);
			searchResultList.init(config.selectors.searchResultList);
			playlist.init(config.selectors.playlist);
			searchBar.setPlaylist(playlist);
			player.init(
				{
					playButton:config.selectors.playButton,
					nextButton:config.selectors.nextButton,
					previousButton:config.selectors.previousButton,
				},
				playlist
			);
		}

		function setupAPI(gapi){
			gapi.client.setApiKey(config.GAPIKEY);
			gapi.client.load('youtube', 'v3', function() {
				//APILoaded();
			});
		}
		return {
			init: function(gapi){
				setupAPI(gapi);
				loadTemplates(config.templates, onLoadedTemplates);
			}
		};
	}
);
define(["config/config","mustache","Video","jquery"],function(config,Mustache,Video) {
	var SearchResult = function(){var result = null;
		var element = null;
		var playlist = null;
		var index = null;
		function addEventListeners(){
			if(addToPlaylistListener){			
				$(element).find(config.selectors.addToPlaylistButton)
					.click(addToPlaylistListener);
			}
		}
		function addToPlaylistListener(){
			if(playlist){
				var video = new Video().fromSearchResult(result);
				video.setPlaylist(playlist);
				playlist.addVideo(video);
			}
		}
		this.init = function(_result) {
			result = _result;
			return this;
		};
		this.getElement = function(){
			var template = config.templates["searchResult"].html;
			var html = Mustache.render(
				template,
				{
					title:result.snippet.title,
					kind:result.id.kind,
					imgSrc: result.snippet.thumbnails.default.url,
					imgWidth: result.snippet.thumbnails.default.width,
					imgHeight: result.snippet.thumbnails.default.height
				}
			);
			element = $.parseHTML(html);
			addEventListeners();
			return element;
		};
		this.setPlaylist = function(_playlist){
			playlist = _playlist;
		};
		this.setIndex = function(value){
			index = value;
		};
	};
	return SearchResult;
});
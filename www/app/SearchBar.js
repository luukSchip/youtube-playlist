define(["config/config","SearchResultList"], function(config,searchResultList){
	var $element = null;
	var playlist = null;
	function setChangeListener(){
		$element.keyup(function(){
			onSearchInput($element.val());
			searchResultList.showElement();
		});
		$element.click(function(){
			searchResultList.showElement();
		});
	}
	function onSearchInput(searchString){
		var request = gapi.client.youtube.search.list({
			q: searchString,
			part: 'snippet',
			type: 'video',
			maxResults: 50
		});
		request.execute(onSearchResult);
	}
	function onSearchResult(result){
		if(!searchResultList){
		}
		if(playlist){
			searchResultList.setPlaylist(playlist);
		}
		searchResultList.onSearchResult(result);

	}
	return {
		init: function(selfSelector) {
			var self = this;
			$element = $(selfSelector);
			setChangeListener();
			return self;
		},
		setPlaylist: function(_playlist){
			playlist = _playlist;
		}
	};
});

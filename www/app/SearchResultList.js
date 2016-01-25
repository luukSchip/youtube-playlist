define(["SearchResult","config/config"],function(SearchResult,config) {
	var $element = null;
	var playlist = null;
	//var searchResults = [];
	function hideElement () {
		$element.hide();
	}
	return {
		init: function(selector) {
			var self = this;
			$element = $(selector);
			$(config.selectors.searchResultListCloseButton).click(function(){
				hideElement();
			});
			return self;
		},
		onSearchResult: function(result){
			var self = this;
			$element.find(config.selectors.searchResultListItem).remove();
			searchResults = [];
			for(key in result.items){
				var item = result.items[key];
				(function(_item){
					var searchResult = new SearchResult();
					searchResult.init(_item);
					searchResult.setIndex(key);
					if(playlist){
						searchResult.setPlaylist(playlist);
					}
					$element.append(searchResult.getElement());
				})(item);
			}
		},
		setPlaylist: function(_playlist){
			playlist = _playlist;
		},
		getElement: function(){
			return $element;
		},
		showElement: function(){
			$element.show();
		}
	}
});
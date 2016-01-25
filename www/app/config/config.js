define(function(){
    var instance = null;

    function MySingleton(){
        if(instance !== null){
            throw new Error("Cannot instantiate more than one config, use config.getInstance()");
        } 
        
        this.initialize();
    }
    MySingleton.prototype = {
        initialize: function(){
            this.GAPIKEY = "AIzaSyCPr-9p0eP1IyPIJkwAojh5eUhnAtTB0_g";
            this.selectors = {
        		searchBar: "#searchBar",
        		searchResultList: "#searchResultList",
        		searchResultListItem: ".searchResult",
        		searchResultListCloseButton: ".closeButton",
        		addToPlaylistButton: ".addButton",
        		playlist: "#playlist",
        		playlistItem: ".playlistItem",
        		playlistItemTitle: ".title",
        		videoContainer: "#video",
        		playButton: "#playButton",
        		nextButton: "#nextButton",
        		previousButton: "#previousButton",
        		removeButton: ".removeButton"
        	};
            this.templates = {
        		searchResult: {path: "app/views/search-result.mst"},
        		playlistItem: {path: "app/views/playlist-item.mst"}
        	};
        }
    };
    MySingleton.getInstance = function(){
        if(instance === null){
            instance = new MySingleton();
        }
        return instance;
    };

    return MySingleton.getInstance();
});
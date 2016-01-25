define(function(){
	return function(){
		var item = null;
		var title = null;
		var duration = null;
		var onGetDetails = null;
		var searchResult = null;
		var index = null;
		var playlist = null;
		var uid = null;
		function getVideoDetails(id){
			var self = this;
			var request = gapi.client.youtube.videos.list({
				id: id,
				part: 'snippet,recordingDetails,contentDetails'
			});
			request.execute(function(response){
				item = response.items[0];
				title = item.snippet.title;
				duration = item.contentDetails.duration;
				if(onGetDetails){
					onGetDetails(self);
				}
			});
		}
		this.fromSearchResult = function(result){
			searchResult = result;
			return this;
		};
		this.getTitle = function(){
			return title;
		};
		this.getDuration = function(){
			return duration;
		};
		this.getDetails = function(callback){
			onGetDetails = callback;
			getVideoDetails(searchResult.id.videoId);
		};
		this.getSearchResult = function(){
			return searchResult;
		};
		this.getId = function(){
			return searchResult.id.videoId;
		};
		this.getIndex = function(){
			return playlist.getIndexByUid(this.getUid());
		};
		this.setPlaylist = function(_playlist){
			playlist = _playlist;
		};
		this.setUid = function(suffix){
			uid = this.getId()+suffix;
		};
		this.getUid = function(){
			return uid;
		}
	};
});
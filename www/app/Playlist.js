define(["config/config","mustache","Player"],function(config,Mustache,Player){
	var $element = null;
	var videos = [];
	var itemElements = [];
	var currentIndex = 0;
	function getElementForPlaylistItem(video){
		var template = config.templates["playlistItem"].html;
		var html = Mustache.render(
			template.replace(/\{\{([^\}]*)\}\}/g, '{{{$1}}}'),
			{
				id:video.getUid(),
				title:video.getTitle(),
				duration:video.getDuration(),
				imgSrc: video.getSearchResult().snippet.thumbnails.default.url,
			}
		);
		element = $.parseHTML(html);
		addEventListeners(element, video);
		return element;
	}
	function addEventListeners(itemElement, video){
		$(itemElement).find(config.selectors.removeButton)
				.click(function(){removePlaylistItemByIndex(video.getIndex())});
		$(itemElement).find(config.selectors.playlistItemTitle)
				.click(function(){playlist.playByIndex(video.getIndex())});
	}
	function removePlaylistItemByIndex(index){
		if(videos.length > index){
			videos.splice(index,1);
			$("#"+itemElements[index][0].id).remove();
			itemElements.splice(index,1);
			if(currentIndex >= index){
				currentIndex--;
			}
		}
	}
	function makeVideoUid(video,iteration){
		for(key in videos){
			if(videos[key].getId() == video.getId()){
				if(videos[key].getUid() == video.getId()+iteration){
					makeVideoUid(video,++iteration);
					return;
				}
			}
		}
		video.setUid(iteration);
	}
	playlist = {
		init: function(selfSelector){
			$element = $(selfSelector);
		},
		addVideo: function(video){
			makeVideoUid(video,0);
			videos.push(video);
			video.getDetails(function(){
				var itemElement = getElementForPlaylistItem(video);
				$element.append(itemElement);
				itemElements.push(itemElement);
			});
		},
		playByIndex: function(index){
			Player.playVideo(videos[index]);
			currentIndex = index;
		},
		playCurrentVideo: function(){
			this.playByIndex(currentIndex);
		},
		playNextVideo: function(){
			var index = ++currentIndex % videos.length;
			this.playByIndex(index);
		},
		playPreviousVideo: function(){
			var index;
			if(currentIndex > 0){
				index = currentIndex - 1;
			}else{
				index = videos.length -1;
			}
			this.playByIndex(index);
		},
		getIndexByUid: function(uid){
			for(key in videos){
				var video = videos[key];
				if(video.getUid() == uid){
					return key;
				}
			}
			console.log(new Error("index for video with uid "+uid+" not found"));
			return -1;
		},
		setItemActive: function(index){
			$element.find(config.selectors.playlistItem).removeClass("active");
			$(itemElements[index]).addClass("active");
		}
	};
	return playlist;
});
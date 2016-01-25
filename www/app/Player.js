define(["config/config","mustache","jquery"],function(config,Mustache){
	var $videoContainer = $(config.selectors.videoContainer);
	var playing = false;
	var playlist = null;
	var player;

	function onPlayerReady(e){
	}
	function onPlayerStateChange(e){
		if(e.data == 0){
			if(playlist){
				playlist.playNextVideo();
			}
		}
	}

	return {
		playVideo: function(video){
			var self = this;
			if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
				window.onYouTubeIframeAPIReady = function() {
					self.playVideo(video);
				};
				$.getScript('//www.youtube.com/iframe_api');
			} else {
				if(!player){
					player = new YT.Player($videoContainer.attr('id'), {
						height: '100%',
						width: '100%',
						videoId: video.getId(),
						events: {
							'onReady': onPlayerReady,
							'onStateChange': onPlayerStateChange
						},
						playerVars: {
							autoplay: 1,
					        modestbranding: 1,
					        rel: 0,
					        showinfo: 0
						}
			        });
				}else{
					if(video){
						player.loadVideoById(video.getId());
					}
				}
			}
			playlist.setItemActive(video.getIndex());
		},
		init: function(selectors, _playlist){
			var $playButton = $(selectors.playButton);
			var $nextButton = $(selectors.nextButton);
			var $previousButton = $(selectors.previousButton);
			playlist = _playlist;
			$playButton.click(function(){
				playlist.playCurrentVideo();
			});
			$nextButton.click(function(){
				playlist.playNextVideo();
			});
			$previousButton.click(function(){
				playlist.playPreviousVideo();
			});
		}
	}
});
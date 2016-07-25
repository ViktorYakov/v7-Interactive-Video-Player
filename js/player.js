window.addEventListener('load', function() {

	// Video Container
	video = document.getElementById('video');
	pauseScreen = document.getElementById('screen');
	screenButton = document.getElementById('screen-button');
	player = document.getElementById('player');
 
	// Progress Bar Container
	pbarContainer = document.getElementById('pbar-container');
	pbar = document.getElementById('pbar');

	// Buttons Container
	playButton = document.getElementById('play-button');
	timeField = document.getElementById('time-field');
	soundButton = document.getElementById('sound-button');
	soundSlider = document.getElementById('soundSlider');
	fullscreenButton = document.getElementById('fullscreen');
	playBack = document.getElementById("playBack");
	currentPlayback = document.getElementById("currentPlayback");
	speedList = document.getElementById("speedList");
	span = document.getElementsByClassName("spans");



	video.load();
	video.addEventListener('canplay', function() {

		playButton.addEventListener('click', playOrPause, false);
		pbarContainer.addEventListener('click', skip, false);
		updatePlayer();
		soundButton.addEventListener('click', muteOrUnmute, false);
		fullscreenButton.addEventListener('click', toggleFullScreen, false);
		screenButton.addEventListener('click', playOrPause, false);
		speedList.addEventListener("change", changeSpeed);
		soundSlider.addEventListener("change", volumeSlider);
	
	}, false);

}, false);

function volumeSlider() {
	video.volume = soundSlider.value;
}

function muteOrUnmute() {
	if (!video.muted) {
		video.muted = true;
		soundButton.src = 'img/mute.png';
		soundSlider.value = 0;
	} else {
		video.muted = false;
		soundButton.src = 'img/sound.png';
		soundSlider.value = 1;
	}
}

function playOrPause() {
	if (video.paused) {
		video.play();
		playButton.src = 'img/pause.png';
		update = setInterval(updatePlayer, 30);

		pauseScreen.style.display = 'none';
		screenButton.src = 'img/play.png';
	} else {
		video.pause();
		playButton.src = 'img/play.png';
		window.clearInterval(update);

		pauseScreen.style.display = 'block';
		screenButton.src = 'img/play.png';
	}
}

function updatePlayer() {
	var percentage = (video.currentTime/video.duration)*100;
	pbar.style.width = percentage + '%';
	timeField.innerHTML = getFormattedTime();
	if (video.ended) {
		window.clearInterval(update);
		playButton.src = 'img/replay.png';

		pauseScreen.style.display = 'block';

		screenButton.src = 'img/replay.png';
	} else if (video.paused) {
		playButton.src = 'img/play.png';
		screenButton.src = 'img/play.png';
	}
}

function skip(ev) {
	var mouseX = ev.pageX - pbarContainer.offsetLeft;
	var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));

	video.currentTime = (mouseX/width)*video.duration;
	updatePlayer();
}

function getFormattedTime() {
	var seconds = Math.round(video.currentTime);
	var minutes = Math.floor(seconds/60);
	if (minutes > 0) seconds -= minutes*60;
	if (seconds.toString().length === 1) seconds = '0' + seconds;

	var totalSeconds = Math.round(video.duration);
	var totalMinutes = Math.floor(totalSeconds/60);
	if (totalMinutes > 0) totalSeconds -= totalMinutes*60;
	if (totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;

	return minutes + ':' + seconds + ' / ' + totalMinutes + ':' + totalSeconds;
}

 function toggleFullScreen() {
   var video = document.getElementById('video');
   var player = document.getElementById('player');
   var pauseScreen = document.getElementById('screen');
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
      if (video.requestFullscreen || player.requestFullscreen) {
        video.requestFullscreen();
        player.requestFullscreen();
      } else if (player.msRequestFullscreen) {
        player.msRequestFullscreen();
        player.style.height = "1080px";
        pauseScreen.style.height = "1080px";
        pauseScreen.style.width = "100%";
        pauseScreen.style.lineHeight = "860px";
      } else if (player.mozRequestFullScreen) {
        player.mozRequestFullScreen();
        pauseScreen.style.height = "1080px";
        pauseScreen.style.width = "100%";
        pauseScreen.style.lineHeight = "860px";
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        player.style.height = "400px";
        pauseScreen.style.height = "401px";
        pauseScreen.style.width = "712px";
        pauseScreen.style.lineHeight = "360px";
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        pauseScreen.style.height = "401px";
        pauseScreen.style.width = "712px";
        pauseScreen.style.lineHeight = "360px";
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

video.addEventListener("loadmetadata", function() {
	track = document.createElement("track");
	track.kind = "subtitles";
	track.label = "English"; 
	track.srclang = "en";
	track.src = "video/captions.vtt";
	track.addEventListener("load", function() {
		this.mode = "showing";
		video.textTracks[0].mode = "showing";
	});
	this.appendChild(track);
});

$('#player').hover(function() {
    $("#buttons-container").slideDown();

},function() {
    $("#buttons-container").delay(2000).slideUp();
});

$("#player").mouseout(function() {
	$("#pbar-container").css("bottom","0px");
});

$("#player").mouseover(function() {
	$("#pbar-container").css("bottom","30px");
});

// CAPTONS

var vid = document.getElementById('video');
var track = vid.addTextTrack('subtitles', 'English', 'en');
track.mode = 'hidden';


	window['VTTCue'] = window['VTTCue'] || window['TextTrackCue'];

	track.addCue(new VTTCue(01, 3.9, "Now that we've looked at the architecture of the internet, let's see how you might"));
	track.addCue(new VTTCue(4, 6.9, "connect your personal devices to the internet inside your house."));
	track.addCue(new VTTCue(7, 10.9, "Well there are many ways to connect to the internet, and"));
	track.addCue(new VTTCue(11, 12.9, "most often people connect wirelessly."));
	track.addCue(new VTTCue(13, 16.9, "Let's look at an example of how you can connect to the internet."));
	track.addCue(new VTTCue(17, 21.9, "If you live in a city or a town, you probably have a coaxial cable for"));
	track.addCue(new VTTCue(22, 25.9, "cable Internet, or a phone line if you have DSL, running to the outside of"));
	track.addCue(new VTTCue(26, 29.9, "your house, that connects you to the Internet Service Provider, or ISP."));
	track.addCue(new VTTCue(32, 33.9, "If you live far out in the country, you'll more likely have"));
	track.addCue(new VTTCue(34, 38.9, "a dish outside your house, connecting you wirelessly to your closest ISP, or"));
	track.addCue(new VTTCue(39, 40.9, "you might also use the telephone system."));
	track.addCue(new VTTCue(42, 45.9, "Whether a wire comes straight from the ISP hookup outside your house, or"));
	track.addCue(new VTTCue(46, 48.9, "it travels over radio waves from your roof,"));
	track.addCue(new VTTCue(49, 52.9, "the first stop a wire will make once inside your house, is at your modem."));
	track.addCue(new VTTCue(53, 56.9, "A modem is what connects the internet to your network at home."));
	track.addCue(new VTTCue(57, 59, "A few common residential modems are DSL or"));
	


var $captionBbtn = $('#CC');
$captionBbtn.click(function() {
  if (track.mode == 'hidden') {
        track.mode = 'showing';     
    } else {
        track.mode = 'hidden';
    }
});

function changeSpeed(event){
	video.playbackRate = event.target.value;
}

document.getElementById("bwd").addEventListener("click", function(){
    setTime(-10);                
}, false);
            
document.getElementById("fwd").addEventListener("click", function(){
    setTime(10);
}, false); 

function setTime(tValue) {
  if (tValue === 0) {
		video.currentTime = tValue;
	} else {
        video.currentTime += tValue;
    }
}               

function secondsFromSpan(time) {
    if(!time || !time.indexOf(':')) return 0;
    var x = time.split(':');
    return + x [0] * 60 + x [1];
}

function createIntervals(captions) {
    var video = document.getElementById("video");
    var intervals = [];
    for(var i = 0; i < captions.length; i++) {
        if(i == captions.length - 1) {
            intervals.push({
                getSpanTime: secondsFromSpan((captions[i]).getAttribute('data-start-time')),
                getVideoTime: Math.floor(video.duration),
                captions: captions[i] 
            });
        } else { 
            intervals.push({
                getSpanTime: secondsFromSpan((captions[i]).getAttribute('data-start-time')),
                getVideoTime: secondsFromSpan((captions[i + 1]).getAttribute('data-start-time')),
                captions: captions[i] 
            });
        }

    }
    return intervals;
}

function isTimeWithinInterval(interval, currentTime) {
    var getSpanSecs = interval.getSpanTime;
    var getVidSecs = interval.getVideoTime;
    return getSpanSecs <= currentTime && currentTime < getVidSecs;
}

$(function () {
    var captions = $('span[data-start-time]');
    var intervals = createIntervals(captions);
    video.addEventListener('timeupdate', function () {
        $('span[data-start-time]').removeClass('highLight');
        for(var i = 0; i < intervals.length; i++) {
            if(isTimeWithinInterval(intervals[i], video.currentTime)) {
                $(intervals[i].captions).addClass('highLight');
            }
        }
    });
});

$("span").click(function() {
  var captionsTime = this.getAttribute("data-start-time");
  video.currentTime = secondsFromSpan(captionsTime);
}); 
function onYouTubePlayerAPIReady() {

    function onIntroMovieStateChange(event) {
        var eventType = event.data;
        var target = event.target;
        if (!target || !target.getVideoUrl) {
            return;
        }
        var title = "unknown";
        if (target.getVideoData) {
            title = target.getVideoData().title;
        }
        var url = target.getVideoUrl();
        var currentTime = target.getCurrentTime();
        console.log(">>> " + url + " " + title + " " + currentTime);
        if (eventType == YT.PlayerState.PLAYING) {
            clicky.video("play", currentTime, url, title);
            _gaq.push(['_trackEvent', 'Videos', 'Playing', title]);
        } else if (eventType == YT.PlayerState.PAUSED) {
            clicky.video("pause", currentTime, url, title);
            _gaq.push(['_trackEvent', 'Videos', 'Paused', title]);
        } else if (eventType == YT.PlayerState.ENDED) {
            clicky.video("end", currentTime, url, title);
            _gaq.push(['_trackEvent', 'Videos', 'Ended', title]);
        } else if (eventType == YT.PlayerState.CUED) {
            clicky.video("seek", currentTime, url, title);
            _gaq.push(['_trackEvent', 'Videos', 'Cued', title]);
        }
    }

    $("iframe.ytplayer").each(function (index) {
        var id = $(this).attr("id");
        console.log("registering " + id);
        new YT.Player(id, {
            events:{
                'onStateChange':onIntroMovieStateChange
            }
        });
    });

}



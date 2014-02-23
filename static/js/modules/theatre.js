define(['jquery',
        'backbone'],
  function($, Backbone) {

    var TheatreView = Backbone.View.extend({

      el: '.butter',

      videos: [],

      played_videos: [],

      session_storage_key: 'butter_videos',

      is_mobile: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,

      initialize: function() {
        var self = this;

        self.createElements();
        self.attachEvents();
        self.getVideos();
      },

      createElements: function() {
        var self = this;

        self.player = document.getElementById('vimeo_player');
      },

      attachEvents: function() {
        var self = this;

        if (self.is_mobile) {
          self.delegateEvents({'touchstart .more-butter': 'onMoreButter'});
        } else {
          self.delegateEvents({'click .more-butter': 'onMoreButter'});
        }
      },

      getVideos: function() {
        var self = this,
            videos = JSON.parse(sessionStorage.getItem(self.session_storage_key));

        if (videos) {
          self.parseAndPlayVideos(videos);
        }
        else {
          $.getJSON('http://vimeo.com/api/v2/channel/butter/videos.json', self.onGetVideosSuccess.bind(self));
        }
      },

      onGetVideosSuccess: function(videos) {
        var self = this;

        sessionStorage.setItem(self.session_storage_key, JSON.stringify(videos));
        self.parseAndPlayVideos(videos);
      },

      parseAndPlayVideos: function(videos) {
        var self = this;

        self.videos = videos.map(function(video) {
          return video.id;
        });
        self.play(self.getRandomVideo());
      },

      getRandomVideo: function() {
        var self = this,
            index = Math.floor(Math.random() * (self.videos.length - 1)),
            video;

        if (index === -1) {
          self.videos = self.played_videos;
          self.played_videos = [];
          index = 0;
        }

        video = self.videos[index];
        self.videos.splice(index, 1);
        self.played_videos.push(video);

        return video;
      },

      play: function(video_id) {
        var self = this,
            iframe_src = '//player.vimeo.com/video/' + video_id +'?api=1&player_id=vimeo_player&loop=1';

        self.player.src = iframe_src;
      },

      onMoreButter: function() {
        var self = this;

        self.play(self.getRandomVideo());
      },

      destroy: function() {
        this.undelegateEvents();
      }

    });

    return TheatreView;
  });
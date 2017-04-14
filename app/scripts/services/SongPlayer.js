 (function() {
     function SongPlayer() {
         var SongPlayer = {};
         
         var currentSong = null;
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;
         
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */         
         var setSong = function(song) {
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             currentSong = song;
         };
         
         /**
         * @function playSong
         * @desc Play audio file stored in currentBuzzObject and set playing attribute to true
         * @param {Object} song
         */          
         var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
         };
         
         /**
         * @function play
         * @desc set new song and play if current song is not equal to the new song. Play current audio file if current song is equal to new song and the audio file is paused.
         * @param {Object} song
         */  
         SongPlayer.play = function(song) {
             if (currentSong !== song) {
                 setSong(song);
                 playSong(song);
                 /*
                 currentBuzzObject.play();
                 song.playing = true;
                 */
             } else if (currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     currentBuzzObject.play();
                 }
             }
         };
         
         /**
         * @function pause
         * @desc pause current audio file and set playing attribute to false.
         * @param {Object} song
         */  
         SongPlayer.pause = function(song) {
             currentBuzzObject.pause();
             song.playing = false;
         };
         
         return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
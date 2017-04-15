 (function() {
     function SongPlayer() {
         var SongPlayer = {};
         
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
                 SongPlayer.currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             SongPlayer.currentSong = song;
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
         
         SongPlayer.currentSong = null;
         
         /**
         * @function play
         * @desc set new song and play if current song is not equal to the new song. Play current audio file if current song is equal to new song and the audio file is paused.
         * @param {Object} song
         */  
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                 setSong(song);
                 playSong(song);
                 /*
                 currentBuzzObject.play();
                 song.playing = true;
                 */
             } else if (SongPlayer.currentSong === song) {
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
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };
         
         return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
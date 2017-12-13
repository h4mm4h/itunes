;(function () {
	"use strict";

	function msToTime(duration) {
		var milliseconds = parseInt((duration % 1000) / 100),
			seconds = parseInt((duration / 1000) % 60),
			minutes = parseInt((duration / (1000 * 60)) % 60),
			hours = parseInt((duration / (1000 * 60 * 60)) % 24);

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;

		return minutes + ":" + seconds;
	}

	var request = new XMLHttpRequest(),
		url,
		data;
	var searchForm = document.querySelector('.ba-search-form'),
		searchInput = document.getElementById('search'),
		loader = document.querySelector('.ba-loader'),
		query,
		tuneTmpl = document.getElementById('tune-tmpl').innerHTML,
		tuneList = document.querySelector('.ba-tunes-list');


	searchForm.addEventListener('submit', function (event) {

		event.preventDefault();
		loader.classList.add('active');

		query = searchInput.value;

		url = 'https://itunes.apple.com/search?term=' + query + '&limit=12';

		request.open('GET', url, true);
		request.send();

	});


	request.onload = function () {
		data = JSON.parse(this.response);

		tuneList.innerHTML = '';

		setTimeout(function () {
			loader.classList.remove('active');

			data.results.forEach(function (tune) {
				var duration = msToTime(tune.trackTimeMillis);

				tuneList.innerHTML += tuneTmpl
					.replace(/{{previewUrl}}/ig, tune.previewUrl)
					.replace(/{{artistName}}/ig, tune.artistName)
					.replace(/{{collectionName}}/ig, tune.collectionName)
					.replace(/{{primaryGenreName}}/ig, tune.primaryGenreName)
					.replace(/{{collectionPrice}}/ig, tune.collectionPrice)
					.replace(/{{collectionViewUrl}}/ig, tune.collectionViewUrl)
					.replace(/{{duration}}/ig, duration)
					.replace(/{{artworkUrl100}}/ig, tune.artworkUrl100)
					.replace(/100x100/ig, "300x300")
					.replace(/{{trackName}}/ig, tune.trackName);
			});
		}, 800);
	};
	tuneList.addEventListener('click', function (event) {
		event.preventDefault();
		if(event.target.classList.contains('ba-play-button')){
			var playBtn = event.target,
				audio = playBtn.parentNode.querySelector('audio');

			document.querySelectorAll('audio').forEach(function (el) {
				el != audio ? el.pause() : '';
			});

			audio.paused ? audio.play() : audio.pause();
			//play button pulse animation
			document.querySelectorAll('.ba-play-button').forEach(function(btn){
				playBtn != btn ? btn.classList.remove('pulse') : '';
			});
			playBtn.classList.toggle('pulse');
		}
	})

})();


;(function() {
	"use strict";

	var request = new XMLHttpRequest(),
        url,
        data;
    var searchForm = document.querySelector('.ba-search-form'),
    	searchInput = document.getElementById('search'),
        query,
        tuneTmpl = document.getElementById('tune-tmpl').innerHTML,
        tuneList = document.querySelector('.ba-tunes-list');


    searchForm.addEventListener('submit', function (event){

    event.preventDefault();

    query = searchInput.value;

    url = 'https://itunes.apple.com/search?term='+ query +'&limit=12';

    request.open('GET', url, true);
    request.send();
    
    });

    

    request.onload = function () {
        data = JSON.parse(this.response);

        tuneList.innerHTML = '';

        data.results.forEach(function(tune){
        tuneList.innerHTML += tuneTmpl
        .replace(/{{artistName}}/ig, tune.artistName)
        .replace(/{{artistName}}/ig, tune.artistName)
        .replace(/{{collectionName}}/ig, tune.collectionName)
        .replace(/{{primaryGenreName}}/ig, tune.primaryGenreName)
        .replace(/{{collectionPrice}}/ig, tune.collectionPrice)
        .replace(/{{collectionViewUrl}}/ig, tune.collectionViewUrl)
        .replace(/{{duration}}/ig, tune.trackTimeMillis)
        .replace(/{{artworkUrl100}}/ig, tune.artworkUrl100)
        .replace(/100x100/ig, "300x300")
        .replace(/{{trackName}}/ig, tune.trackName);
        });
    };
    

})();


// #airbnb
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
	.then( response => response.json())
  .then( data => {
  		cities.push(...data);
  	});

function findMatches(wordToMatch, cities) {
	// here we need to check if city or state matched what we typed.
  wordToMatch = wordToMatch.toLowerCase();
	return cities.filter(place => place.city.toLowerCase().includes(wordToMatch)
  													||  place.state.toLowerCase().match(wordToMatch));
}


function displayMatches() {

	if(this.value === '') {
  	suggestions.innerHTML = '';
    return;
  }
	const matches = findMatches(this.value, cities);

  const html = matches.map( place => {
  	const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class='hl'> ${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class='hl'> ${this.value}</span>`);

  	return`
    	<li>
      	<span class="name"> ${cityName},${stateName}</span>
        <span class="population"> ${place.population}</span>
      </li>
    `;
  }).join('');

  suggestions.innerHTML = html;
}

//future to do : add a debounce function , write the function urself.

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');


searchInput.addEventListener('keyup', displayMatches);


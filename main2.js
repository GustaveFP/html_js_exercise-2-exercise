const BASE_URL = 'https://pokeapi.co/api/v2';

var pokemonTypes = document.getElementById('types').getElementsByTagName('li');
for (let i = 0; i < pokemonTypes.length; i++) {
  pokemonTypes[i].addEventListener('click', clickPokemonType);
}

(function loadPokemonsFromActiveType(){
  fetchPokemonsFromGivenType(pokemonTypes[0].innerText.toLowerCase());
}());

/*** event handlers *******************************************************************************/
function clickPokemonType(event) {
  try {
    document.querySelector('#types .active').classList.remove('active');
  } catch (_) {}

  event.target.classList.add('active');

  const pokemonType = event.target.textContent.toString().toLowerCase();
  
  fetchPokemonsFromGivenType(pokemonType);
}
function clickPokemonItem(event) {
  try {
    document.querySelector('#pokemons .active').classList.remove('active');
  } catch (_) {}

  event.target.classList.add('active');

  const pokemon = event.target.textContent.toString().toLowerCase();

  fetchPokemonInfo(pokemon);
}
/*** helper functions *******************************************************************************/
function uppercase(str) {
  var array1 = str.split(' ');
  var newarray1 = [];

  for (var x = 0; x < array1.length; x++) {
    newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
  }
  return newarray1.join(' ');
}
/*** fetch data from API *******************************************************************************/
function fetchPokemonsFromGivenType(pokemonType) {
  fetch(`${BASE_URL}/type/${pokemonType}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('pokemons').innerHTML = `
      ${data.pokemon
        .map((pokemon, index) => { // [{},{},{},{}]
          return `
            <li class="nav-item">
              <a class="nav-link ${index == 0 ? 'active' : ''}" href="#">${uppercase(pokemon.pokemon.name)}</a>
            </li>`;
        })
        .join(' ')}
    `;

      var pokemonItems = document.getElementById('pokemons').getElementsByTagName('li');

      for (let i = 0; i < pokemonItems.length; i++) {
        pokemonItems[i].addEventListener('click', clickPokemonItem);
      }

      (function loadInfoFromActivePokemon(){
        fetchPokemonInfo(pokemonItems[0].innerText.toLowerCase())
      }());
      
    })
    .catch((error) => console.log(error.message));
}
function fetchPokemonInfo(pokemon){
  fetch(`${BASE_URL}/pokemon/${pokemon}/`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('data').innerHTML = `
      <div class="row">
      <div class="col-md-4 text-center">
      <h2 id="name" class="text-center">${uppercase(data.name)}</h2>
      <img id="sprite" src="${data.sprites.front_default}" alt="${
        data.name
      }" class="w-100">
    </div>

    <div class="col-md-7">
      <table class="table">
        <tr>
            <th colspan="2"><h4>Pokédex Data</h4></th>
        </tr>
        <tr>
            <th>National No.</th>
            <td id="poke-id">${data.id}</td>
        </tr>
        <tr>
            <th>Type</th>
            <td id="type">${data.types[0].type.name}</td>
        </tr>
        <tr>
            <th>Height</th>
            <td id="height">${data.height} m</td>
        </tr>
        <tr>
            <th>Weight</th>
            <td id="weight">${data.weight} kg</td>
        </tr>
      </table>
    </div>

    <div class="col-md-11">
      <h4>Base Stats</h4>
        <table class="table">
            <tr>
                <th>HP</th>
                <td id="hp">40</td>
            </tr>
            ${data.stats
              .map((stat) => {
                return `
                <tr>
                  <th>${stat.stat.name.toUpperCase()}</th>
                  <td id="${stat.stat.name}">${stat.base_stat}</td>
                </tr>
              `;
              })
              .join(' ')}            
      </table>
    </div>
      </div>
    `;
    })
    .catch((error) => console.log(error.message));
}

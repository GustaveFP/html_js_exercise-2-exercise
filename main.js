console.log('hola bola')

const POKEAPI_URL = 'https://pokeapi.co/api/v2';

$(document).ready(() => {
    var $navLinks = $('#types a.nav-link');
    $navLinks.on('click', event => {
        var $navLink = $(event.target);
        $navLinks.removeClass('active');
        $navLink.addClass('active');

        var type = $navLink.text().toLowerCase();
        $.getJSON(`${POKEAPI_URL}/type/${type}/`, response => {
            const pokemons_list = response.pokemon;
            $('#pokemons').html(`
                ${pokemons_list.reduce((all, pokemon, i) => `
                    ${all}
                    <li class="nav-item">
                        <a class="nav-link text-capitalize" href="#" data-url="${pokemon.pokemon.url}">
                            ${pokemon.pokemon.name}
                        </a>
                    </li>
                `, '')}
            `);
        })
    });
});

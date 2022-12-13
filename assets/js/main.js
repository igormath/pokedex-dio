const $list = document.querySelector('.pokemons');
const $btn = document.querySelector('#load-more');

const maxRecords = 151;
const limit = 10;
let offset = 0;

const loadPokemons = (offset, limit) => {
    pokeApi.getPokemons(offset, limit)
        .then(res => res.map(pokemon => {
            $list.insertAdjacentHTML("beforeend", `<li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
    
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map(value => `<li class="type ${value}">${value}</li>`).join('')}
                </ol>
    
                <img src="${pokemon.photo}"
                    alt="Bulbasaur">
            </div>
        </li>`)
        }));

}

loadPokemons(offset, limit);

$btn.addEventListener('click', () => {
    offset += limit;
    const recordsWithNextPage = offset + limit;

    if (recordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemons(offset, newLimit);

        $btn.parentElement.removeChild($btn);
    } else {
        loadPokemons(offset, limit);
    }
});

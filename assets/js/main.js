const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 10;
let offset = 0;
const maxRecords = 151

function loadPokemonItems(offset, limit){
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        <ol class="abilities">
            ${pokemon.ability.map((abilities) => `<li class="ability">${abilities}</li>`).join('')}
        </ol>
        
        </ol>                
            <img src="${pokemon.photo}" alt="${pokemon.name}"/>
        
        </div>
        <div class="detailDown">
        <ol class="stats">
            ${pokemon.stat.map((stats) => `<li class="ability">${stats}</li>`).join('')}           
        </ol>
        <ol class="stats">
            ${pokemon.statDetail.map((base_stats) => `<li class="ability">${base_stats}</li>`).join('')}           
        </ol>
        </div>
                       
        </li>`).join('');
        
        pokemonList.innerHTML += newHtml
       
    })
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit;

    if(qtdRecordNextPage >= maxRecords){
        const newLimit =  maxRecords - offset;
        loadPokemonItems(offset, newLimit)   
        loadMoreButton.parentElement.removeChild(loadMoreButton);      
    }else{
        loadPokemonItems(offset, limit)
    }
});

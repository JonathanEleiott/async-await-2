// STATE
const state = {
  pokemon: [],
  singlePokemon: {}
}

// DOM Selectors
const main = document.querySelector(`main`);

// FUNCTIONS
const getAllPokemon = async() => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const responseJson = await response.json();
    const allPokemon = responseJson.results
    state.pokemon = allPokemon;
    renderAllPokemon();
  } catch(err) {
    console.log(err);
  }
}

const getSinglePokemon = async(pokemonName) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const individualPokemon = await response.json();
    state.singlePokemon = individualPokemon;

    renderSinglePokemon();
  } catch(err) {
    console.log(err);
  }
}

const renderAllPokemon = () => {
  const ol = document.createElement(`ol`);
  const pokemonNames = state.pokemon.map((singlePokemon) => {
    return `<li>${singlePokemon.name}</li>`;
  });

  ol.innerHTML = pokemonNames.join(``);
  main.replaceChildren(ol);

  const pokemonListItems = document.querySelectorAll(`li`);

  pokemonListItems.forEach((pokemonLI) => {
    pokemonLI.addEventListener(`click`, (event) => {
      const name = event.target.innerText;
      getSinglePokemon(name);
    })
  });
}

const renderSinglePokemon = () => {
  const html = `
    <h2>Pokemon Details</h2>

    <img src="${state.singlePokemon.sprites.front_default}" alt="pokemon picture" />
    <h3>${state.singlePokemon.name}</h3>

    <button>Back To All Pokemon</button>
  `

  main.innerHTML = html;

  const backButton = document.querySelector(`button`);
  backButton.addEventListener(`click`, () => {
    renderAllPokemon();
  });
}

getAllPokemon();


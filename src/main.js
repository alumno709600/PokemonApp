import { fetchPokemon, fetchTypes, fetchPokemonByType } from "./api.js";
import { normalizePokemon } from "./pokemonModel.js";

const typeSelect = document.getElementById("typeSelect");
const pokemonContainer = document.getElementById("pokemonContainer");
const filtersForm = document.getElementById("filtersForm");

const modal = document.getElementById("pokemonModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

// ------------------------
// LOAD TYPES ON START
// ------------------------
async function loadTypes() {
  const types = await fetchTypes();
  types.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.name;
    opt.textContent = t.name.toUpperCase();
    typeSelect.appendChild(opt);
  });
}

loadTypes();

// ------------------------
// SEARCH FORM
// ------------------------
filtersForm.addEventListener("submit", async e => {
  e.preventDefault();

  pokemonContainer.innerHTML = "";

  const name = document.getElementById("nameInput").value.trim();
  const id = document.getElementById("idInput").value.trim();
  const type = document.getElementById("typeSelect").value;

  // Search by name or ID
  if (name || id) {
    const query = name || id;
    try {
      const raw = await fetchPokemon(query);
      displayPokemon(normalizePokemon(raw));
    } catch {
      pokemonContainer.innerHTML = "<p>No Pokémon found.</p>";
    }
    return;
  }

  // Search by type
  if (type) {
    const list = await fetchPokemonByType(type);

    for (const pokemon of list.slice(0, 20)) {
      const raw = await fetchPokemon(pokemon.name);
      displayPokemon(normalizePokemon(raw));
    }
  }
});

// ------------------------
// DISPLAY A POKEMON CARD
// ------------------------
function displayPokemon(pokemon) {
  const card = document.createElement("div");
  card.className = "pokemon-card";
  card.innerHTML = `
    <img src="${pokemon.sprite}" />
    <h3>${pokemon.name.toUpperCase()}</h3>
    <p>#${pokemon.id}</p>
  `;
  card.addEventListener("click", () => openModal(pokemon));
  pokemonContainer.appendChild(card);
}

// ------------------------
// MODAL
// ------------------------
function openModal(pokemon) {
  modalBody.innerHTML = `
    <img src="${pokemon.sprite}"/>
    <h2>${pokemon.name.toUpperCase()}</h2>
    <h3>Stats</h3>
    ${pokemon.stats
      .map(s => `<p><strong>${s.stat.name}:</strong> ${s.base_stat}</p>`)
      .join("")}
  `;
  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});



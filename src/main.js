import { fetchPokemon, fetchTypes, fetchPokemonByType, saveFavoritePokemon, fetchAbilityDetails } from "./api.js";
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

// SEARCH FORM
filtersForm.addEventListener("submit", async e => {
  e.preventDefault();

  pokemonContainer.innerHTML = "";

  const name = document.getElementById("nameInput").value.trim();
  const id = document.getElementById("idInput").value.trim();
  const type = document.getElementById("typeSelect").value;

  const activeFilters = [name, id, type].filter(f => f && f !== 'Select a type').length;

    if (activeFilters === 0) {
        showAlert("⚠️ Please enter a Name, ID, or select a Type to search.", 'info');
        return;
    }
    
    if (activeFilters > 1) {
        showAlert("❌ ERROR: Please use only one search criterion (Name, ID, or Type).", 'error');
        return;
    }

    if (id && parseInt(id) <= 0) {
        showAlert("❌ ERROR: Pokémon ID must be a positive number.", 'error');
        return;
    }

  // Search by name or ID
    if (name || id) {
        const query = name || id;
        try {
            const raw = await fetchPokemon(query);
            displayPokemon(normalizePokemon(raw));
        } catch {
            // handling error HTTP
            showAlert("❌ ERROR: No Pokémon found with that Name or ID.", 'error');
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
 <img src="${pokemon.sprite}" 
 alt="${pokemon.name}"
      onerror="this.onerror=null; this.src='/img/placeholder.png';" />
 <h3>${pokemon.name.toUpperCase()}</h3>
 <p>#${pokemon.id}</p>
 
    <div class="pokemon-types">
        ${pokemon.types.map(type => 
            `<span class="type-tag type-${type}">${type.toUpperCase()}</span>`
        ).join('')}
    </div>
 `;
  card.addEventListener("click", () => openModal(pokemon));
  pokemonContainer.appendChild(card);
}

// ------------------------
// MODAL
// ------------------------
function openModal(pokemon) {
    // 1. HTML INSERTION
    modalBody.innerHTML = `
     <img src="${pokemon.sprite}"/>
     <h2>${pokemon.name.toUpperCase()}</h2>

        <div class="pokemon-types-modal" style="margin-bottom: 20px;">
            ${pokemon.types.map(type => 
                `<span class="type-tag type-${type}">${type.toUpperCase()}</span>`
            ).join(' ')}
        </div>
        <h3>Stats</h3>
        ${pokemon.stats
            .map(s => `<p><strong>${s.stat.name}:</strong> ${s.base_stat}</p>`)
            .join("")}
        
        <h3>Abilities (Nested Search)</h3>
        <ul id="abilityList">
            ${pokemon.abilities 
                .map(a => `<li data-url="${a.url}" class="ability-link">${a.name.toUpperCase()}</li>`)
                .join("")}
        </ul>

        <button id="saveFavoriteBtn" class="btn-search" style="margin-top: 5px;">
            ⭐️ Save as Favorite
        </button>
        <button id="backToPokemon" class="btn-search back-btn hidden" style="margin-top: 10px;">
             ← Back
        </button>
    `;
    modal.classList.remove("hidden");

    // =========================================================
    // 2. INTERACTION LOGIC
    // =========================================================

    // A. Private API Logic (Save Favorite)
    document.getElementById("saveFavoriteBtn").addEventListener("click", async () => {
        try {
            await saveFavoritePokemon({ 
                id: pokemon.id, 
                name: pokemon.name, 
                date: new Date().toISOString()
            });
            alert(`${pokemon.name.toUpperCase()} successfully saved to favorites!`);
            document.getElementById("saveFavoriteBtn").textContent = "⭐️ Saved!";
            document.getElementById("saveFavoriteBtn").disabled = true;
        } catch (error) {
            alert(`ERROR saving favorite: ${error.message}. Is json-server running on http://localhost:3000?`);
        }
    });

    // B. Nested Search Logic (Ability Details)
    document.querySelectorAll(".ability-link").forEach(link => {
        link.style.cursor = "pointer";
        link.style.color = "var(--color-primary-light)";
        
        link.addEventListener("click", async (e) => {
            const abilityUrl = e.target.getAttribute('data-url');
            try {
                const abilityDetails = await fetchAbilityDetails(abilityUrl);
                
                // Nested Level 2: Show ability details
                modalBody.innerHTML = `
                    <h2>ABILITY: ${abilityDetails.name.toUpperCase()}</h2>
                    <p><strong>Effect:</strong> ${abilityDetails.effect_entries.find(e => e.language.name === 'en').effect}</p>
                    <p><strong>Generation:</strong> ${abilityDetails.generation.name}</p>
                    <button id="backToPokemon" class="btn-search" style="margin-top: 20px;">
                        ← Back to ${pokemon.name.toUpperCase()}
                    </button>
                `;
                
                // Listener to go back to Level 1
                document.getElementById("backToPokemon").addEventListener("click", () => {
                    openModal(pokemon); // Recursively return to the Pokemon view
                });

            } catch (error) {
                alert("Error loading ability details.");
            }
        });
    });
}

const alertContainer = document.getElementById("alertContainer");

function showAlert(message, type = 'error') {
    clearTimeout(window.alertTimeout);
    pokemonContainer.innerHTML = "";
    
    alertContainer.innerHTML = `
        <div class="custom-alert alert-${type}">
            ${message}
        </div>
    `;

    window.alertTimeout = setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 4000);
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});



const API_BASE = "https://pokeapi.co/api/v2";
const PRIVATE_API_BASE = "http://localhost:3000";

// Fetch Pokémon by name or ID
export async function fetchPokemon(query) {
  try {
    const res = await fetch(`${API_BASE}/pokemon/${query}`);
    if (!res.ok) throw new Error("Pokemon not found");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Fetch all Pokémon types
export async function fetchTypes() {
  try {
    const res = await fetch(`${API_BASE}/type`);
    if (!res.ok) throw new Error("Cannot load types");
    return (await res.json()).results;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Fetch Pokémon by type
export async function fetchPokemonByType(typeName) {
  try {
    const res = await fetch(`${API_BASE}/type/${typeName}`);
    if (!res.ok) throw new Error("Cannot load Pokémon by type");
    const data = await res.json();
    return data.pokemon.map(p => p.pokemon);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Fetch ability details

export async function saveFavoritePokemon(pokemonData) {
 try {
 const res = await fetch(`${PRIVATE_API_BASE}/favorites`, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify(pokemonData),
 });
 if (!res.ok) throw new Error("Could not save favorite");
 return await res.json();
 } catch (err) {
 console.error("Error saving favorite:", err);
 // Lanzar el error para que sea capturado en main.js
 throw new Error("Error connecting to private API.");
 }
}

export async function fetchAbilityDetails(url) {
 try {
 const res = await fetch(url);
 if (!res.ok) throw new Error("Ability details not found");
 return await res.json();
 } catch (err) {
 console.error(err);
 throw err;
 }
}

export async function fetchFavorites() {
  try {
    const res = await fetch(`${PRIVATE_API_BASE}/favorites`);
    if (!res.ok) throw new Error("Cannot load favorites");
    return await res.json();
  } catch (err) {
    console.error("Error fetching favorites:", err);
    throw err;
  }
}
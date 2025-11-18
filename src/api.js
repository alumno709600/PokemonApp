const API_BASE = "https://pokeapi.co/api/v2";

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


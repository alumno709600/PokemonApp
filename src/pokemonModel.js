export function normalizePokemon(raw) {
  return {
    id: raw.id,
    name: raw.name,
    sprite: raw.sprites.front_default,
    stats: raw.stats,
    abilities: raw.abilities.map(a => a.ability),
  };
}

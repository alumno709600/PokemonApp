# 🔎 PokéFinder – Practice Report

![Banner](./img/banner-poke-readme.png)

## 📝 Project Overview

**PokéFinder** is an interactive web application designed to search, explore, and save information about Pokémon.  
It is built using **HTML**, **CSS**, and **JavaScript**, and integrates **two different APIs**:

1. 🌐 **Public API:** [PokéAPI](https://pokeapi.co/) – Provides all Pokémon data.
2. 🏠 **Local API:** `json-server` – Stores the user’s favorite Pokémon locally.

This document explains how these APIs were accessed, highlights the key application functions, and describes the user experience from a functional perspective.

---

## 👤 User Features

From a user’s point of view, the application offers:

### 🔎 **1. Search by Name or ID**
Type any Pokémon name (e.g., “Pikachu”) or ID (e.g., “25”) to instantly retrieve results.

### ⚡ **2. Live Search (Dynamic Filtering)**
As the user types, the application automatically filters and displays Pokémon that partially match the input  
—for example, typing “pi” shows **Pikachu**, **Pidgey**, **Piplup**, etc.

### 🌪️ **3. Filter by Type**
Users can select a Pokémon type from a dropdown (🔥 Fire, 💧 Water, 🪨 Rock, etc.) to view all Pokémon associated with that type.

### 📊 **4. Detailed Pokémon View (Modal Window)**
Clicking a Pokémon card opens a detailed modal showing:
- Sprite (official artwork)
- Base stats (HP, Attack, Defense, Speed…)
- Types
- Abilities

### 🧠 **5. Ability Information**
Inside the modal, users can click any ability to view:
- Ability description
- Effects
- Generation introduced

This is done through a secondary API request.

### ⭐ **6. Save Favorites**
Users can save Pokémon to their favorites list.  
A dedicated button (**Show My Favorites**) loads the complete saved collection from the local JSON server.

---

## 🔗 How the APIs Are Accessed

### 🌐 **1. Public PokéAPI**
- Base URL: `https://pokeapi.co/api/v2/`
- Used for:
  - Pokémon data (name, ID, stats, images)
  - Types list
  - Ability details

Example request:

```javascript
const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
const data = await response.json();
````
---

## Important Functions

Here are the most important parts of our code:

### 📂 `api.js`
* **`fetchPokemon(query)`**: This is the main connector. It takes a name or ID, calls the API, and gives us the raw data.
* **`saveFavoritePokemon(data)`**: This sends your favorite Pokémon to the local server so it is remembered later.

### 📂 `pokemonModel.js`
* **`normalizePokemon(raw)`**: The API gives us *too much* information. This function cleans it up. It creates a simple object with only what we need (Name, ID, Image, and Stats).

### 📂 `main.js`
* **`displayPokemon(pokemon)`**: This function draws the HTML cards on the screen. It puts the image, name, and type tags in the right place.
* **`openModal(pokemon)`**: This opens the pop-up window. It also has a special feature: if you click an ability inside the modal, it fetches *more* data to show the ability description.

---

## How to Run This Project

1. **Start the Local Database:**
   Run this command to switch on the favorites system:
   ```bash
   npx json-server --watch db.json --port 3000
2. **Open the App:**
   Open a new **Terminal** (keep the previous one open), and run:
   ```bash
   npm run dev

---

## Project Report PDF

[Proyect Report PDF](https://docs.google.com/document/d/1ZsYTKsYyGlZG7xZwkYb4J-uXYWjgIAc-_kPPKkoxy5s/edit?usp=sharing)

---

### 👨‍💻 Developers
Built by **Elias Maatalat** & **Lucilene Vidal Lima**.

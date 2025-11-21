# 🔎 PokéFinder - Practice Report

![Banner](./img/banner-poke-readme.png)

## 📝 Project Overview
**PokéFinder** is a web application where you can search for Pokémon, see their stats, and save your favorites. The project is built using **HTML**, **CSS**, and **JavaScript**.

We use two different APIs in this project:
1. 🌐 **Public API:** [PokéAPI](https://pokeapi.co/) (To get the Pokémon data).
2. 🏠 **Local API:** `json-server` (To save your favorites on your computer).

---

## 👤 User Features (How it works)

Here is what a user can do in the application:

* **🔎 Search:** You can type a **Name** (like "Pikachu") or an **ID** (like "25") to find a Pokémon.
* **⚡ Live Search:** Just start typing, and the app will find Pokémon instantly!
* **🌪️ Filter by Type:** You can select a type (like 🔥 Fire or 💧 Water) to see all Pokémon of that group.
* **📊 Detailed Stats:** Click on any card to open a window (Modal). You will see:
    * The picture (Sprite).
    * Stats (HP, Attack, Speed).
    * Abilities.
* **🧠 Ability Check:** Inside the details window, click on an **Ability Name** to read what it does.
* **⭐ Favorites:**
    * Click **"Save as Favorite"** to keep a Pokémon.
    * Click the **"Show My Favorites"** button to see your saved collection.

---

## 🔗 How We Access the APIs

We use the JavaScript `fetch()` function to get data from the internet.

### 1. The Public API (PokéAPI)
* **URL:** `https://pokeapi.co/api/v2`
* **How we use it:** We ask this API for Pokémon names, images, types, and abilities. We also use it to fill the "Type" dropdown menu.

### 2. The Private API (Local)
* **URL:** `http://localhost:3000`
* **How we use it:** We use a file called `db.json` to store data.
    * **POST:** To save a new favorite.
    * **GET:** To load the list of favorites.

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

### 👨‍💻 Developers
Built by **Elias Maatalat** & **Lucilene Vidal Lima**.

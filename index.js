async function fetchCharacter(id) {
  const response = await fetch(`https://swapi.dev/api/people/${id}/`);
  if (!response.ok) {
    console.log("Failed to fetch character data");
  }
  const data = await response.json();
  return data;
}

async function fetchAllCharacters() {
  let Characters = [];
  try {
    for (let index = 1; index < 30; index++) {
      const character = await fetchCharacter(index);
      Characters.push(character);
    }
  } catch (error) {
    console.log(error);
  }
  return Characters;
}

function showCharacters() {}

fetchAllCharacters()
  .then((characters) => {
    localStorage.setItem("starWarsCharacters", JSON.stringify(characters));
    console.log(
      "All characters fetched and saved to local storage:",
      characters
    );
  })
  .catch((error) => console.error("Error fetching characters:", error));

//********************************************************************************************** */
const backgroundColors = ["#8e8e8e", "#e1dede", "#444444"];
const colors = ["#000000", "#444444", "#8e8e8e"];

let currentPage = 1;
const charactersPerPage = 6;
const characters = JSON.parse(localStorage.getItem("starWarsCharacters"));

function displayCharacters(page) {
  const characterList = document.getElementById("characterList");
  characterList.innerHTML = "";

  const startIndex = (page - 1) * charactersPerPage;
  const endIndex = Math.min(startIndex + charactersPerPage, characters.length);

  for (let i = startIndex; i < endIndex; i++) {
    const character = characters[i];
    const listItem = document.createElement("li");
    const characterLink = document.createElement("a");
    listItem.style.color = colors[i % 3];
    listItem.style.backgroundColor = backgroundColors[i % 3];
    listItem.textContent = character.name;
    characterLink.href = "#";
    listItem.style.cursor = "pointer";
    listItem.addEventListener("click", () => showCharacterDetails(character));
    listItem.appendChild(characterLink);
    characterList.appendChild(listItem);
  }

  document.getElementById(
    "pageInfo"
  ).textContent = `Page ${currentPage} of ${Math.ceil(
    characters.length / charactersPerPage
  )}`;
}

document.getElementById("previousPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayCharacters(currentPage);
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  if (currentPage < Math.ceil(characters.length / charactersPerPage)) {
    currentPage++;
    displayCharacters(currentPage);
  }
});

async function showCharacterDetails(character) {
  try {
    const planet = await fetchPlanet(character.homeworld);
    const characterDetail = document.getElementById("characterDetail");
    const planetDetail = document.getElementById("planetDetail");
    characterDetail.style.justifyContent = "center";
    characterDetail.style.alignItems = "center";
    planetDetail.style.justifyContent = "center";
    planetDetail.style.alignItems = "center";
    characterDetail.innerHTML = ``;
    planetDetail.innerHTML = ``;
    const loader1 = document.createElement("div");
    const loader2 = document.createElement("div");
    loader1.classList.add("loader");
    loader2.classList.add("loader");
    characterDetail.appendChild(loader1);
    planetDetail.appendChild(loader2);

    setTimeout(() => {
      characterDetail.removeChild(loader1);
      planetDetail.removeChild(loader2);
      characterDetail.style.justifyContent = "flex-start";
      characterDetail.style.alignItems = "flex-start";
      planetDetail.style.justifyContent = "flex-start";
      planetDetail.style.alignItems = "flex-start";
      characterDetail.innerHTML = `
            <li id="characterName">${character.name}</li>
            <li>Height : ${character.height}cm </li>
            <li>Mass : ${character.mass}kg </li>
            <li>Hair color : ${character.hair_color}</li>
            <li>Skin color : ${character.skin_color} </li>
            <li>Eye color : ${character.eye_color} </li>
            <li>Birth year : ${character.birth_year} </li>
            <li>Gender : ${character.gender} </li>
            <li>Homeworld : ${planet.name} </li>
          `;
      planetDetail.innerHTML = `
          <li id="planetName">Planet : ${planet.name}</li>
          <li>Rotation period : ${planet.rotation_period}h </li>
          <li>Orbital period : ${planet.orbital_period}days </li>
          <li>Diameter : ${planet.diameter}km</li>
          <li>Climate : ${planet.climate} </li>
          <li>Gravity : ${planet.eye_color} </li>
          <li>Terrain : ${planet.birth_year} </li>
        `;
    }, 500);
  } catch (error) {
    console.error("Error fetching planet data:", error);
    characterDetail.removeChild(loader);
    characterDetail.textContent = "Failed to fetch planet data";
  }
}

async function fetchPlanet(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch planet data");
  }
  const data = await response.json();
  return data;
}

displayCharacters(currentPage);
//******************************************************************************** */

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
    for (let index = 1; index < 400; index++) {
      const character = await fetchCharacter(index);
      console.log(index);
      console.log(character);
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
    listItem.style.color = colors[i % 3];
    listItem.style.backgroundColor = backgroundColors[i % 3];
    listItem.textContent = character.name;
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

displayCharacters(currentPage);
//******************************************************************************** */

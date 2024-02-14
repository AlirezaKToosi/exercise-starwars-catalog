const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10", "Item 11", "Item 12", "Item 13", "Item 14", "Item 15"]; // Sample items

const itemsPerPage = 10;
let currentPage = 1;

const itemList = document.getElementById('item-list');
const paginationButtons = document.getElementById('pagination-buttons');

function displayItems(page) {
  itemList.innerHTML = '';
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = items.slice(startIndex, endIndex);
  pageItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    itemList.appendChild(li);
  });
}

function updatePaginationButtons() {
  paginationButtons.innerHTML = '';
  const numPages = Math.ceil(items.length / itemsPerPage);
  for (let i = 1; i <= numPages; i++) {
    const button = document.createElement('div');
    button.textContent = i;
    button.classList.add('pagination-button');
    if (i === currentPage) {
      button.classList.add('active');
    }
    button.addEventListener('click', () => {
      currentPage = i;
      displayItems(currentPage);
      updatePaginationButtons();
    });
    paginationButtons.appendChild(button);
  }
}

displayItems(currentPage);
updatePaginationButtons();

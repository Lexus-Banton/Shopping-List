/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createLists, getLists, boughtItem, deleteAllItems } from './fetch-utils.js';
import { renderList } from './render-utils.js';

/* Get DOM Elements */
const addListForm = document.getElementById('add-list-form');
const removeButton = document.getElementById('remove-button');
const errorDisplay = document.getElementById('error-display');
const shoppingList = document.getElementById('shopping-list');
/* State */
let lists = [];
let error = null;

/* Events */
window.addEventListener('load', async () => {
    const response = await getLists();
    error = response.error;
    lists = response.data;

    if (error) {
        displayError();
    }
    if (lists) {
        displayLists();
    }
});

addListForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addListForm);
    const newList = { item: formData.get('item'), quantity: formData.get('quantity') };

    const response = await createLists(newList);
    error = response.error;
    const list = response.data;

    if (error) {
        displayError();
    } else {
        lists.push(list);
        displayLists();
        addListForm.reset();
    }
});

removeButton.addEventListener('click', async () => {
    const response = await deleteAllItems();
    error = response.error;
    if (error) {
        displayError();
    } else {
        lists = [];
        displayLists();
    }
});

/* Display Functions */
function displayLists() {
    shoppingList.innerHTML = '';

    for (const list of lists) {
        const listEl = renderList(list);

        shoppingList.append(listEl);

        listEl.addEventListener('click', async () => {
            const response = await boughtItem(list.id);
            error = response.error;
            const boughtListItem = response.data;

            if (error) {
                displayError();
            } else {
                const index = lists.indexOf(list);
                lists[index] = boughtListItem;
                displayLists();
            }
        });
    }
}

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

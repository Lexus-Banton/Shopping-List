/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createLists, getLists } from './fetch-utils.js';
import { renderList } from './render-utils.js';

/* Get DOM Elements */
const addListForm = document.getElementById('add-list-form');
//const removeButton = document.getElementById('remove-button');
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
        displayLists(lists);
    }
});

addListForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addListForm);
    const newList = { item: formData.get('description') };

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

/* Display Functions */
function displayLists(lists) {
    shoppingList.innerHtml = '';

    for (const list of lists) {
        const listEl = renderList(list);
        console.log(listEl);
        shoppingList.append(listEl);
        return shoppingList;
    }
}

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

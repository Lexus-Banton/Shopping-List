/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createLists } from './fetch-utils.js';

/* Get DOM Elements */
const addListForm = document.getElementById('add-list-form');
const removeButton = document.getElementById('remove-button');
const errorDisplay = document.getElementById('');

/* State */
let lists = [];
let error = null;

/* Events */
addListForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addListForm);
    const newList = { description: formData.get('description') };

    const response = await createLists(newList);
    error = response.error;
    const list = response.data;
    console.log(list);
    if (error) {
        displayError();
    } else {
        lists.push(list);
        displayLists();
        addListForm.reset();
    }
});

/* Display Functions */

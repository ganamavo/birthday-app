import { persons } from "../script.js";
import { table, listContainer, body } from "./elements.js";
import { htmlGenerator } from "./html_generator.js";
import { displayPersonsList } from "./displayPeople.js";
import { destroyPopup } from "./utils.js"; 

// Add the list 
export const addNewPerson = (e) => {
    const maxDate = new Date().toISOString().slice(0, 10);
    let addListForm = document.createElement('form');
    addListForm.classList.add('popup', 'add_form');
    addListForm.insertAdjacentHTML('afterbegin', ` 
    <div class="container form_container">
        <h3> Add the list</h3>
        <button type="button" class="cancel exit" name="exit" >
            <svg fill="none" stroke="#094067" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <label class="d-block" for="firstname">First Name:</label>
        <input type="text" name="firstname" placeholder="first name" id="firstname" required>
        <label class="d-block" for="lastname">Last Name:</label>
        <input type="text" name="lastname" placeholder="last name" id="lastname" required>
        <label class="d-block" for="birthday"> Birthday:</label>
        <input type="date" name="birthday" max="${maxDate}" id="birthday">
        <label class="d-block" for="picture"> Image url:</label>
        <input type="text" name="picture" value="https://picsum.photos/100" placeholder="url for the profile picture" id="picture" required>
        <div class="button_container">
            <button class="submit save_btn confirm_btn" type="submit"> Save changes</button> 
            <button class="cancel cancel_btn" name="cancel" type="button"> Cancel</button>
        </div>
    </div>`);
    document.body.appendChild(addListForm);
    addListForm.classList.add("open");
    body.classList.add("overflow_hidden");

    // Add the list of the people
    const addPeopleList = (e) => {
        addListForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const addForm = e.target.closest(".popup");
            const AddFirstNameInput = addForm.querySelector("#firstname").value;
            const AddLastNameInput = addForm.querySelector("#lastname").value;
            const AddPictureInput = addForm.querySelector("#picture").value;
            const addBirthdayInput = addForm.querySelector("#birthday").value;

            const newPerson = {
                "id": Date.now(),
                "lastName": AddLastNameInput,
                "firstName": AddFirstNameInput,
                "picture": AddPictureInput,
                "birthday": addBirthdayInput,
            };

            persons.push(newPerson);
            // Create the html 
            const addPersonHtml = htmlGenerator(persons);
            // Append the html to the list container
            listContainer.innerHTML = addPersonHtml;
            displayPersonsList();
            // Reset the form after submitting
            addForm.reset();
            // Destroy it after submitting
            destroyPopup(addForm)
            table.dispatchEvent(new CustomEvent('updateList'));
            
        });
         
    }
    addPeopleList()
    
    // Remove the form by clicking the cancel button
    if (addListForm.cancel) {
        const cancelAddButton = addListForm.cancel;
        cancelAddButton.addEventListener('click', () => {
            destroyPopup(addListForm);
        });
    }
    if (addListForm.exit) {
        const cancelAddButton = addListForm.exit;
        cancelAddButton.addEventListener('click', () => {
            destroyPopup(addListForm);
        });
    }
}

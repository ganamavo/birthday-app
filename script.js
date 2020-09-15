// Grab all the necesssary elements
const table = document.querySelector("table");
const listContainer = document.querySelector(".contents_container");

// Importing the data
const endpoint = "./people.json";

// This is reussable wait function that we can always use when we wanna wait before firing sth
function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Fetch the data
async function fetchPersons() {
    const respose = await fetch(`${endpoint}?`);
    let persons = await respose.json();

    //get the array from ls
    const generatePersonHtml = (personList) => {
        // To get the date
        const today = new Date()

        // This is a function that handles the date and we'll call this when mapping the object
        const calcDate = (date1, date2) => {
            let diff = Math.floor(date1.getTime() - date2.getTime());
            let day = 1000 * 60 * 60 * 24;
            let days = Math.floor(diff / day);
            let message = days;

            // Return the message
            return message
        }

        // Show the list in the html
        return personList.map(data =>
            `<tr data-id="${data.id}" class="list_container">
            <td scope="row">
             <img src="${data.picture}" alt>
             </td>
            <td class="persons_name">
                <span class="name d-block">
                  ${data.firstName}
                  ${data.lastName} 
                </span>
                <span class="date d-block">
                   Turns on the ${new Date(data.birthday).toLocaleDateString()}
                </span>
            </td>
         <td class="days">${calcDate(today, new Date(new Date(data.birthday).toLocaleDateString()))} Days</td>
            <td> 
                <button class="edit bg-primary text-white" type="button">
                    Edit
                </button>  
            </td>
            <td class="delete">
                <button class="delete_btn text-danger">
                    Delete
                </button>
            </td>
        </tr>`
        ).join("");
    }

    // Display the persons ' list in the html
    const displayPersonsList = () => {
        // Sorting the persons by birthday, from the soonest to the furthest
        const sortedPersons = persons.sort((person1, person2) => person2.birthday - person1.birthday);
        const listHtml = generatePersonHtml(sortedPersons);
        listContainer.innerHTML = listHtml;
    }
    displayPersonsList();

    // A function that edits the person
    const editPerson = (e) => {
        // Open the modal 
        return new Promise(function (resolve) {
            const editIcon = e.target.closest(".edit");
            // If the target is the edit icon, add the className to open the popup
            if (editIcon) {
                const id = e.target.closest(".list_container").dataset.id;
                editPersonPopup(id);
            }
        });
    };

    // Distroy the popup while canceling or save
    async function destroyPopup(popup) {
        popup.classList.remove('open');
        await wait(500);
        // remove the popup from the DOM
        popup.remove();
        // remove it from the js memory
        popup = null;
    }

    // Edit the form
    function editPersonPopup(id) {
        const personToEdit = persons.find(person => person.id == id);
        // Create the form element
        let formPopup = document.createElement('form');
        formPopup.classList.add('popup');
        formPopup.insertAdjacentHTML('afterbegin', `
        <div class="container bg-primary">
            <p> Edit the person</p>
            <label class="d-block" for="firstname">First Name:</label>
            <input type="text" name="firstname" id="firstname" value="${personToEdit.firstName}" required>
            <label class="d-block" for="lastname">Last Name:</label>
            <input type="text" name="lastname" id="lastname" value="${personToEdit.lastName}" required>
            <label class="d-block" for="birthday"> Birthday:</label>
            <input type="text" name="birthday" id="birthday" value="${personToEdit.birthday}" required>
            <label class="d-block" for="url"> Image url:</label>
            <input type="text" name="picture" id="picture" value="${personToEdit.picture}" required>
            <div class="button_container">
                <button class="submit_button" type="submit" data-id="${id}"> Save</button>
                <button class="cancel" name="cancel" type="button" data-id="${id}"> Cancel</button>
		    </div>
        </div>`);
        document.body.appendChild(formPopup);
        formPopup.classList.add("open");

        // Save the changes
        formPopup.addEventListener("submit", (e) => {
            e.preventDefault();
            personToEdit.lastName = formPopup.lastname.value;
            personToEdit.firstName = formPopup.firstname.value;
            personToEdit.birthday = formPopup.birthday.value;
            personToEdit.picture = formPopup.picture.value;
            // Display in the list
            displayPersonsList();
            destroyPopup(formPopup)
            table.dispatchEvent(new CustomEvent('updateList'));
        })

        // Remove form by clicking the cancel button
        if (formPopup.cancel) {
            const cancelButton = formPopup.cancel;
            cancelButton.addEventListener('click', () => {
                destroyPopup(formPopup);
            });
        }

    }

    // Delete list from the local storage
    const deletePerson = (e) => {
        const deleteButton = e.target.closest(".delete_btn");
        if (deleteButton) {
            const tableRow = e.target.closest('tr');
            const idToDelete = tableRow.dataset.id;
            deleteList(idToDelete);
        }
    }

    const deleteList = (idToDelete) => {
        const personsToKeep = persons.filter(person => person.id !== idToDelete);
        // Show a warning before the user decides
        let deleteContainerPopup = document.createElement('div');
        deleteContainerPopup.classList.add('popup');
        deleteContainerPopup.insertAdjacentHTML('afterbegin', `
            <div class="delete_container bg-warning">
				<p class="warning">
					Are you sure you want to delete?
				</p>
				<button type="button" name="confirm" class="confirm_delete"> Yes</button>
				<button type="button" name="cancel" class="cancel_delete">Not yet</button>
            </div>`);
        document.body.appendChild(deleteContainerPopup)
        deleteContainerPopup.classList.add("open");

        // Look for the confirm delete button and delete it
        deleteContainerPopup.addEventListener("click", (e) => {
            e.preventDefault()
            const confirmDeleteButton = e.target.closest("button.confirm_delete");
            if (confirmDeleteButton) {
                persons = personsToKeep;
                displayPersonsList(persons);
                destroyPopup(deleteContainerPopup);
                table.dispatchEvent(new CustomEvent('updateList'));
            }
        })

        // Cancel if the user doesn't wanna delete yet
        deleteContainerPopup.addEventListener("click", (e) => {
            e.preventDefault()
            const cancelDeleteButton = e.target.closest("button.cancel_delete");
            if (cancelDeleteButton) {
                destroyPopup(deleteContainerPopup);
            }
        })
        table.dispatchEvent(new CustomEvent('updateList'));
    }

    // Save in the local storage
    const mirrorToLocalStorage = () => {
        localStorage.setItem('persons', JSON.stringify(persons));
    }

    // restor from local storage
    const initLocalStorage = () => {
        const personListString = localStorage.getItem('persons');
        const personsList = JSON.parse(personListString);
        if (personsList.length) {
            persons = personsList;
            displayPersonsList()
        }
        table.dispatchEvent(new CustomEvent('updateList'));
    };

    // All event listners
    window.addEventListener("click", deletePerson);
    window.addEventListener("click", editPerson);
    table.addEventListener("updateList", mirrorToLocalStorage);
    initLocalStorage();
}


fetchPersons();
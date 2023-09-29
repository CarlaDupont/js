const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const contactList = document.getElementById('contact-list');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;
    const key = `contact-${Date.now()}`;

    const contact = {
        name,
        email
    };

    localStorage.setItem(`contact-${Date.now()}`, JSON.stringify(contact));

    nameInput.value = '';
    emailInput.value = '';

    displayContacts();
});

function displayContacts() {
    contactList.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('contact-')) {
            const contact = JSON.parse(localStorage.getItem(key));

            const listItem = document.createElement('li');
            listItem.textContent = `${contact.name}, ${contact.email},`;

            const editButton = document.createElement('button');
            editButton.textContent = 'Modifier';
            editButton.dataset.key = key;
            editButton.addEventListener('click', editContact);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.dataset.key = key;
            deleteButton.addEventListener('click', deleteContact);

            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);
            contactList.appendChild(listItem);
        }
    }
}

function editContact(e) {
    const key = e.target.dataset.key;
    const contact = JSON.parse(localStorage.getItem(key));

    nameInput.value = contact.name;
    firstNameInput.value = contact.firstName;
    phoneInput.value = contact.phone;
    emailInput.value = contact.email;

    contactForm.dataset.mode = 'edit';
    contactForm.dataset.key = key;

    contactForm.querySelector('button[type="submit"]').textContent = 'Enregistrer';

    localStorage.removeItem(key);

    contactForm.removeEventListener('submit', handleContactSubmit);
    contactForm.addEventListener('submit', handleEditSubmit);
}

function handleEditSubmit(e) {
    e.preventDefault();

    const key = contactForm.dataset.key;
    const firstName = firstNameInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;


    const existingContact = JSON.parse(localStorage.getItem(key));

    existingContact.name = name;
    existingContact.email = email;

    localStorage.setItem(key, JSON.stringify(updatedContact));


    contactForm.reset();
    contactForm.dataset.mode = 'add';
    contactForm.querySelector('button[type="submit"]').textContent = 'Ajouter un contact';


    contactForm.removeEventListener('submit', handleEditSubmit);
    contactForm.addEventListener('submit', handleContactSubmit);


    displayContacts();
}



function deleteContact(e) {
    const key = e.target.dataset.key;
    localStorage.removeItem(key);
    displayContacts();
}


displayContacts();


let phoneToEdit = "";

const API_URL = {
    CREATE: `contacts/create`,
    READ: `contacts`,
    UPDATE:`contacts/update`,
    DELETE:`contacts/delete`
};

// if we are on demo site
if (true || location.host === "andreeaotet.github.io") {
    API_URL.READ = 'data/contacts.json';
}

const loadContacts = () => {
    $.ajax(API_URL.READ).done(contacts => {
        window.globalContacts = contacts;
        displayContacts(contacts);
    });
}

function saveContact() {
    const firstName = $('input[name=firstName]').val();
    const lastName = document.querySelector('input[name=lastName]').value;
    const phone = $('input[name=phone]').val();

    // console.debug('saveContact...');

    const actionUrl = phoneToEdit ? API_URL.UPDATE + '?id=' + phoneToEdit : API_URL.CREATE;
    
    $.post(actionUrl, {
        firstName,  //shortcut from ES6
        lastName,
        phone: phone // ES5 (key = value)
    }).done(response => {
        // console.warn('done create contact', response);
        phoneToEdit = '';
        if (response.success) {
            loadContacts();
        }
    });
}

function displayContacts(contacts) {
    var listItems = contacts.map(contact => {
        const phone = contact.phone;
        const info = phone.indexOf('http') === 0 ? `<a target="_blank"href="${phone}">${phone.replace('https://github.com/', '')}</a>` : phone;
        return `<tr>
                    <td>${contact.firstName}</td>
                    <td>${contact.lastName}</td>
                    <td>${info}</td>
                    <td>
                        <a href="${API_URL.DELETE}?id=${contact.id}">&#10006;</a>
                        <a href="#" class="edit" data-id="${contact.id}">&#9998;</a>
                    </td>
                </tr>`;
    });

    document.querySelector('tbody').innerHTML = listItems.join('');
}




function initEvents() {
    $("tbody").delegate("a.edit", "click", function () {
        phoneToEdit = this.getAttribute('data-id');

        var contact = globalContacts.find(contact => contact.id == phoneToEdit);
        // console.warn("edit", phoneToEdit);

        $('input[name=phone]').val(contact.phone);
        $('input[name=firstName]').val(contact.firstName);
        document.querySelector('input[name=lastName]').value = contact.lastName;
    });

    document.getElementById('search').addEventListener('input', searchContacts);
}

function searchContacts(ev) {
        const value = this.value.toLowerCase();

        var filteredContacts = globalContacts.filter(function(contact) {
            return contact.firstName.toLowerCase().includes(value) ||
             contact.lastName.toLowerCase().includes(value) ||
             contact.phone.toLowerCase().includes(value)
        });

        displayContacts(filteredContacts);
}

// start app
loadContacts();
initEvents();
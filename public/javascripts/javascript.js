var phoneToEdit = "";

function getNewRow() {
    return `<tr>
                <td><input type="text" name="firstName" placeholder="First Name"/></td>
                <td><input type="text" name="lastName" placeholder="Last Name"/></td>
                <td><input type="text" name="phone" placeholder="Phone"/></td>
                <td><button onclick="saveContact()">Save</button></td>
                </tr>`;
}

function saveContact() {
    var firstName = $('input[name=firstName]').val();
    var lastName = document.querySelector('input[name=lastName]').value;
    var phone = $('input[name=phone]').val();

    // console.debug('saveContact...');

    var actionUrl = phoneToEdit ? 'contacts/update?phone=' + phoneToEdit : 'contacts/create';
    
    $.post(actionUrl, {
        firstName,  //shortcut from ES6
        lastName,
        phone: phone // ES5 (key = value)
    }).done(function (response) {
        // console.warn('done create contact', response);
        if (response.success) {
            loadContacts();
        }
    });
}

function displayContacts(contacts) {
    var listItems = contacts.map(function (contact) {
        return `<tr>
                    <td>${contact.firstName}</td>
                    <td>${contact.lastName}</td>
                    <td>${contact.phone}</td>
                    <td>
                        <a href="/contacts/delete?phone=${contact.phone}">&#10006;</a>
                        <a href="#" class="edit" data-id="${contact.phone}">&#9998;</a>
                    </td>
                </tr>`;
    });
    // listItems.push(getNewRow());
    var actions = getNewRow()
    listItems.push(actions);

    var resultList = document.querySelector('tbody');
    resultList.innerHTML = listItems.join('');
}

function loadContacts() {
    $.ajax('contacts').done(function (contacts) {
        window.globalContacts = contacts;
        displayContacts(contacts);
    });
}


function initEvents() {
    $("tbody").delegate("a.edit", "click", function () {
        phoneToEdit = this.getAttribute('data-id');

        var contact = globalContacts.find(function (contact) {
            return contact.phone == phoneToEdit;
        });
        // console.warn("edit", phoneToEdit);

        $('input[name=phone]').val(phoneToEdit);
        $('input[name=firstName]').val(contact.firstName);
        document.querySelector('input[name=lastName]').value = contact.lastName;
    });

    var findContact = document.getElementById('search');
    findContact.addEventListener('input', searchContacts);
}

function searchContacts() {
        var value = this.value.toLowerCase();

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
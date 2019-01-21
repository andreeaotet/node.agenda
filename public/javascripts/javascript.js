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

    console.debug('saveContact...');

    $.post('contacts/create', {
        firstName,  //shortcut from ES6
        lastName,
        phone: phone // ES5 (key = value)
    }).done(function(response) {
        console.warn('done create contact', response);
        if(response.success) {
            loadContacts();
        }
    });
}

function loadContacts() {
    $.ajax('data/contacts.json').done(function (contacts) {
        var resultList = document.querySelector('tbody');

        var listItems = contacts.map(function (contact) {
            console.log('transorm contact', contact);
            return `<tr>
                        <td>${contact.firstName}</td>
                        <td>${contact.lastName}</td>
                        <td>${contact.phone}</td>
                        <td><a href="/contacts/delete?phone=${contact.phone}">x</a></td>
                    </tr>`;
        });
        console.log('list', listItems);
        // listItems.push(getNewRow());

        var actions = getNewRow()
        listItems.push(actions);

        resultList.innerHTML = listItems.join('');
    });
}

loadContacts();
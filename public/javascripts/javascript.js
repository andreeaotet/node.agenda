function addContacts() {
    $.ajax('data/contacts.json').done(function(contacts){
        var resultList = document.querySelector('tbody');

        var listItems = contacts.map(function(contact){
            console.log('transorm contact', contact);
            return `<tr>
                        <td>${contact.firstName}</td>
                        <td>${contact.lastName}</td>
                        <td>${contact.phone}</td>
                        <td><a href="data/contacts.json?delete=${contact.phone}">x</a></td>
                    </tr>`;
        });
        console.log('list', listItems);

        resultList.innerHTML = listItems.join('');
    });
}

addContacts();
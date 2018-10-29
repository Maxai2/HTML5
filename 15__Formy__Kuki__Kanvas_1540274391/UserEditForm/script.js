function submitSugnUp()
{
    event.preventDefault();
    let persForm = document.getElementById('userForm');
    let editPers = document.getElementById('editUser');

    let check = true;

    let mail = persForm.mail.value;
    let password = persForm.password.value;
    let repeat = persForm.repeat.value;

    if (new RegExp(/^([a-z\.\_\-]{3,})\@[a-z]{5}\.[a-z]{2,3}$/).test(mail) == false)
    {
        persForm.mail.nextElementSibling.innerText = 'Wrong email(xxx.xxx@xxxxx.xxx)';
        check = false;
    }
    else
    {
        persForm.mail.nextElementSibling.innerText = '';
    }

    if (new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/).test(password) == false)
    {
        persForm.password.nextElementSibling.innerText = 'Wrong password(Qwerty123)';
        check = false;
    }
    else
    {
        persForm.password.nextElementSibling.innerText = '';
    }

    if (repeat != password)
    {
        persForm.repeat.nextElementSibling.innerText = 'Passwords must match';
        check = false;
    }
    else
    {
        persForm.repeat.nextElementSibling.innerText = '';
    }

    if (check)
    {
        document.getElementById('userMailWelcome').innerText = `Hello, ${mail}! `;

        persForm.style.display = 'none';
        editPers.style.display = 'block';
    }
}

function submitChange()
{
    event.preventDefault();
    let persEditForm = document.getElementById('editUser');
    
    let check = true;

    let firstNameUser = persEditForm.firstName.value;
    let lastNameUser = persEditForm.lastName.value;
    let yearOfBirthUser = persEditForm.yearOfBirth.value;
    let genderUser = persEditForm.gender.value;
    let phoneUser = persEditForm.phone.value;
    let skypeUser = persEditForm.skype.value;

    if (new RegExp(/^[a-zA-Z]{3,20}$/).test(firstNameUser) == false)
    {
        persEditForm.firstName.nextElementSibling.innerText = 'Only letter and max 20';
        check = false;
    }
    else
        persEditForm.firstName.nextElementSibling.innerText = '';

    if (new RegExp(/^[a-zA-Z]{3,20}$/).test(lastNameUser) == false)
    {
        persEditForm.lastName.nextElementSibling.innerText = 'Only letter and max 20';
        check = false;
    }
    else
        persEditForm.lastName.nextElementSibling.innerText = '';

    if (new RegExp(/^[0-9]{4}$/).test(yearOfBirthUser) == false)
    {
        persEditForm.yearOfBirth.nextElementSibling.innerText = '1900<=';
        check = false;
    }
    else
        persEditForm.yearOfBirth.nextElementSibling.innerText = '';

    if (genderUser == '')
    {
        persEditForm.gender.nextElementSibling.innerText = 'Choose gender';
        check = false;
    }
    else
        persEditForm.gender.nextElementSibling.innerText = '';

    if (new RegExp(/^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/).test(phoneUser) == false)
    {
        persEditForm.phone.nextElementSibling.innerText = '*** *** ****';
        check = false;
    }
    else
        persEditForm.phone.nextElementSibling.innerText = '';

    if (new RegExp(/^[a-zA-Z0-9\-\.]{4,}$/).test(skypeUser) == false)
    {
        persEditForm.skype.nextElementSibling.innerText = 'a-zA-Z0-9-.{4,}*';
        check = false;
    }
    else
        persEditForm.skype.nextElementSibling.innerText = '';

    if (check)
    {
        let date = new Date(Date.now());
        date = new Date(date.setDate(date.getDate() + 1));
        
        document.cookie = `mailUser=${document.getElementById('userMailWelcome').innerText.replace('Hello, ', '').replace('!', '')};firstNameUser=${firstNameUser};lastNameUser=${lastNameUser};yearOfBirthUser=${yearOfBirthUser};genderUser=${genderUser};phoneUser=${phoneUser};skypeUser=${skypeUser};expires=${date.toUTCString()}`;

        alert('User succesfully registered!');
    }
}

function SignOut()
{
    event.preventDefault();
    let date = new Date(Date.now());
    date = new Date(date.setDate(date.getDate() - 1));

    document.cookie = 'mailUser=;firstNameUser=;lastNameUser=;yearOfBirthUser=;genderUser=;phoneUser=;skypeUser=;expires=' + date.toUTCString();

    editUser.style.display = 'none';
    userForm.style.display = 'block';

    document.location.reload(true);
}
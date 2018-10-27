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
        let date = new Date(Date.now());
        date = new Date(date.setDate(date.getDate() + 1));

        document.cookie = `userMail=${mail};expires=${date.toUTCString()}`;

        persForm.style.display = 'none';
        editPers.style.display = 'block';
    }
}
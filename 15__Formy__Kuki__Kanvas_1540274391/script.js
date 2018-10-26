function submitSugnUp()
{
    event.preventDefault();
    let persForm = document.getElementById('userForm');

    let mail = persForm.mail.value;
    let password = persForm.password.value;
    let repeat = persForm.repeat.value;

    if (new RegExp().test(mail) == false)
    {
        persForm.mail.nextElementSibling.innerText = '';
    }
}
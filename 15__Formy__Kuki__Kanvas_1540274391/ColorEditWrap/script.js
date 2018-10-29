
function addColor()
{
    event.preventDefault();
    let colorEditCont = document.getElementById('colorEditor');
    
    let colorVal = colorEditCont.color.value;
    let typeVal = colorEditCont.type.value;
    let codeVal = colorEditCont.code.value;
    
    if (new RegExp(/^[a-z]{3,}$/).test(colorVal) == false)
    {
        colorEditCont.color.nextElementSibling.innerText = 'only letters in low case';
    }
    else
    colorEditCont.color.nextElementSibling.innerText = '';
    
    switch (typeVal)
    {
        case 'RGB':
        if (new RegExp(/^[0-255]{1,3}, [0-255]{1,3}, [0-255]{1,3}$/).test(codeVal) == false)
        {
            colorEditCont.code.nextElementSibling.innerText = 'RGB code must mutch the pattern [0-255], [0-255], [0-255]';
        }
        else
        colorEditCont.code.nextElementSibling.innerText = '';
        break;
        case 'RGBA':
        if (new RegExp(/^[0-255]{1,3}, [0-255]{1,3}, [0-255]{1,3}, (1|0?\.\d+)$/).test(codeVal) == false)
        {
            colorEditCont.code.nextElementSibling.innerText = 'RGB code must mutch the pattern [0-255], [0-255], [0-255], [0-1]';
        }
        else
        colorEditCont.code.nextElementSibling.innerText = '';
        break;
        case 'HEX':
        if (new RegExp(/^#[0-9A-Z]{6}$/).test(codeVal) == false)
        {
            colorEditCont.code.nextElementSibling.innerText = 'RGB code must mutch the pattern #FFFFFF';
        }
        else
        colorEditCont.code.nextElementSibling.innerText = '';
    }
}

function colorNameChange()
{
    let colorEditCont = document.getElementById('colorEditor');
    let colorVal = colorEditCont['color'].value;
    
    console.log(colorVal);
    if (new RegExp(/^[a-z]{3,}$/).test(colorVal) == false)
    {
        colorEditCont.color.nextElementSibling.innerText = 'only letters in low case, min 3 symbol';
    }
    else
        colorEditCont.color.nextElementSibling.innerText = '';
}
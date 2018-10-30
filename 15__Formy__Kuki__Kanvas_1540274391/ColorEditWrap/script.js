function colorName(name, rgbVal, hexVal)
{
    this.name = name;
    this.rgbVal = rgbVal;
    this.hexVal = hexVal;
}

var aArr = document.getElementsByTagName('a');
let colArr = [];

for (let i = 0; i < aArr.length; ++i)
{
    let colName = aArr[i].text.toLowerCase();
    ++i;
    let colHEX = '#' + aArr[i].text;
    ++i;
    let colRGB = aArr[i].text;
    
    colArr.push(new colorName(colName, colRGB, colHEX));
}

function addColor()
{
    event.preventDefault();
}

function colorNameChange()
{
    let colorEditCont = document.getElementById('colorEditor');
    let colorVal = colorEditCont['color'].value;
    
    if (new RegExp(/^[a-z]{3,}$/).test(colorVal) == false)
    {
        colorEditCont.color.nextElementSibling.innerText = 'only letters in low case, min 3 symbol';
        document.getElementById('testColView').style.backgroundColor = 'antiquewhite';
        colorEditCont.code.value = '';
    }
    else
    {
        colorEditCont.color.nextElementSibling.innerText = '';
        
        switch (colorEditCont.type.value)
        {
            case 'RGB':
                colorEditCont.code.value = colArr.find(col => col.name == colorVal).rgbVal;
            break;
            case 'RGBA':
                colorEditCont.code.value = colArr.find(col => col.name == colorVal).rgbVal + ',1';
            break;
            case 'HEX':
                if (new RegExp(/^#[0-9A-Z]{6}$/).test(codeVal) == false)
                {
                    colorEditCont.code.nextElementSibling.innerText = 'RGB code must mutch the pattern #FFFFFF';
                }
                else
                {
                    colorEditCont.code.nextElementSibling.innerText = '';
                    colorEditCont.code.value = colArr.find(col => col.name == colorVal).hexVal;
                }
        }

        document.getElementById('testColView').style.backgroundColor = colorVal;
    }
}

/*
        switch (colorEditCont.type.value)
        {
            case 'RGB':
                if (new RegExp(/^[0-255]{1,3}, [0-255]{1,3}, [0-255]{1,3}$/).test(codeVal) == false)
                {
                    colorEditCont.code.nextElementSibling.innerText = 'RGB code must mutch the pattern [0-255], [0-255], [0-255]';
                }
                else
                {
                    colorEditCont.code.nextElementSibling.innerText = '';
                    colorEditCont.code.value = colArr.find(col => col.name == colorVal).rgbVal;
                }
            break;
            case 'RGBA':
                if (new RegExp(/^[0-255]{1,3}, [0-255]{1,3}, [0-255]{1,3}, (1|0?\.\d+)$/).test(codeVal) == false)
                {
                    colorEditCont.code.nextElementSibling.innerText = 'RGB code must mutch the pattern [0-255], [0-255], [0-255], [0-1]';
                }
                else
                {
                    colorEditCont.code.nextElementSibling.innerText = '';
                    colorEditCont.code.value = colArr.find(col => col.name == colorVal).rgbVal;
                }
            break;
            case 'HEX':
                if (new RegExp(/^#[0-9A-Z]{6}$/).test(codeVal) == false)
                {
                    colorEditCont.code.nextElementSibling.innerText = 'RGB code must mutch the pattern #FFFFFF';
                }
                else
                {
                    colorEditCont.code.nextElementSibling.innerText = '';
                    colorEditCont.code.value = colArr.find(col => col.name == colorVal).hexVal;
                }
        }
 */
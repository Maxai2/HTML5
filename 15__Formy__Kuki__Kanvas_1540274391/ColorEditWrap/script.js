function colorName(name, rgbVal, hexVal)
{
    this.name = name;
    this.rgbVal = rgbVal;
    this.hexVal = hexVal;
}
//jonasjacek.github.io/colors/data.json
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
        
        let col = colArr.find(col => col.name == colorVal);

        if (col == undefined)
            return;

        switch (colorEditCont.type.value)
        {
            case 'RGB':
            colorEditCont.code.value = col.rgbVal;
            break;
            case 'RGBA':
            colorEditCont.code.value = col.rgbVal + ',1';
            break;
            case 'HEX':
            colorEditCont.code.value = col.hexVal;
        }
        
        document.getElementById('testColView').style.backgroundColor = colorVal;
    }
}

function codeTypeChang()
{
    let colorEditCont = document.getElementById('colorEditor');
    let colorVal = colorEditCont['color'].value;
    
    switch (colorEditCont.type.value)
    {
        case 'RGB':
        colorEditCont.code.value = colArr.find(col => col.name == colorVal).rgbVal;
        break;
        case 'RGBA':
        colorEditCont.code.value = colArr.find(col => col.name == colorVal).rgbVal + ',1';
        break;
        case 'HEX':
        colorEditCont.code.value = colArr.find(col => col.name == colorVal).hexVal;
    }
}

function colorCodeChange()
{
    // let colorEditCont = document.getElementById('colorEditor');
    // let codeVal = colorEditCont['code'].value;
    // let colorVal = colorEditCont['color'].value;

    // switch (colorEditCont.type.value)
    // {
    //     case 'RGB':
    //         if (new RegExp(/^[0-255]{1,3}, [0-255]{1,3}, [0-255]{1,3}$/).test(codeVal) == false)
    //         {
    //             codeVal.nextElementSibling.innerText = 'RGB code must mutch the pattern [0-255], [0-255], [0-255]';
    //         }
    //         else
    //         {
    //             codeVal.nextElementSibling.innerText = '';
    //             colorVal.value = colArr.find(col => col.rgbVal == codeVal).name;
    //             document.getElementById('testColView').style.backgroundColor = colorVal;
    //         }
    //         break;
    //     case 'RGBA':
    //         if (new RegExp(/^[0-255]{1,3}, [0-255]{1,3}, [0-255]{1,3}, (1|0?\.\d+)$/).test(codeVal) == false)
    //         {
    //             codeVal.nextElementSibling.innerText = 'RGBA code must mutch the pattern [0-255], [0-255], [0-255], [0-1]';
    //         }
    //         else
    //         {
    //             codeVal.nextElementSibling.innerText = '';
    //             colorVal.value = colArr.find(col => col.rgbVal == codeVal).name;
    //             document.getElementById('testColView').style.backgroundColor = colorVal;
    //         }
    //         break;
    //     case 'HEX':
    //     if (new RegExp(/^#[0-9A-Z]{6}$/).test(codeVal) == false)
    //     {
    //         codeVal.nextElementSibling.innerText = 'HEX code must mutch the pattern #FFFFFF';
    //     }
    //     else
    //     {
    //         codeVal.nextElementSibling.innerText = '';
    //         colorVal.value = colArr.find(col => col.hexVal == codeVal).name;
    //         document.getElementById('testColView').style.backgroundColor = colorVal;
    //     }
    // }
}

function createCol(colName, colType, colCode)
{
    let div = document.createElement('div');
    div.className = 'colorContainer';
    div.style.backgroundColor = colName;
    div.id = colName + '|' + colCode;
    
    let divCont = document.createElement('div');
    divCont.className = 'colorVal';
    divCont.style.backgroundColor = 'rgba(255,255,255,0.5)';
    
    let label = document.createElement('label');
    label.innerText = colName;
    divCont.appendChild(label);
    
    let p = document.createElement('p');
    p.innerText = colType;
    divCont.appendChild(p);
    
    let strong = document.createElement('strong');
    strong.innerText = colCode;
    divCont.appendChild(strong);

    div.appendChild(divCont);

    // let span = document.createElement('button');
    // span.onclick = deleteCol;
    // span.className = 'btnClass';
    // span.innerText = 'Delete';

    let pre = document.createElement('pre');
    pre.addEventListener('click', deleteCol);
    pre.className = 'btnClass';
    pre.innerText = 'Delete';
    pre.id = colName + '|' + colCode;

    div.appendChild(pre);
    
    document.getElementById('colorContainerId').appendChild(div);
}

function colorsForCookie(colName, colType, colCode)
{
    this.colName = colName;
    this.colType = colType;
    this.colCode = colCode;
}

// let date = new Date(Date.now());
// date = new Date(date.setDate(date.getDate() - 1));
// document.cookie = 'colorJSON=;expires=' + date.toUTCString();

let colorCookieArray = [];

function addColor()
{
    event.preventDefault();   
    let colorEditCont = document.getElementById('colorEditor');
    let color = colorEditCont['color'].value;
    let type = colorEditCont['type'].value;
    let code = colorEditCont['code'].value;

    if (color == '' || code == '')
        return;

    let cookieCol = new colorsForCookie(color, type, code);

    colorCookieArray.push(cookieCol);
    
    let str = JSON.stringify(colorCookieArray);
    
    let date = new Date(Date.now());
    date = new Date(date.setDate() + 1);
    document.cookie = `colorJSON=${str};expires=${date.toUTCString()}`;

    createCol(color, type, code);

    colorEditCont['color'].value = '';
    colorEditCont['code'].value = '';
}

function checkColor()
{
    event.preventDefault();
    let cookieJs = document.cookie;
    
    if (cookieJs == '')
        return;
    
    colorCookieArray = JSON.parse(cookieJs.replace('colorJSON=', ''));
    
    colorCookieArray.forEach(color => 
    {
        createCol(color.colName, color.colType, color.colCode);
    });
}
    
function deleteCol()
{
    let col = document.getElementById(event.target.id);

    let colName = col.id.substring(0,col.id.indexOf('|'));
    let codeName = console.log(col.id.substring(col.id.indexOf('|') + 1));

    let arrayElem = colorCookieArray.find(c => (c.colName == colName && c.codeName == codeName));
    
    let index = colorCookieArray.indexOf(arrayElem);
    console.log(index);
    colorCookieArray.splice(index, 1);
    
    col.remove();
    let str = JSON.stringify(colorCookieArray);
    let date = new Date(Date.now());
    date = new Date(date.setDate() + 1);
    document.cookie = `colorJSON=${str};expires=${date.toUTCString()}`;
}
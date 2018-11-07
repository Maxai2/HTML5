let movieArray;
let movieCount;

function filmSearch()
{
    document.getElementById('findFilmsId').style.display = 'none';
    document.getElementById('loaderId').style.display = 'block';
    let requestStr = `http://www.omdbapi.com/?apikey=dbf23902&s=${document.getElementById('movieName').value}&type=${document.getElementById('movieType').value}`;
    
    let request = new XMLHttpRequest();
    request.open('GET', requestStr, true);
    
    request.onreadystatechange = function() 
    {
        if (this.readyState == 4) 
        {
            if (this.status == 200) 
            {
                let movie = JSON.parse(this.responseText);
                
                if (movie.Response == 'False')
                {
                    document.getElementById('notFound').innerText = movie.Error;
                    return;
                }
                else
                    document.getElementById('notFound').innerText = '';
                
                document.getElementById('searchButton').disabled = true;
                movieArray = [];
                clearFilms();
                movieCount = movie.totalResults;
                fillMovieArray(movieCount);
                
                for (let i = 0; i < 3; ++i)
                {
                    filmCreator(movieArray[i].Poster, movieArray[i].Type, movieArray[i].Title, movieArray[i].Year);
                }
                
                numerateButtons(0, true);
                currentPage = 1;
                document.getElementById('movieName').value = '';
                currentPageId = 'firstButton';
                selectedPage(currentPageId);
                document.getElementById('findFilmsId').style.display = 'grid';
                document.getElementById('searchButton').disabled = false;
            }
            else
            {
                console.log('some error: ' + this.statusText);
            }
        }
        document.getElementById('loaderId').style.display = 'none';
    }
    
    request.send();
}

function fillMovieArray(count)
{
    let length = (count % 10 == 0) ? count / 10 : (count / 10) + 1;
    
    for (let i = 1; i < length; ++i)
    {
        let requestStr = `http://www.omdbapi.com/?apikey=dbf23902&s=${document.getElementById('movieName').value}&type=${document.getElementById('movieType').value}&page=${i}`;
        
        let request = new XMLHttpRequest();
        
        request.open('GET', requestStr, false);
        
        request.onreadystatechange = function() 
        {
            if (this.readyState == 4) 
            {
                if (this.status == 200) 
                {
                    let movie = JSON.parse(this.responseText);

                    movie.Search.forEach(film =>
                    {
                        movieArray.push(film);
                    });
                }
                else
                {
                    console.log('some error: ' + this.statusText);
                }
            }
        }
        
        request.send();
    }

}

function numerateButtons(shift, isNext, balance = 0)
{                
    let buttons = document.querySelectorAll('.pageButton button');
    
    for (let i = 1; i < buttons.length - 1; ++i)
    {
        buttons[i].innerText = '';
    }

    if (isNext)
    {
        for (let i = 1; i < buttons.length - 1 - balance; ++i)
        {
            buttons[i].innerText = i + shift;
        }
    }
    else
    {
        for (let i = 1; i < buttons.length - 1; ++i)
        {
            buttons[i].innerText = shift - 7 + i;
        }
    }
}

let lastButtonId = '';

function selectedPage(buttonId)
{
    if (lastButtonId != '')
        document.getElementById(lastButtonId).style.backgroundColor = '#dddddd';
    
    document.getElementById(buttonId).style.backgroundColor = 'gray';
    lastButtonId = buttonId;
    currentPageId = buttonId;
}

function filmCreator(poster, type, name, year)
{
    let film = document.createElement('div');
    film.className = 'filmElement';
    film.id = name;

    let img = document.createElement('img');
    if (poster != 'N/A')
        img.src = poster;
    else
        img.alt = 'No Poster';

    film.appendChild(img);

    let div = document.createElement('div');
    div.className = 'baseDetails';

    let label = document.createElement('label');
    label.innerText = type;
    div.appendChild(label);

    let strong = document.createElement('strong');
    strong.innerText = name;
    div.appendChild(strong);

    let p = document.createElement('p');
    p.innerText = year;
    div.appendChild(p);

    let button = document.createElement('button');
    button.innerText = 'Details';
    button.addEventListener('click', filmDetail);
    button.id = name;
    div.appendChild(button);

    film.appendChild(div);
    document.getElementById('filmArrayId').appendChild(film);
}

let currentId = '';

function filmDetail()
{   
    let filmId = movieArray.find(f => f.Title == event.target.id).imdbID;
    if (currentId == filmId)
    {
        document.getElementById('detailsContainerId').style.display = 'none';
        currentId = '';
        return;
    }
    
    let requestStr = `http://www.omdbapi.com/?apikey=dbf23902&i=${filmId}`;
    
    let request = new XMLHttpRequest();
    request.open('GET', requestStr, true);
    
    request.onreadystatechange = function() 
    {
        if (this.readyState == 4) 
        {
            if (this.status == 200) 
            {
                let film = JSON.parse(this.responseText);
                
                detailsCreator(film);

                document.getElementById('detailsContainerId').style.display = 'block';

                currentId = filmId;
            }
            else
            {
                console.log('some error: ' + this.statusText);
            }
        }
    }

    request.send();
}

function detailsCreator(film)
{
    document.getElementById('idPoster').src = film.Poster;
    document.getElementById('idTitle').innerText = film.Title;
    document.getElementById('idReleased').innerText = film.Released;
    document.getElementById('idGenre').innerText = film.Genre;
    document.getElementById('idCountry').innerText = film.Country;
    document.getElementById('idDirector').innerText = film.Director;
    document.getElementById('idWriter').innerText = film.Writer;
    document.getElementById('idActors').innerText = film.Actors;
    document.getElementById('idAwards').innerText = film.Awards;
}

function previousPage()
{
    if (currentPageId == 'firstButton')
    {
        if (currentPage > 1)
        {
            numerateButtons(Number.parseInt(document.getElementById('firstButton').innerText), false);
            currentPage--;
            selectedPage('sixthButton');
            navigationByPages(currentPage);
        }
    }
    else
    {
        currentPage--;
        selectedPage(document.getElementById(currentPageId).previousElementSibling.id);
        navigationByPages(currentPage);
    }
}

let currentPage;
let currentPageId;

function pageChange()
{
    if (event.target.innerText == '')
        return;

    currentPage = event.target.innerText;

    currentPageId = event.target.id; 
    selectedPage(currentPageId);
    
    navigationByPages(currentPage);
}

function navigationByPages(page)
{    
    clearFilms();

    for (let i = 0 + (3 * (page - 1)); i < 3 + (3 * (page - 1)); ++i)
    {
        filmCreator(movieArray[i].Poster, movieArray[i].Type, movieArray[i].Title, movieArray[i].Year);
    }
}

function nextPage()
{
    if (currentPageId == 'sixthButton')
    {
        let curentPageCount = (Number.parseInt(currentPage) * 3) + (6 * 3);

        if (curentPageCount <= movieCount)
        {
            numerateButtons(Number.parseInt(document.getElementById('firstButton').innerText) + 5, true);
            currentPage++;
            selectedPage('firstButton');
            navigationByPages(currentPage);
        }
        else
        {
            let balance = (curentPageCount - movieCount) / 3;
            
            if (balance != 0)
            {
                numerateButtons(Number.parseInt(document.getElementById('firstButton').innerText) + 5, true, balance);
                selectedPage('firstButton');
                currentPage++;
                navigationByPages(currentPage);
            }
        }
    }
    else
    {
        if (document.getElementById(currentPageId).nextElementSibling.innerText == '')
            return;
        currentPage++;
        selectedPage(document.getElementById(currentPageId).nextElementSibling.id);
        navigationByPages(currentPage);
    }
}

function clearFilms()
{
    let films = document.querySelectorAll('#filmArrayId div');

    films.forEach(film =>
    {
        film.remove();
    });
}

function enterKey()
{
    if (event.keyCode == 13)
        filmSearch();
}
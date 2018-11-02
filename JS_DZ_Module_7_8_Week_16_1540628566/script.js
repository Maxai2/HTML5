function filmSearch()
{
    let requestStr = `http://www.omdbapi.com/?apikey=dbf23902&s=${document.getElementById('movieName').value}&type=${document.getElementById('movieType').value}&r=json`;

    let request = new XMLHttpRequest();
    request.open('GET', requestStr, true);

    request.onreadystatechange = function() 
    {
        if (this.readyState == 4) 
        {
            if (this.status == 200) 
            {
                let movie = JSON.parse(this.responseText);
                
                console.log(movie);

                if (movie.Response == 'False')
                {
                    document.getElementById('notFound').innerText = movie.Error;
                    document.getElementById('findFilmsId').style.display = 'none';
                    return;
                }
                else
                    document.getElementById('notFound').innerText = '';

                document.getElementById('findFilmsId').style.display = 'grid';

                let movieArray = movie.Search;

                for (let i = 0; i < 3; ++i)
                {
                    filmCreator(movieArray[i].Poster, movieArray[i].Type, movieArray[i].Title, movieArray[i].Year);
                }
                // users.forEach(user => 
                // {
                //     console.log(user.name);
                // });
            }
            else
            {
                console.log('some error: ' + this.statusText);
            }
        }
    }

    request.send();
}

function filmCreator(poster, type, name, year)
{
    let film = document.createElement('div');
    film.className = 'filmElement';

    let img = document.createElement('img');
    img.src = poster;
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
    div.appendChild(button);

    film.appendChild(div);
    document.getElementById('filmArrayId').appendChild(film);
}

function filmDetail()
{

}

function enterKey()
{
    if (event.keyCode == 13)
        filmSearch();
}
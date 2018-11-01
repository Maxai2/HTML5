function filmSearch()
{
    let request = new XMLHttpRequest();
    request.open('GET', `http://www.omdbapi.com/?apikey=dbf23902&s=${document.getElementById('movieName').value}&type=${document.getElementById('movieType').value}&r=json`, true);

    request.onreadystatechange = function() 
    {
        if (this.readyState == 4) 
        {
            if (this.status == 200) 
            {
                let movie = JSON.parse(this.responseText);

                console.log(movie);

                if (movie.Error == "Movie not found!")
                {
                    document.getElementById('notFound').innerText = movie.Error;
                    return;
                }
                else
                    document.getElementById('notFound').innerText = '';

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
$('#nowId').click(function()
{
    $(this).css('border-bottom', '2px solid #f05514');
    $('#for5DaysId').css('border-bottom', '0');
});

$('#for5DaysId').click(function()
{
    $(this).css('border-bottom', '2px solid #f05514');
    $('#nowId').css('border-bottom', '0');
});

let lastOpenPageId;
let weatherByCity;

let findWeather = () =>
{
    $('#nowWeatherId').hide();
    $('#errorPageId').hide();
    $('#for5DaysPageId').hide();
    
    $.ajax
    ({
        url: `http://api.openweathermap.org/data/2.5/weather?q=${$('#cityName').val()}&units=metric&appid=f284eac603d628bfb6d7570e53c1567c`,

        success: (result, status, xhr) =>
        {
            weatherByCity = result;
            currentWeather(weatherByCity);
            nearbyPlaces(weatherByCity.coord.lat, weatherByCity.coord.lon, weatherByCity.name);
            $('#nowWeatherId').show();
        },
        
        error: (result, status, xhr) => 
        {
            $('#errorPageId').empty();

            $('#errorPageId').append($('<img>').attr('src', 'https://vortex.accuweather.com/adc2010/images/slate/error.png'));
            $('#errorPageId').append($('<label></label>').text(`${$('#cityName').val()} could not be found. Please enter a different location.`));
            
            $('#errorPageId').show();
        }
    })
}

let picWeather = {
    '01d': '01.svg',
    '01n': '33.svg',
    '02d': '03.svg',
    '02n': '35.svg',
    '03d': '07.svg',
    '03n': '07.svg',
    '04d': '08.svg',
    '04n': '08.svg',
    '09d': '18.svg',
    '09n': '18.svg',
    '10d': '13.svg',
    '10n': '40.svg',
    '11d': '15.svg',
    '11n': '15.svg',
    '13d': '22.svg',
    '13n': '22.svg',
    '50d': '11.svg',
    '50n': '11.svg'
};

function nearbyPlaces(lat, lon, city)
{
    $('#nearbyPlacesId').empty();

    $.ajax
    ({    
        url: `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=10&units=metric&appid=f284eac603d628bfb6d7570e53c1567c`,
        
        success: (result, status, xhr) =>
        {

            let h3 = $('<h3></h3>').text(`${city} Weather Conditions - Nearby Places`);
            $('#nearbyPlacesId').append(h3);

            let div = $('<div></div>').addClass('nearbyWeatherCl');

            result.list.forEach(weath =>
            {
                let weathDiv = $('<div></div>').addClass('cityCl');

                let label = $('<label></label>').addClass('cityNameCl').text(weath.name);
                weathDiv.append(label);

                let img = $('<img>').addClass('degreeImgCl').attr('src', `https://vortex.accuweather.com/adc2010/images/slate/icons/${picWeather[weath.weather[0].icon]}`);
                weathDiv.append(img);

                let span = $('<span></span>').addClass('degreeCl').html(`${Number.parseInt(weath.main.temp)}&#186;`);
                weathDiv.append(span);

                div.append(weathDiv);
            })


            $('#nearbyPlacesId').append(div);
        }
    });
}


function currentWeather(res)
{
    $('#nowId').text(`Now ${secToTime(res.dt)}`);
    $('#nowId').css('border-bottom', '2px solid #f05514');

    $('#currentWeatherId').empty();

    let div = $('<div></div>').addClass('mainContentCl');

    let divLeft = $('<div></div>').addClass('leftSide');

    let labelCW = $('<label></label>').addClass('mainHeader').text('Current Weather');
    divLeft.append(labelCW);

    let imgL = $('<img>').attr('src', `https://vortex.accuweather.com/adc2010/images/slate/icons/${picWeather[res.weather[0].icon]}`);
    divLeft.append(imgL);

    let labelDeg = $('<label></label>').addClass('degreeCl').html(`${Number.parseInt(res.main.temp)}&#186;`);
    let spanLab = $('<span></span>').addClass('celciusCl').text('C');
    labelDeg.append(spanLab);
    divLeft.append(labelDeg);

    let span = $('<span></span>').addClass('realFeelCl').html(`RealFeel&reg; ${Number.parseInt(res.main.temp) - 5}&#186;`);
    divLeft.append(span);

    let labelState = $('<label></label>').addClass('weatherState').text(res.weather[0].main);
    divLeft.append(labelState);

    div.append(divLeft);

    let divRight = $('<div></div>').addClass('rightSide');
    
    let vertLine = $('<div></div>').addClass('verticalLine');
    divRight.append(vertLine);
    
    let sunSet = $('<div></div>').addClass('sunsetSunriseCl');

    let labelRight = $('<label></label>').addClass('mainHeader').text('Sunrise/sunset');
    sunSet.append(labelRight);

    sunSet.append($('<br><br>'));
    
    let spanRise = $('<span></span>').addClass('captionCl').text('Sunrise:');
    spanRise.append($('<span></span>').addClass('valueCl').text(secToTime(res.sys.sunrise)));
    sunSet.append(spanRise);

    sunSet.append($('<br>'));

    let spanSet = $('<span></span>').addClass('captionCl').text('Sunset:');
    spanSet.append($('<span></span>').addClass('valueCl').text(secToTime(res.sys.sunset)));
    sunSet.append(spanSet);
    
    sunSet.append($('<br><br>'));

    let duration = secToTime(res.sys.sunset - res.sys.sunrise).replace(/\sam|pm/, '');

    let spanDur = $('<span></span>').addClass('captionCl').text('Duration:');
    spanDur.append($('<span></span>').addClass('valueCl').text(duration + ' hr'));
    sunSet.append(spanDur);

    divRight.append(sunSet);
    
    let imgR = $('<img>').attr('src', 'https://vortex.accuweather.com/adc2010/images/slate/icons/01.svg');
    divRight.append(imgR);

    div.append(divRight);

    $('#currentWeatherId').append(div);

    let seeHourlyDiv = $('<div></div>').addClass('seeHourlyCl');

    let seeHourTextDiv = $('<div></div>').addClass('seeHourCl').text('See Hourly');
    seeHourlyDiv.append(seeHourTextDiv);

    let arrow = $('<div></div>').addClass('arrow');
    seeHourlyDiv.append(arrow);

    $('#currentWeatherId').append(seeHourlyDiv);
}

function secToTime(sec)
{
    sec -= (Number.parseInt(sec / 86400) * 86400);
    let hour = Number.parseInt(sec / 3600);
    sec -= (hour * 3600);
    let min = Number.parseInt(sec / 60);

    let index;
    
    if (hour <= 12)
    index = ' am';
    else
    {    
        index = ' pm';
        hour -= 12;
    }
    
    hour += 4; // GT+4
    let timeStr = hour + ':' + (min < 10 ? ('0' + min) : min) + index;

    return timeStr;
}

function enterKey()
{
    if (event.keyCode == 13)
        findWeather();
}
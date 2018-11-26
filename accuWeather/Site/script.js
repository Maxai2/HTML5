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
    let cityName = $('#cityName').val();

    if (cityName == '')
        return;

    $('#nowWeatherId').hide();
    $('#errorPageId').hide();
    $('#for5DaysPageId').hide();
    
    $.ajax
    ({
        url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=f284eac603d628bfb6d7570e53c1567c`,

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
            $('#errorPageId').append($('<label></label>').text(`${cityName} could not be found. Please enter a different location.`));
            
            $('#errorPageId').show();
        }
    });
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

                let span = $('<span></span>').addClass('degreeCl').html(`${Math.round(weath.main.temp)}&#186;`);
                weathDiv.append(span);

                div.append(weathDiv);
            })

            $('#nearbyPlacesId').append(div);
        }
    });
}


function currentWeather(res)
{
    $('#nowId').text(`Now ${secToTime(res.dt, false)}`);
    $('#nowId').css('border-bottom', '2px solid #f05514');

    $('#currentWeatherId').empty();

    let div = $('<div></div>').addClass('mainContentCl');

    let divLeft = $('<div></div>').addClass('leftSide');

    let labelCW = $('<label></label>').addClass('mainHeader').text('Current Weather');
    divLeft.append(labelCW);

    let imgL = $('<img>').attr('src', `https://vortex.accuweather.com/adc2010/images/slate/icons/${picWeather[res.weather[0].icon]}`);
    divLeft.append(imgL);

    let labelDeg = $('<label></label>').addClass('degreeCl').html(`${Math.round(res.main.temp)}&#186;`);
    let spanLab = $('<span></span>').addClass('celciusCl').text('C');
    labelDeg.append(spanLab);
    divLeft.append(labelDeg);

    let tempInF = (res.main.temp * 9 / 5) + 32;
    let temp = res.main.temp;
    let dewPoint = Math.pow((res.main.humidity / 100), 1/8) * (112 + (0.9 * temp)) + (0.1 * temp) - 112;
    let realFeelTempC = (5.0 / 9.0) * (Math.round(realFeelCalc(res.wind.speed, res.main.pressure, tempInF, 0, dewPoint, 0)) - 32);

    let span = $('<span></span>').addClass('realFeelCl').html(`RealFeel&reg; ${Math.round(realFeelTempC)}&#186;`);
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
    spanRise.append($('<span></span>').addClass('valueCl').text(secToTime(res.sys.sunrise, false)));
    sunSet.append(spanRise);

    sunSet.append($('<br>'));

    let spanSet = $('<span></span>').addClass('captionCl').text('Sunset:');
    spanSet.append($('<span></span>').addClass('valueCl').text(secToTime(res.sys.sunset, false)));
    sunSet.append(spanSet);
    
    sunSet.append($('<br><br>'));

    let duration = secToTime(res.sys.sunset - res.sys.sunrise, true).replace(/\sam|pm/, '');

    let spanDur = $('<span></span>').addClass('captionCl').text('Duration:');
    spanDur.append($('<span></span>').addClass('valueCl').text(duration + ' hr'));
    sunSet.append(spanDur);

    divRight.append(sunSet);
    
    let imgR = $('<img>').attr('src', 'https://vortex.accuweather.com/adc2010/images/slate/icons/01.svg');
    divRight.append(imgR);

    div.append(divRight);

    $('#currentWeatherId').append(div);

    let seeHourlyDiv = $('<div></div>').addClass('seeHourlyCl').click(for5DaysPageShow);

    let seeHourTextDiv = $('<div></div>').addClass('seeHourCl').text('See Hourly');
    seeHourlyDiv.append(seeHourTextDiv);

    let arrow = $('<div></div>').addClass('arrow');
    seeHourlyDiv.append(arrow);

    $('#currentWeatherId').append(seeHourlyDiv);
}

let monthByNum = {
    '01': 'JAN',
    '02': 'FEB',
    '03': 'MAR',
    '04': 'APR',
    '05': 'MAY',
    '06': 'JUN',
    '07': 'JUL',
    '08': 'AUG',
    '09': 'SEP',
    '10': 'OKT',
    '11': 'NOV',
    '12': 'DEC'
};

function for5DaysPageShow()
{
    let cityName = $('#cityName').val();
    if (cityName == '')
    {
        return;
    }

    $.ajax
    ({
        url: `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=f284eac603d628bfb6d7570e53c1567c`,

        success: (result, status, xhr) =>
        {
            $('#for5DaysPageId').empty();

            let fiveDays = result;
            list = fiveDays.list;
            let dateAndTime = fiveDays.list[0].dt_txt;
            todayDate = dateAndTime;

            $('#nowWeatherId').hide();
            
            let divFor5Days = $('<div></div>').addClass('for5DaysCl');
        
            let divToday = $('<div></div>').addClass('todayCl').attr('id', `${dateAndTime}`);
            divToday.click(createTableByDay);
            divToday.append($('<label></label>').addClass('mainHeader').text('Tonight'));
            divToday.append($('<span></span>').addClass('dayCl').text(`${monthByNum[dateAndTime.substring(5, 7)]} ${dateAndTime.substring(8, 11)}`));
            divToday.append($('<img>').attr('src', `https://vortex.accuweather.com/adc2010/images/slate/icons/${picWeather[fiveDays.list[0].weather[0].icon]}`));
            let degreeTodayShowDiv = $('<div></div>').addClass('degreeTodayShowCl');
            let mmD = minMaxDegree(fiveDays.list, true, dateAndTime.substring(8, 11));
            degreeTodayShowDiv.append($('<label></label>').addClass('degreeValCl').html(`${mmD.maxTempL}&#186;`));
            degreeTodayShowDiv.append($('<label></label>').addClass('degreeCl').text('C'));
            degreeTodayShowDiv.append($('<span></span>').html(`${mmD.minTempL}&#186;`));
            divToday.append(degreeTodayShowDiv);
            divToday.append($('<label></label>').text(weatherDesc(dateAndTime.substring(8, 11), fiveDays.list)));
            divFor5Days.append(divToday);

            for (let i = 0; i < 4; i++)
            {
                let d = new Date();
                d.setDate(d.getDate() + i + 1);
                let tempDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} `;
                let divNextDayWeath = $('<div></div>').addClass('todayCl').addClass(weathCl[i]).attr('id', tempDate).css('cursor', 'default');
                
                divNextDayWeath.append($('<label></label>').addClass('mainHeader').text(weekDayByDate[d.getDay()]));
                divNextDayWeath.append($('<span></span>').addClass('dayCl').text(`${monthByNum[d.getMonth() + 1]} ${d.getDate()}`));

                for (let i = 0; i < fiveDays.list.length; i++)
                {
                    if ((fiveDays.list[i].dt_txt.substring(8, 11) == d.getDate()) && (fiveDays.list[i].dt_txt.substring(11, 13) == '12'))
                    {
                        divNextDayWeath.append($('<img>').addClass('imgCustom').attr('src', `https://vortex.accuweather.com/adc2010/images/slate/icons/${picWeather[fiveDays.list[i].weather[0].icon]}`));
                    }
                }

                let minMaxTempDiv = $('<div></div>').addClass('degreeTodayShowCusomCl');

                let minMaxT = minMaxDegree(fiveDays.list, false, d.getDate());
                minMaxTempDiv.append($('<label></label>').addClass('degreeValCl').html(`${minMaxT.maxTempL}&#186;`));
                minMaxTempDiv.append($('<label></label>').addClass('degreeCl').html(`/${minMaxT.minTempL}&#186;`));
                divNextDayWeath.append(minMaxTempDiv);

                divNextDayWeath.append($('<label></label>').addClass('weatherDescCl').text(weatherDesc(d.getDate(), fiveDays.list)));

                divNextDayWeath.append($('<label></label>').addClass('MoreCl').text('More').click(createTableByDay).attr('id', `${tempDate}`)).hover(function () { 
                    $(this).css('color', 'black');
                });
                
                divFor5Days.append(divNextDayWeath);
            }
            
            $('#for5DaysPageId').append(divFor5Days);

            createTableByDay();

            $('#for5DaysPageId').show();
        },
        
        error: (result, status, xhr) => 
        {
            alert(xhr);
        }
    });
}

let weekDayByDateFull = {
    '1': 'Monday',
    '2': 'Tuesday',
    '3': 'Wendsday',
    '4': 'Thursday',
    '5': 'Friday',
    '6': 'Saturday',
    '0': 'Sunday'
};

let list;
let todayDate;
let lastIndex = '';

function createTableByDay()
{
    $('#hourlyDivId').remove();
    let day = event.currentTarget.id;
    
    if (lastIndex != '')
        $(`#${lastIndex}`).css({
            'background-color': '#f7f6f2',
            'border-bottom': '0'
        });

    $(`#${day}`).css({
        'background-color': '#fff',
        'border-bottom': '4px solid #f05514'
    });

    lastIndex = day;
    console.log(lastIndex);

    if (day == undefined)
        day = todayDate;
    
    let todayFullDate = new Date(day);

    let hourlyDiv = $('<div></div>').addClass('hourlyCl').attr('id', 'hourlyDivId');
    hourlyDiv.append($('<div></div>').addClass('hourHeaderCl').append($('<label></label>').text('Hourly')));

    let hourlyTableDiv = $('<div></div>').addClass('hourlyTableCl');

    let hourlyTable = $('<table></table>');

    let tHead = $('<thead></thead>');

    let trHead = $('<tr></tr>');

    trHead.append($('<th></th>').addClass('mainHeader').text(weekDayByDateFull[todayFullDate.getDay()]));

    for (let j = 0; j < list.length; j++)
    {
        if (list[j].dt_txt.substring(8, 11) == day.substring(8, 11))
        {
            for (let i = j; i < j + 8; i++)
            {
                let td = $('<td></td>');
                td.append($('<span></span>').text(timeIn12Format(list[i].dt_txt.substring(11, 13))));
                td.append($('<img>').attr('src', `https://vortex.accuweather.com/adc2010/images/slate/icons/${picWeather[list[i].weather[0].icon]}`));

                trHead.append(td);
            }
            break;
        }
    }
    tHead.append(trHead);

    hourlyTable.append(tHead);
    
    let tBody = $('<tbody></tbody>');

    let trForecast = $('<tr></tr>');
    trForecast.append($('<th></th>').text('Forecast'));

    for (let j = 0; j < list.length; j++)
    {
        if (list[j].dt_txt.substring(8, 11) == day.substring(8, 11))
        {
            for (let i = j; i < j + 8; i++)
            {
                trForecast.append($('<td></td>').append($('<span></span>').text(list[i].weather[0].main)));
            }
            break;
        }
    }
    tBody.append(trForecast);

    let trTemp = $('<tr></tr>');
    trTemp.append($('<th></th>').html('Temp (&#186;C)'));

    for (let j = 0; j < list.length; j++)
    {
        if (list[j].dt_txt.substring(8, 11) == day.substring(8, 11))
        {
            for (let i = j; i < j + 8; i++)
            {
                trTemp.append($('<td></td>').append($('<span></span>').html(Math.round(list[i].main.temp) + '&#186;')));
            }
            break;
        }
    }
    tBody.append(trTemp);

    let trRealFeel = $('<tr></tr>');
    trRealFeel.append($('<th></th>').html('RealFeel&reg;'));

    for (let j = 0; j < list.length; j++)
    {
        if (list[j].dt_txt.substring(8, 11) == day.substring(8, 11))
        {
            for (let i = j; i < j + 8; i++)
            {
                let w = list[i];

                let tempInF = (w.main.temp * 9 / 5) + 32;
                let temp = w.main.temp;
                let dewPoint = Math.pow((w.main.humidity / 100), 1/8) * (112 + (0.9 * temp)) + (0.1 * temp) - 112;
                let realFeelTempC = (5.0 / 9.0) * (Math.round(realFeelCalc(w.wind.speed, w.main.pressure, tempInF, 0, dewPoint, 0)) - 32);

                trRealFeel.append($('<td></td>').append($('<span></span>').html(Math.round(realFeelTempC) + '&#186;')));
            }
            break;
        }
    }
    tBody.append(trRealFeel);

    let trWind = $('<tr></tr>');
    trWind.append($('<th></th>').text('Wind (km/h)'));

    for (let j = 0; j < list.length; j++)
    {
        if (list[j].dt_txt.substring(8, 11) == day.substring(8, 11))
        {
            for (let i = j; i < j + 8; i++)
            {
                trWind.append($('<td></td>').append($('<span></span>').text(Math.round(list[i].wind.speed) + ' ' + SideOfTheWorldByDegree(list[i].wind.deg))));
            }
            break;
        }
    }
    tBody.append(trWind);

    hourlyTable.append(tBody);

    hourlyTableDiv.append(hourlyTable);
    hourlyDiv.append(hourlyTableDiv);

    $('#for5DaysPageId').append(hourlyDiv);
}

function SideOfTheWorldByDegree(degree)
{
    if (degree == 0)
        return 'N';
    else
    if (degree <= 22.5)
        return 'NNE';
    else
    if (degree <= 45)
        return 'NE';
    else
    if (degree <= 67.5)
        return 'ENE';
    else
    if (degree <= 90)
        return 'E';
    else
    if (degree <= 122.5)
        return 'ESE';
    else
    if (degree <= 135)
        return 'SE';
    else
    if (degree <= 157.5)
        return 'SSE';
    else
    if (degree <= 180)
        return 'S';
    else
    if (degree <= 202.5)
        return 'SSW';
    else
    if (degree <= 225)
        return 'SW';
    else
    if (degree <= 247.5)
        return 'WSW';
    else
    if (degree <= 270)
        return 'W';
    else
    if (degree <= 292.5)
        return 'WNW';
    else
    if (degree <= 315)
        return 'NW';
    else
    if (degree <= 337.5)
        return 'NNW';
    else
    if (degree <= 360)
        return 'N';
}

function timeIn12Format(time24)
{
    if (time24 < 12)
    {
        if (time24 == 0)
            return '12am';
        else
            return time24.substring(1) + 'am';
    }
    else
    {
        if (time24 == 12)
            return '12pm';
        else
            return (time24 - 12) + 'pm';
    }
}

let weekDayByDate = {
    '1': 'MON',
    '2': 'TUE',
    '3': 'WEN',
    '4': 'THU',
    '5': 'FRI',
    '6': 'SAT',
    '0': 'SUN'
};

let weathCl = ['FirstWeathCl', 'SecondWeathCl', 'ThirdWeathCl', 'FourthWeathCl'];

function weatherDesc(day, list)
{
    let weathDesc = '';

    list.forEach(d =>
    {
        if (day == d.dt_txt.substring(8, 11))
        {
            if (!weathDesc.includes(d.weather[0].description))
                weathDesc += d.weather[0].description + '; ';
        }
    });

    return weathDesc.substring(0, weathDesc.length - 1);
}

function minMaxDegree(weathers, isOneDay, todayDay)
{
    let minTemp = Math.round(weathers[0].main.temp_min);
    let maxTemp = Math.round(weathers[0].main.temp_max);

    if (isOneDay)
    {
        let index = 0;

        while (true)
        {
            if (minTemp > Math.round(weathers[index].main.temp_min))
                minTemp = Math.round(weathers[index].main.temp_min);
            
            if (maxTemp < Math.round(weathers[index].main.temp_max))
                maxTemp = Math.round(weathers[index].main.temp_max);

            if (weathers[index].dt_txt.substring(8, 11) != todayDay)
                break;
            else
                index++;
        }
    }
    else
    {
        weathers.forEach(w =>
        {
            if (w.dt_txt.substring(8, 11) == todayDay)
            {
                if (minTemp > Math.round(w.main.temp_min))
                minTemp = Math.round(w.main.temp_min);
                
                if (maxTemp < Math.round(w.main.temp_max))
                maxTemp = Math.round(w.main.temp_max);
            }
        });
    }

    return {
        minTempL: minTemp,
        maxTempL: maxTemp
    };
}

function secToTime(sec, isCalc)
{
    sec -= (Number.parseInt(sec / 86400) * 86400);
    let hour = Number.parseInt(sec / 3600);
    sec -= (hour * 3600);
    let min = Number.parseInt(sec / 60);

    let index = '';
    
    if (isCalc == false)
    {
        hour += 4; // GT+4
        
        if (hour < 12)
        {
            if (hour == 0)
                hour = 12;

            index = ' am';
        }
        else
        {    
            if (hour == 12)
                hour = 12;
            else
                hour -= 12;

            index = ' pm';
        }
    }
    
    let timeStr = hour + ':' + (min < 10 ? ('0' + min) : min) + index;

    return timeStr;
}

function realFeelCalc(windSpeed, pressure, FTemperature, UltraViolet, dew, preciptation)
{
    let Wa;

	if (windSpeed < 4)
		Wa = windSpeed / 2 + 2;
    else
    if (windSpeed < 56)
		Wa = windSpeed;
	else
		Wa=56;
	
	let WSP2 = (80 - FTemperature) * (0.566 + 0.25 * Math.sqrt(Wa) - 0.0166 * Wa) * ((Math.sqrt(pressure / 10)) / 10);
	let WSP1 = Math.sqrt(windSpeed) * ((Math.sqrt(pressure / 10)) / 10);
	
	let SI2 = UltraViolet; //# UV index is already in hectoJoules/m^2 ?
    
    let Da;
    
	if (dew >= (55 + Math.sqrt(windSpeed)))
		Da = dew;
	else
		Da = 55 + Math.sqrt(windSpeed);
	
	let H2 = (Da - 55 - Math.sqrt(windSpeed))**2/30;
    
    let MFT;
    
	if (FTemperature >= 65)
		MFT = 80 - WSP2 + H2 + SI2 - preciptation;
	else
        MFT = FTemperature - WSP1 + SI2 + H2 - preciptation; // 
        
	return MFT;
}

function enterKey()
{
    if (event.keyCode == 13)
        findWeather();
}

function cityFind()
{
    $('#cityName').val()
}

function findCity(sym)
{
    for (let i = 0; i < city_names.length; i++)
    {
        for (let j = 0; j < city_names[i].length; j++)
        {

        }
    }
}

var city_names = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];

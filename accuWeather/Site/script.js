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
    $.ajax
    ({
        url: `http://api.openweathermap.org/data/2.5/weather?q=${$('#cityName').val()}&appid=f284eac603d628bfb6d7570e53c1567c`,

        success: (result, status, xhr) =>
        {
            weatherByCity = result;
            currentWeather(weatherByCity);
            // console.log(status);
            // console.log(xhr);
        },

        error: (result, status, xhr) => 
        {
            console.log(result);
            console.log(status);
            console.log(xhr.stat);
        }
    })
}

let picWeather = [];

picWeather.push(
    {key: '01d', value: '01.svg'},
    {key: '01n', value: '33.svg'},
    {key: '02d', value: '03.svg'},
    {key: '02n', value: '35.svg'},
    {key: '03d', value: '07.svg'},
    {key: '03n', value: '07.svg'},
    {key: '04d', value: '08.svg'},
    {key: '04n', value: '08.svg'},
    {key: '09d', value: '18.svg'},
    {key: '09n', value: '18.svg'},
    {key: '10d', value: '13.svg'},
    {key: '10n', value: '40.svg'},
    {key: '11d', value: '15.svg'},
    {key: '11n', value: '15.svg'},
    {key: '13d', value: '22.svg'},
    {key: '13n', value: '22.svg'},
    {key: '50d', value: '11.svg'},
    {key: '50n', value: '11.svg'}
);

function currentWeather(res)
{
    console.log(res.weather[0].icon);

    

    $()
}

function enterKey()
{
    if (event.keyCode == 13)
        findWeather();
}
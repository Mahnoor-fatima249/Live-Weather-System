const url = 'https://api.openweathermap.org/data/2.5/weather';
const apikey = '7ccaee86d4d787a41defea4cecc2e4ac';

$(document).ready(function () {
    // Alert se bachne ke liye default city load karo
    weatherFn('Lahore'); 
});

async function weatherFn(cName) {
    // Agar user ne search box khali chora ho tab alert do
    if (!cName) {
        alert("Please Enter a City Name! 😊");
        return;
    }

    const tempUrl = `${url}?q=${cName}&appid=${apikey}&units=metric`;

    try {
        const res = await fetch(tempUrl);
        const data = await res.json();

        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again. ❌');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(`${data.name}, ${data.sys.country}`);
    $('#date').text(moment().format("MMM Do YYYY, h:mm:ss a"));
    
    // Math.round use karo taake temperature points mein na aaye (e.g. 25 instead of 25.44)
    $('#temperature').html(`${Math.round(data.main.temp)}°C`);
    
    $('#description').text(data.weather[0].description.toUpperCase());
    $('#wind-speed').text(`Wind Speed: ${data.wind.speed} m/s`);

    const icon = data.weather[0].icon;
    $('#weather-icon').attr('src', `https://openweathermap.org/img/wn/${icon}@2x.png`).show();

    $('#weather-info').fadeIn().addClass('animate__animated animate__fadeIn');
}

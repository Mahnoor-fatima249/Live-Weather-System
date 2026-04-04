const url = 'https://api.openweathermap.org/data/2.5/weather';
const apikey = '7ccaee86d4d787a41defea4cecc2e4ac'; // Check if this is active

$(document).ready(function () {
    // Default load
    weatherFn('Lahore'); 

    $('#city-input-btn').on('click', function () {
        let cityName = $('#city-input').val();
        weatherFn(cityName);
    });

    $('#city-input').on('keypress', function (e) {
        if (e.which == 13) weatherFn($(this).val());
    });
});

async function weatherFn(cName) {
    // Spelling aur spaces ko theek karne ke liye trim aur lowercase
    let city = cName.trim().toLowerCase(); 
    
    if (!city) return;

    const queryUrl = `${url}?q=${city}&appid=${apikey}&units=metric`;

    try {
        const response = await fetch(queryUrl);
        const data = await response.json();

        if (response.ok) {
            updateUI(data);
        } else {
            console.log("City not found");
            alert("Shehar ka naam sahi likhein! 😊");
        }
    } catch (error) {
        console.error("Network Error:", error);
    }
}

function updateUI(data) {
    // Ye names tumhare HTML ki IDs se match karne chahiye
    $('#city-name').text(data.name);
    $('#temperature').text(Math.round(data.main.temp) + "°");
    $('#description').text(data.weather[0].description);
    $('#wind-speed').text(data.wind.speed + " m/s");
    $('#date').text(moment().format('LL'));
    
    const iconCode = data.weather[0].icon;
    $('#weather-icon').attr('src', `https://openweathermap.org/img/wn/${iconCode}@4x.png`);
    
    // Show the card
    $('#weather-info').fadeIn();
}

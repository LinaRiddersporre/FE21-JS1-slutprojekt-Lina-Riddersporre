const key = 'cd9c64a6a3f44627ae7ee9891dfd8605';
const searchButton = document.getElementById('searchButton');
const cityName = document.getElementById('nameOfCity');
const fiveDaySearch = document.getElementById('fiveDaySearch');

fiveDaySearch.addEventListener('click', function(){
    deleteItems();
    getWeatherForcast(cityName.value, key);
    
})


function getWeatherForcast(cityName, key){
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${key}&lang=sv`;
    fetch(url).then(
        function(response){
            console.log('response Forcast:', response);
            return response.json();
        }
    ).then(
        function(data){
            console.log('Data:', data);
            for(let i = 1; i<6; i++){
                const weatherData = data.data[i];
                displayWeatherForcast(weatherData.weather.icon, weatherData.valid_date, weatherData.weather.description, weatherData.temp);
            }
        }
    ).catch(
        function (error){
            console.log(error);
            alert('Staden hittades inte, försök gärna igen.')
        }
    )
}




searchButton.addEventListener('click', function(event){
    deleteItems();
    getCurrentWeather(cityName.value, key);
    console.log(cityName.value)
    
    event.preventDefault();
})


function getCurrentWeather(cityName, key){
    const url = `https://api.weatherbit.io/v2.0/current?count=5&city=${cityName}&key=${key}&lang=sv`;
    fetch(url).then(
        function(response){
            console.log('response:', response);
            return response.json();
        }
    ).then(
        function(data){
            console.log('Data:', data);
            const weatherData = data.data[0];

            displayCurrentWeather(weatherData.weather.icon, weatherData.weather.description, weatherData.temp, weatherData.rh, weatherData.wind_spd);
        }
    ).catch(
        function (error){
            console.log(error);
            
            alert('Staden hittades inte, försök gärna igen.');
            
        }
    )
}

function displayCurrentWeather(_icon, _description, _temp, _rh, _wind){

    const informationDiv = document.getElementById('informationDiv');
    let weatherIcon = document.createElement('img');
    informationDiv.appendChild(weatherIcon);
    weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${_icon}.png`;
    console.log(weatherIcon);


    let description = document.createElement('p');
    informationDiv.appendChild(description);
    description.innerText='Beskrivning: '+ _description;
    console.log(_description);

    let temp = document.createElement('p');
    informationDiv.appendChild(temp);
    temp.innerText='Temp: '+ _temp +'°C';
    if(_temp <= 0){
        document.body.style.backgroundColor = 'blue';
    } else if(_temp < 5){
        document.body.style.backgroundColor = 'red';
    }
    console.log(_temp);

    let humidity = document.createElement('p');
    informationDiv.appendChild(humidity);
    humidity.innerText='Luftfuktighet: '+ _rh;
    console.log(_rh);

    let wind = document.createElement('p');
    informationDiv.appendChild(wind);
    wind.innerText='Vindhastighet: '+ _wind+'m/s';
    console.log(_wind);
}

function displayWeatherForcast(_icon, _currentDate, _description, _temp){

    const informationDiv = document.getElementById('informationDiv');
    let weatherIcon = document.createElement('img');
    informationDiv.appendChild(weatherIcon);
    weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${_icon}.png`;
    console.log(weatherIcon);

    let currentDate = document.createElement('p');
    informationDiv.appendChild(currentDate);
    currentDate.innerText='Datum: '+ _currentDate;
    console.log(_currentDate);

    let description = document.createElement('p');
    informationDiv.appendChild(description);
    description.innerText='Beskrivning: '+ _description;
    console.log(_description);

    let temp = document.createElement('p');
    informationDiv.appendChild(temp);
    temp.innerText='Temp: '+ _temp +'°C';
    console.log(_temp);

}

function deleteItems(){
    const allElements = document.querySelectorAll('p');
    const allImgElements = document.querySelectorAll('img');
    for(let i = 0; i<allElements.length; i++){
        const pElement = allElements[i];
        console.log('element: ', pElement);
        pElement.remove();
    }
    for(let i = 0; i<allImgElements.length; i++){
        const imgElement = allImgElements[i];
        console.log('elementImg: ', imgElement);
        imgElement.remove();
    }
    
}

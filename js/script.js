const key = 'cd9c64a6a3f44627ae7ee9891dfd8605';
const searchButton = $('#searchButton')[0];
const cityName = $('#nameOfCity')[0];
const fiveDaySearch = $('#fiveDaySearch')[0];
const animationDivDiv = $('#animationDivDiv');
animationDivDiv.style.display = 'none';

let animation = anime({
    targets: '#animationDivDiv',
    translateX: 270,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine'
  });

fiveDaySearch.addEventListener('click', function(){
    deleteItems();
    getWeatherForcast(cityName.value, key);
    animation.style.display = "inline-block";
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
            alert('Staden hittades inte, försök gärna igen.');
            animation.style.display = 'none';
        }
    )
}

searchButton.addEventListener('click', function(event){
    deleteItems();
    getCurrentWeather(cityName.value, key);
    console.log(cityName.value)
    animation.style.display = "inline-block";
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
            animation.style.display = 'none';
        }
    )
}

function displayCurrentWeather(_icon, _description, _temp, _rh, _wind){
    const informationDiv = $('#informationDiv')[0];
    informationDiv.style.padding = '1rem';
    informationDiv.style.border = 'solid 3px white';

    let weatherIcon = document.createElement('img');
    informationDiv.appendChild(weatherIcon);
    weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${_icon}.png`;
    console.log(weatherIcon);
    weatherIcon.classList.add("weatherIcon");


    let description = document.createElement('p');
    informationDiv.appendChild(description);
    description.innerText= _description;
    console.log(_description);

    let temp = document.createElement('p');
    informationDiv.appendChild(temp);
    temp.innerText= 'Temp: '+ _temp +'°C';
    if(_temp <= 5){
        $("#informationDiv")[0].style.backgroundColor = "lightskyblue";
    } else if(_temp <= 15){
        $("#informationDiv")[0].style.backgroundColor = "orange";
    } else if(_temp > 15){
        $("#informationDiv")[0].style.backgroundColor = "red";
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

    const informationDiv = $('#informationDiv')[0];
    informationDiv.style.padding = '0rem';
    informationDiv.style.border = 'none';
    
    let backGroundDiv = document.createElement('div');
    backGroundDiv.className = 'forecastDiv';
    informationDiv.appendChild(backGroundDiv);
    backGroundDiv.style.padding = '1rem';
    backGroundDiv.style.border = 'solid 3px white';
    informationDiv.style.backgroundColor = 'lightblue';
    let weatherIcon = document.createElement('img');
    backGroundDiv.appendChild(weatherIcon);
    weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${_icon}.png`;
    console.log(weatherIcon);
    weatherIcon.classList.add("weatherIcon");

    let currentDate = document.createElement('p');
    backGroundDiv.appendChild(currentDate);
    currentDate.innerText= _currentDate;
    console.log(_currentDate);

    let description = document.createElement('p');
    backGroundDiv.appendChild(description);
    description.innerText= _description;
    console.log(_description);

    let temp = document.createElement('p');
    backGroundDiv.appendChild(temp);
    temp.innerText='Temp: '+ _temp +'°C';
    if(_temp <= 5){
        backGroundDiv.style.backgroundColor = "lightskyblue";
    } else if(_temp <= 15){
        backGroundDiv.style.backgroundColor = "orange";
    } else if(_temp > 15){
        backGroundDiv.style.backgroundColor = "red";
    }
    console.log(_temp);

}

function deleteItems(){
    const allElements = $('p');
    const allImgElements = $('img');
    const allDivElements = $('.forecastDiv');
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
    for(let i = 0; i<allDivElements.length; i++){
        const divElement = allDivElements[i];
        console.log('elementImg: ', divElement);
        divElement.remove();
    }
    
}

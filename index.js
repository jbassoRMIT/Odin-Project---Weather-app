const weatherResults=document.querySelector(".weatherResults");

const key="Q4ZEAHEY26Q25F7A4ZP6YLT6H"

//write function to  fetch weather data and display to console
const fetchWeather= async function(){
    const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/melbourne/today?unitGroup=metric&include=days&key=Q4ZEAHEY26Q25F7A4ZP6YLT6H&contentType=json");
    const results=await response.json();
    console.log(results);
    const address=results.address;
    const conditions=results.days[0].conditions;
    const minTemp=results.days[0].tempmin;
    const maxTemp=results.days[0].tempmax;

    weatherResults.textContent=`The weather today in ${address} is ${conditions}. Min temp: ${minTemp}, Max temp: ${maxTemp}`;
}

fetchWeather();
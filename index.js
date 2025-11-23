const weatherResults=document.querySelector(".weatherResults");
const form=document.querySelector("form");
const citySearch=document.querySelector("#city");

const key="Q4ZEAHEY26Q25F7A4ZP6YLT6H"

//write function to  fetch weather data and display to console
const fetchWeather= async function(city){
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=Q4ZEAHEY26Q25F7A4ZP6YLT6H&contentType=json`);
    const results=await response.json();
    console.log(results);
    const address=city;
    const conditions=results.days[0].conditions;
    const minTemp=results.days[0].tempmin;
    const maxTemp=results.days[0].tempmax;

    weatherResults.textContent=`The weather today in ${address} is ${conditions}. Min temp: ${minTemp}, Max temp: ${maxTemp}`;
}

//add event listener to form
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const city=citySearch.value;
    fetchWeather(city);
})


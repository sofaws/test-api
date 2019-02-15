import rp from 'request-promise';


export async function getWeather(city) {
   return JSON.parse((await rp(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHERKEY}&units=metric`)));
}

import request from 'request';


export async function getWeather(city) {
   return await request(`https://samples.openweathermap.org/data/2.5/weather?q=${city},uk&appid=${process.env.WEATHERKEY}`);
}

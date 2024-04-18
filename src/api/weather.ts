import axios from "axios";

interface Params {
  cityName: string;
  days?: string;
}

const forecastEndpoint = (params: Params): string => `https://api.weatherapi.com/v1/forecast.json?key=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const locationsEndpoint = (params: Params): string => `https://api.weatherapi.com/v1/search.json?key=5e52b7dee1b246b386952505241804&q=${params.cityName}
`;

const apiCall = async (endpoint: string): Promise<any> => {
  const options = {
    method: "GET",
    url: endpoint
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (err) {
    console.log('error: ', err);
    return null;
  }
};

export const fetchWeatherForecast = (params: Params): Promise<any> => {
  const endpoint = forecastEndpoint(params);
  return apiCall(endpoint);
};

export const fetchLocations = (params: Params): Promise<any> => {
  return apiCall(locationsEndpoint(params))
};
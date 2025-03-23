import axios from 'axios';

const API_URL = 'https://restcountries.com/v3.1/all';

export interface Country {
  cca3: string;
  name: { common: string };
  population: number;
  region: string;
  flags: { png: string };
}

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

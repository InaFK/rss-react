import React, { useState, useEffect } from 'react';
import { fetchCountries, Country } from './services/api';
import './App.css';

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
      setLoading(false);
    };
    getCountries();
  }, []);

  const regions = ['All', ...new Set(countries.map((country) => country.region))].sort();

  const filteredCountries = selectedRegion === 'All'
  ? countries
  : countries.filter((country) => country.region === selectedRegion);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <h1>Countries:</h1>
      <div className="filter">
        <label htmlFor="region-select">Filter by Region: </label>
        <select
          id="region-select"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      <div className="country-list">
        {filteredCountries.map((country) => (
          <div key={country.cca3} className="country-card">
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="50" />
            <h2>{country.name.common}</h2>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

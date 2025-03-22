import React, { useState, useEffect } from 'react';
import { fetchCountries, Country } from './services/api';
import './App.css';

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
      setLoading(false);
    };
    getCountries();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <h1>Country List</h1>
      <div className="country-list">
        {countries.map((country) => (
          <div key={country.cca3} className="country-card">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              width="50"
            />
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

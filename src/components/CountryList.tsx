import React from 'react';
import { Country } from '../services/api';

interface CountryListProps {
  countries: Country[];
}

const CountryList: React.FC<CountryListProps> = ({ countries }) => {
  return (
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
  );
};

export default CountryList;

import React from 'react';
import { Country } from '../services/api';

interface CountryCardProps {
  country: Country;
  isVisited: boolean;
  onToggleVisited: (cca3: string) => void;
}

const CountryCard: React.FC<CountryCardProps> = React.memo(
  ({ country, isVisited, onToggleVisited }) => {
    return (
      <div className={`country-card ${isVisited ? 'visited' : ''}`}>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="50" />
        <h2>{country.name.common}</h2>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
        <label>
          <input
            type="checkbox"
            checked={isVisited}
            onChange={() => onToggleVisited(country.cca3)}
          />
          Visited
        </label>
      </div>
    );
  }
);

export default CountryCard;
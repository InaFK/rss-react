import React from 'react';
import { Country } from '../services/api';
import CountryCard from './CountryCard';

interface CountryListProps {
  countries: Country[];
  visitedCountries: Set<string>;
  onToggleVisited: (cca3: string) => void;
}

const CountryList: React.FC<CountryListProps> = React.memo(
  ({ countries, visitedCountries, onToggleVisited }) => {
    return (
      <div className="country-list">
        {countries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            isVisited={visitedCountries.has(country.cca3)}
            onToggleVisited={onToggleVisited}
          />
        ))}
      </div>
    );
  }
);

export default CountryList;

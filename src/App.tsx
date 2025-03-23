import React, { useState, useEffect } from 'react';
import { fetchCountries, Country } from './services/api';
import RegionFilter from './components/RegionFilter';
import SearchBar from './components/SearchBar';
import CountryList from './components/CountryList';
import './App.css';

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
      setLoading(false);
    };
    getCountries();
  }, []);

  const filteredCountries = countries.filter((country) => {
    const matchesRegion =
      selectedRegion === 'All' || country.region === selectedRegion;
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <h1>Countries:</h1>
      <div className="filters">
        <RegionFilter
          regions={['All', ...new Set(countries.map((c) => c.region))].sort()}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
        />
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      <CountryList countries={filteredCountries} />
    </div>
  );
};

export default App;

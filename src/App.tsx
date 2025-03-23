import React, { useState, useEffect } from 'react';
import { fetchCountries, Country } from './services/api';
import RegionFilter from './components/RegionFilter';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import CountryList from './components/CountryList';
import './App.css';

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'population'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
      setLoading(false);
    };
    getCountries();
  }, []);

  const regions = ['All', ...new Set(countries.map((c) => c.region))].sort();

  const filteredCountries = countries.filter((country) => {
    const matchesRegion =
      selectedRegion === 'All' || country.region === selectedRegion;
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    if (sortBy === 'name') {
      const comparison = a.name.common.localeCompare(b.name.common);
      return sortDirection === 'asc' ? comparison : -comparison;
    } else {
      const diff = a.population - b.population;
      return sortDirection === 'asc' ? diff : -diff;
    }
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <h1>Countries:</h1>
      <div className="filters">
        <RegionFilter
          regions={regions}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
        />
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <SortControls
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortByChange={setSortBy}
          onSortDirectionChange={setSortDirection}
        />
      </div>
      <CountryList countries={sortedCountries} />
    </div>
  );
};

export default App;

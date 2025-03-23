import React, { useState, useEffect, useMemo } from 'react';
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
  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('visitedCountries');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
      setLoading(false);
    };
    getCountries();
  }, []);

  useEffect(() => {
    localStorage.setItem('visitedCountries', JSON.stringify([...visitedCountries]));
  }, [visitedCountries]);

  const regions = ['All', ...new Set(countries.map((c) => c.region))].sort();

  const processedCountries = useMemo(() => {
    console.log('Recalculating processedCountries');
    const filteredCountries = countries.filter((country) => {
      const matchesRegion =
        selectedRegion === 'All' || country.region === selectedRegion;
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesRegion && matchesSearch;
    });

    return [...filteredCountries].sort((a, b) => {
      if (sortBy === 'name') {
        const comparison = a.name.common.localeCompare(b.name.common);
        return sortDirection === 'asc' ? comparison : -comparison;
      } else {
        const diff = a.population - b.population;
        return sortDirection === 'asc' ? diff : -diff;
      }
    });
  }, [countries, selectedRegion, searchTerm, sortBy, sortDirection]);

  const toggleVisited = (cca3: string) => {
    setVisitedCountries((prev) => {
      const newVisited = new Set(prev);
      if (newVisited.has(cca3)) {
        newVisited.delete(cca3);
      } else {
        newVisited.add(cca3);
      }
      return newVisited;
    });
  };

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
      <CountryList
        countries={processedCountries}
        visitedCountries={visitedCountries}
        onToggleVisited={toggleVisited}
      />
    </div>
  );
};

export default App;

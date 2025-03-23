import React from 'react';

interface RegionFilterProps {
  regions: string[];
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

const RegionFilter: React.FC<RegionFilterProps> = ({
  regions,
  selectedRegion,
  onRegionChange,
}) => {
  return (
    <div className="filter">
      <label htmlFor="region-select">Filter by Region: </label>
      <select
        id="region-select"
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
      >
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionFilter;

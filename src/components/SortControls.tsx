import React from 'react';

interface SortControlsProps {
  sortBy: 'name' | 'population';
  sortDirection: 'asc' | 'desc';
  onSortByChange: (sortBy: 'name' | 'population') => void;
  onSortDirectionChange: (sortDirection: 'asc' | 'desc') => void;
}

const SortControls: React.FC<SortControlsProps> = ({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) => {
  return (
    <div className="filter">
      <label>Sort by: </label>
      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as 'name' | 'population')}
      >
        <option value="name">Name</option>
        <option value="population">Population</option>
      </select>
      <select
        value={sortDirection}
        onChange={(e) => onSortDirectionChange(e.target.value as 'asc' | 'desc')}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortControls;
import React from 'react';
import './DetailsPanel.css';

interface Props {
  pokemon: { name: string; description: string } | null;
  onClose: () => void;
}

const DetailsPanel: React.FC<Props> = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  return (
    <div className="details-panel">
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>{pokemon.name}</h2>
      <p>{pokemon.description}</p>
    </div>
  );
};

export default DetailsPanel;

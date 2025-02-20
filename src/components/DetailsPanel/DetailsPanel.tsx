import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './DetailsPanel.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

interface Pokemon {
  name: string;
  description: string;
}

const DetailsPanel = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pokemonName) return;

    setLoading(true);
    fetch(`${API_URL}${pokemonName}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => setPokemon({ name: data.name, description: data.species.url }))
      .catch(() => setError('Pokémon not found.'))
      .finally(() => setLoading(false));
  }, [pokemonName]);

  const handleClose = () => {
    navigate('/search');
  };

  if (loading) return <p>Loading details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!pokemon) return <p>Select a Pokémon to view details.</p>;

  return (
    <div className="details-panel-content">
      <button className="close-btn" onClick={handleClose} aria-label="Close Details">×</button>
      <h2>{pokemon.name}</h2>
      <p>Description URL: <a href={pokemon.description} target="_blank">{pokemon.description}</a></p>
    </div>
  );
};

export default DetailsPanel;

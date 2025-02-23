import { useParams, useNavigate } from 'react-router-dom';
import { useGetPokemonByNameQuery, useGetPokemonSpeciesQuery } from '../../features/pokemonApi';
import './DetailsPanel.css';

const DetailsPanel = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const navigate = useNavigate();
  
  const { data: pokemon, isLoading: loadingPokemon, error: pokemonError } = useGetPokemonByNameQuery(pokemonName!, { skip: !pokemonName });
  const { data: species, isLoading: loadingSpecies, error: speciesError } = useGetPokemonSpeciesQuery(pokemonName!, { skip: !pokemonName });

  const handleClose = () => navigate('/search');

  if (!pokemonName) return <p>Select a Pokémon to view details.</p>;
  if (loadingPokemon || loadingSpecies) return <p>Loading details...</p>;
  if (pokemonError || speciesError) return <p className="error">Pokémon not found.</p>;

  const descriptionEntry = species?.flavor_text_entries?.find((entry) => entry.language.name === 'en');

  return (
    <div className="details-panel-content">
      <button className="close-btn" onClick={handleClose} aria-label="Close Details">×</button>
      <h2>{pokemon.name}</h2>
      {pokemon?.sprites?.front_default && (
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      )}
      <p><strong>Description:</strong> {descriptionEntry?.flavor_text ?? 'No description available.'}</p>
      <p><strong>Height:</strong> {pokemon?.height}</p>
      <p><strong>Weight:</strong> {pokemon?.weight}</p>
      <p><strong>Abilities:</strong> {pokemon?.abilities?.length ? pokemon.abilities.map((a) => a.ability.name).join(', ') : 'None'}</p>
    </div>
  );
};

export default DetailsPanel;

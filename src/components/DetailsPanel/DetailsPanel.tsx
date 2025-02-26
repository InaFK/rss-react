import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useGetItemByNameQuery, useGetItemSpeciesQuery } from '../../features/api';
import './DetailsPanel.css';

interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}

interface Ability {
  ability: {
    name: string;
  };
}

const DetailsPanel = () => {
  const { itemName } = useParams<{ itemName: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const currentPage = queryParams.get('page') || '1';
  
  const { data: pokemon, isLoading: loadingPokemon, error: pokemonError } = useGetItemByNameQuery(itemName!, { skip: !itemName });
  const { data: species, isLoading: loadingSpecies, error: speciesError } = useGetItemSpeciesQuery(itemName!, { skip: !itemName });

  const handleClose = () => navigate(`/search?page=${currentPage}`);

  if (!itemName) return <p>Select a Pokémon to view details.</p>;
  if (loadingPokemon || loadingSpecies) return <p>Loading details...</p>;
  if (pokemonError || speciesError) return <p className="error">Pokémon not found.</p>;

  const descriptionEntry = species?.flavor_text_entries?.find(
    (entry: FlavorTextEntry) => entry.language.name === 'en'
  );
  
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
      <p><strong>Abilities:</strong> {pokemon?.abilities?.length ? pokemon.abilities.map((a: Ability) => a.ability.name).join(', ') : 'None'}</p>
    </div>
  );
};

export default DetailsPanel;

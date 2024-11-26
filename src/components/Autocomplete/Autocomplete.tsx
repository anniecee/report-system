import React, { useState, useEffect } from 'react';
import './Autocomplete.css'; // Import the CSS file for styling

interface AutocompleteProps {
  onSelect: (location: string, lat: string, lon: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = React.memo(({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Set API key
  const API_KEY = '6736bc18c1e9a621074081chz82fc25';

  useEffect(() => {
    if (query.length < 5) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://geocode.maps.co/search?q=${query}&api_key=${API_KEY}`);
        const data = await response.json();
        console.log('Data:', data);
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSelect = (suggestion: any) => {
    setQuery(suggestion.display_name);
    setSuggestions([]);
    console.log(`Selected location: ${suggestion.display_name}, Latitude: ${suggestion.lat}, Longitude: ${suggestion.lon}`);
    onSelect(suggestion.display_name, suggestion.lat, suggestion.lon);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for an address"
        className="autocomplete-input"
      />
      {isLoading && <div className="loading">Loading...</div>}
      {suggestions.length > 0 && (
        <ul className="autocomplete-dropdown">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelect(suggestion)} className="autocomplete-item">
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default Autocomplete;
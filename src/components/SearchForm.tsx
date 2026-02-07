import React, { useState } from 'react';
import './SearchForm.css';

interface SearchFormProps {}

interface SearchRequest {
  query: string;
  limit: number;
  similarityThreshold: number;
}

const SearchForm: React.FC<SearchFormProps> = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [initialMessage, setInitialMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const apiLocation = 'https://pretzeloverdose.com/wordsearch/api/Dictionary';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);

    const requestData: SearchRequest = {
      query: searchText,
      limit: 10,
      similarityThreshold: 10
    };

    try {
      
      const response = await fetch(apiLocation+'/search-s3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }



      const data = await response.json();
      setResult(data);
      
      // Check if searchText exists within any item.word in the results
      const searchLower = searchText.toLowerCase();
      const exactMatch = data.results?.some((item: any) => 
        item.word?.toLowerCase().includes(searchLower)
      );
      
      if (exactMatch) {
        setInitialMessage(`The word "${searchText}" exists in the dictionary.`);
      } else {
        setInitialMessage(`The word "${searchText}" does not exist in the dictionary.`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSearchText('');
    setResult(null);
    setError('');
  };

  return (
    <div className="search-form-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label htmlFor="searchText">Search Text:</label>
          <input
            type="text"
            id="searchText"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Enter text to search..."
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
          <button type="button" onClick={handleReset} disabled={isLoading}>
            Reset
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message">
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="result-section">
          {initialMessage && <p>{initialMessage}</p>}
          <h3>Similar words:</h3>
          <div>
            {result.results?.map((item: any, index: number) => (
              <div key={index}>{item.word}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
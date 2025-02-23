import { useState, useEffect } from 'react';

const useSearchQuery = () => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem('searchTerm') || '';
  });

  useEffect(() => {
    const trimmedTerm = searchTerm.trim();

    if (!trimmedTerm) {
      localStorage.removeItem('searchTerm');
    } else {
      const storedTerm = localStorage.getItem('searchTerm');
      if (storedTerm !== trimmedTerm) {
        localStorage.setItem('searchTerm', trimmedTerm);
      }
    }
  }, [searchTerm]);

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term.trim());
  };

  return [searchTerm, updateSearchTerm] as const;
};

export default useSearchQuery;

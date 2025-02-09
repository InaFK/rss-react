import { useState, useEffect } from 'react';

const useSearchQuery = () => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem('searchTerm') || '';
  });

  useEffect(() => {
    if (searchTerm.trim() === '') {
      localStorage.removeItem('searchTerm');
    } else {
      localStorage.setItem('searchTerm', searchTerm);
    }
  }, [searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

export default useSearchQuery;

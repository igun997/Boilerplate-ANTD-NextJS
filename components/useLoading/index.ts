import { useState } from 'react';

const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const handleLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return {
    loading,
    handleLoading,
  };
};

export default useLoading;

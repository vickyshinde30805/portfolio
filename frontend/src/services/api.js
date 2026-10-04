const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export async function fetchPortfolioProfile() {
  const response = await fetch(`${API_BASE_URL}/profile/`);

  if (!response.ok) {
    throw new Error('Failed to fetch portfolio details');
  }

  return response.json();
}

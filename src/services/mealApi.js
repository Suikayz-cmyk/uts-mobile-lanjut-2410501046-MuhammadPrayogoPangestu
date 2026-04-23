const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories.php`);

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data = await response.json();
  return data.categories;
}
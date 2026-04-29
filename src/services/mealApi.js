const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories.php`);

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data = await response.json();
  return data.categories;
}

export async function getMealsByCategory(category) {
  const response = await fetch(
    `${BASE_URL}/filter.php?c=${category}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch meals');
  }

  const data = await response.json();
  return data.meals;
}

export async function getMealDetail(idMeal) {
  const response = await fetch(
    `${BASE_URL}/lookup.php?i=${idMeal}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch detail');
  }

  const data = await response.json();

  return data.meals[0];
}

export async function searchMeals(keyword) {
  const response = await fetch(
    `${BASE_URL}/search.php?s=${keyword}`
  );

  if (!response.ok) {
    throw new Error('Failed to search meals');
  }

  const data = await response.json();

  return data.meals || [];
}

export async function getRandomMeal() {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/random.php'
  );

  const json = await response.json();

  return json.meals[0];
}
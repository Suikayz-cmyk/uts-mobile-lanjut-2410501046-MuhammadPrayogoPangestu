import { create } from 'zustand';

const useFavoriteStore = create((set, get) => ({
  favorites: [],

  addFavorite: (meal) => {
    const currentFavorites = get().favorites;

    const alreadyExists = currentFavorites.find(
      (item) => item.idMeal === meal.idMeal
    );

    if (!alreadyExists) {
      set({
        favorites: [...currentFavorites, meal],
      });
    }
  },

  removeFavorite: (idMeal) => {
    const filteredFavorites = get().favorites.filter(
      (item) => item.idMeal !== idMeal
    );

    set({
      favorites: filteredFavorites,
    });
  },

  isFavorite: (idMeal) => {
    return get().favorites.some(
      (item) => item.idMeal === idMeal
    );
  },
}));

export default useFavoriteStore;
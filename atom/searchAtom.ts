import { atom, selector } from "recoil";

export const searchResultState = atom({
    key: 'searchResultState', 
    default: null, 
});

export const searchResults = selector({
    key: 'searchResults', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const searchResults = get(searchResultState);
  
      return searchResults;
    },
  });

  export const searchModalState = atom({
    key: 'searchModalState', 
    default: false, 
});

export const isSearchOpen = selector({
    key: 'searchModalValue', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const isOpen = get(searchModalState);
  
      return isOpen;
    },
});

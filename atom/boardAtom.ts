import { atom, selector } from "recoil";

export const boardModalState = atom({
    key: 'boardModalState', 
    default: false, 
});

export const isOpen = selector({
    key: 'boardValue', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const isOpen = get(boardModalState);
  
      return isOpen;
    },
});
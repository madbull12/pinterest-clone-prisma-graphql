import { atom, selector } from "recoil";

export const editModalState = atom({
    key: 'editModalState', 
    default: false, 
});

export const isEditOpen = selector({
    key: 'editValue', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const isOpen = get(editModalState);
  
      return isOpen;
    },
});
import { atom, selector } from "recoil";
import { IPin } from "../interface";

export const editModalState = atom({
    key: 'editModalState', 
    default: false, 
});

export const editPinState = atom({
  key:"editPinState",
  default:null
});

export const editPinValue = selector({
  key:"editPinValue",
  get:({get})=>{
    const value = get(editPinState);
    return value;
  }
});

export const isEditOpen = selector({
    key: 'editValue', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const isOpen = get(editModalState);
  
      return isOpen;
    },
});
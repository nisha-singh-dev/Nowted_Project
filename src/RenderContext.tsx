import { createContext } from "react";

type RenderContextType = { 
  change: boolean; 
  setChange: (value: boolean) => void;
  mainchange: boolean;
  setMainchange: (value:boolean) => void;
 };

const defaultval: RenderContextType = {
  change: false,
  setChange: () => {},
  mainchange: false,
  setMainchange: ()=>{},
 
 };

export const RenderContext = createContext<RenderContextType>(defaultval);
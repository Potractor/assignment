import { createContext, useContext, useEffect, useState } from "react";



export const ThemeContext = createContext();

export const useTheme = ()=> { 
  return useContext(ThemeContext);
}

export const ContextWrapper = ({children}) => { 
  const [theme , setTheme] = useState(true);
  const toggleTheme = ()=> { 
    setTheme(theme=> !theme)
  }
  const webTheme = theme?"dark": "light"
  useEffect(()=> { 
  
    document.documentElement.setAttribute("data-theme",webTheme)
  },[webTheme])
  return <ThemeContext.Provider value={{webTheme,toggleTheme}}>
    {children}
  </ThemeContext.Provider>
}
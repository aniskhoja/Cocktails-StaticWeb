import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [ loading, setLoading ] = useState(true);
  const [ searchTerm, setSearchTerm ] = useState('a')
  const [cocktails, setCocktails] = useState([])
  
  const fetchDrinks = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;
      if (!drinks) setCocktails([])
      const newCocktails = drinks.map((item) => {
        const { idDrink, strDrink, strDrinkThumb, strAlcholic, strGlass } = item;
        return {id:idDrink, name:strDrink, image:strDrinkThumb, info:strAlcholic, glass: strGlass}
      })
      setCocktails(newCocktails)
      setLoading(false)

    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }, [searchTerm])

  useEffect(() => {
    fetchDrinks()
  }, [searchTerm, fetchDrinks])
  return <AppContext.Provider
    value={{
      loading,
      cocktails,
      setSearchTerm,
    }}>
    {children}
  </AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

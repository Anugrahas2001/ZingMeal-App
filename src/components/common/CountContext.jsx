import React, { createContext, useState } from 'react'
export const CounterContext=createContext();

const CountContext = ({children}) => {
    const [cartItemCount, setCartItemCount] = useState(0);

  return (
    <CounterContext.Provider value={{cartItemCount,setCartItemCount}}>
        {children}
    </CounterContext.Provider>
  )
}

export default CountContext

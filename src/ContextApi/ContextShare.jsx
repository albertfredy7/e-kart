import React, {  createContext, useState } from 'react'

export const MyCartContext = createContext()

function ContextShare({ children}) {
    const [cart, setCart] = useState([]);
  return (
    <div><MyCartContext.Provider value={{cart, setCart}}>{children}</MyCartContext.Provider></div>
  )
}

export default ContextShare
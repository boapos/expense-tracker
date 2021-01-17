import React, { createContext, useReducer, useEffect } from 'react'
import AppReducer from './AppReducer'

// init state
const initialState =  {
  transactions: [
    // { id: 1, text: 'Flower', amount: -20 },
    // { id: 3, text: 'Book', amount: -10 },
    // { id: 2, text: 'Salary', amount: 300 },
    // { id: 4, text: 'Camera', amount: 150 }
  ]
}

// create context
export const GlobalContext = createContext()

// provider component
export const GlobalProvider = ({ children }) => {

  const [state, dispatch] = useReducer(AppReducer, initialState)
  
  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    })
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    })
  }

  useEffect(() => { // retrieve from local storage
    if(localStorage.getItem('transactions') === null) {
      localStorage.setItem('transactions', JSON.stringify([]))
    } else {
      dispatch({
        type: 'RETRIEVE_TRANSACTIONS',
        payload: JSON.parse(localStorage.getItem('transactions'))
      })
    }
  }, [])

  useEffect(() => { // save transactions
    localStorage.setItem('transactions', JSON.stringify(state.transactions))
  }, [state])

  return(<GlobalContext.Provider value={{
    transactions: state.transactions,
    deleteTransaction,
    addTransaction,
  }}>
    {children}
  </GlobalContext.Provider>)
}
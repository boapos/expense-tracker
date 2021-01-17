import React, { createContext, useReducer, useEffect } from 'react'

// init state
const initialState =  {
  transactions: []
}

// create context
export const GlobalContext = createContext()

// provider component
export const GlobalProvider = ({ children }) => {

  const AppReducer = (state, action) => {
    switch(action.type) {
      case 'DELETE_TRANSACTION':
        return { ...state, transactions: state.transactions.filter(transaction => transaction.id !== action.payload) }
      case 'ADD_TRANSACTION':
        return {...state, transactions: [...state.transactions, action.payload]}
      case 'RETRIEVE_TRANSACTIONS':
        return {...state, transactions: action.payload}
      default:
        return state;
    }
  }

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
import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const AddTransaction = () => {
  
  const [text, setText] = useState('')
  const [amount, setAmount] = useState('')
  const { addTransaction } = useContext(GlobalContext)

  const onSubmit = e => {
    e.preventDefault()

    const newTransaction = {
      id: Date.now(),
      text,
      amount: +amount
    }

    if(text === '' || amount === 0 || amount === '') {
      alert('Fill-in all fields.')
    } else {
      addTransaction(newTransaction) 
      setText('')
      setAmount('')
      document.querySelector('input').focus() 
    }
  }

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Transaction</label>
          <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Enter transaction..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount <br />
            (negative - expense, positive - income)</label>
          <input type="number" step="any" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  )
}

export default AddTransaction

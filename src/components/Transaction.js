import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const Transaction = ({ transaction }) => {

  const { deleteTransaction } = useContext(GlobalContext)

  const sign = transaction.amount < 0 ? '-' : '+'

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      <div>
        <i className="fas fa-times-circle delete-btn" onClick={() => deleteTransaction(transaction.id)} />
        {transaction.text}
      </div>
      
      <span>{sign}&#8369;{Math.abs(transaction.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
      {/* <button className="delete-btn" onClick={() => deleteTransaction(transaction.id)}>x</button> */}
      
    </li>
  )
}

export default Transaction

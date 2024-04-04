import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { dispatch, budget, currency } = useContext(AppContext);

    const [newBudget, setNewBudget] = useState(budget);

    const handleBudgetChange = (event) => {
        setNewBudget(event.target.value);
    }

    const submitBudget = () => {
        dispatch({
            type:'SET_BUDGET',
            payload:newBudget
        })
    }


    return (
        <div className='alert alert-secondary input-group'>
            <span className='input-group-text'>Budget: {currency}{budget}</span>
            <input className='form-control' type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>
            <button className='btn btn-secondary' onClick={submitBudget}>OK</button>
        </div>
    );
};

export default Budget;

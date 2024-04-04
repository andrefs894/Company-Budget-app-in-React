import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    }

    return (
        <tr>
            <td>{props.name}</td>
            <td>£{props.cost}</td>
            <td><button className='btn btn-outline-secondary' onClick={event=> increaseAllocation(props.name)}>+</button></td>
            <td><i class="fas fa-times text-danger" onClick={handleDeleteExpense} style={{cursor:"pointer"}}></i></td>
        </tr>
    );
};

export default ExpenseItem;

import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Swal from 'sweetalert2';

const AllocationForm = (props) => {
    const { dispatch, remaining } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');

    const submitEvent = () => {
        if(cost > remaining) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `The value cannot exceed remaining funds £${remaining}`,
            });
            setCost("");
            return;
        }

        const expense = {
            name: name,
            cost: parseInt(cost),
        };
        if(action === "Reduce") {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        }
        else {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
        }
    };

    return (
        <div className='row text-center allocation'>
            <h2>Allocation Form</h2>
            <label className="input-group-text" htmlFor="department">Department:</label>
            <select className="form-select" id="department" onChange={(event) => setName(event.target.value)}>
                <option defaultValue disabled>Choose...</option>
                <option value="Marketing" name="marketing"> Marketing</option>
                <option value="Sales" name="sales">Sales</option>
                <option value="Finance" name="finance">Finance</option>
                <option value="HR" name="hr">HR</option>
                <option value="IT" name="it">IT</option>
                <option value="Admin" name="admin">Admin</option>
            </select>
            <label className="input-group-text" htmlFor="allocation">Allocation:</label>
            <select className="form-select" id="allocation" onChange={(event) => setAction(event.target.value)}>
                <option defaultValue value="Add" name="Add">Add</option>
                <option value="Reduce" name="Reduce">Reduce</option>
            </select>
            <input
                className='form-control'
                required='required'
                type='number'
                id='cost'
                value={cost}
                onChange={(event) => setCost(event.target.value)} />
            <button className="btn btn-primary" onClick={submitEvent}>Save</button>
        </div>
    );
};

export default AllocationForm;

import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Swal from 'sweetalert2';

const AllocationForm = (props) => {
    const { dispatch, remaining } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');

    const submitEvent = () => {
        if(cost === '' || name === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Please insert a department and a value.`,
            });
        }
        else if(cost > remaining) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `The value cannot exceed remaining funds £${remaining}`,
            });
            setCost("");
            return;
        }
        else {
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
        }
    };

    return (
        <div className='row allocation'>
            <h2 className='text-center'>Allocation Form</h2>
            <label className="h5" htmlFor="department">Department:</label>
            <select className="form-select" id="department" onChange={(event) => setName(event.target.value)}>
                <option defaultValue>Choose...</option>
                <option value="Marketing" name="Marketing">Marketing</option>
                <option value="Sales" name="sales">Sales</option>
                <option value="Finances" name="finances">Finances</option>
                <option value="Human Resources" name="hr">Human Resources</option>
                <option value="IT" name="it">IT</option>
            </select>
            <label className="h5" htmlFor="allocation">Allocation:</label>
            <select className="form-select" id="allocation" onChange={(event) => setAction(event.target.value)}>
                <option defaultValue value="Add" name="Add">Add</option>
                <option value="Reduce" name="Reduce">Reduce</option>
            </select>
            <label className="h5" htmlFor="cost">Value:</label>
            <input
                className='form-control'
                type='number'
                id='cost'
                value={cost}
                onChange={(event) => setCost(event.target.value)} />
            <button className="btn btn-primary" onClick={submitEvent}>Save</button>
        </div>
    );
};

export default AllocationForm;

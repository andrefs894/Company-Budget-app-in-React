import React, { createContext, useReducer } from 'react';
import Swal from 'sweetalert2';

export const AppReducer = (state, action) => {
    let budget = 0;
    switch (action.type) {
        case 'ADD_EXPENSE':
            let total_budget = 0;
            total_budget = state.expenses.reduce(
                (previousExp, currentExp) => {
                    return previousExp + currentExp.cost
                },0
            );
            total_budget = total_budget + action.payload.cost;
            action.type = "DONE";
            if(total_budget <= state.budget) {
                total_budget = 0;
                state.expenses.map((currentExp)=> {
                    if(currentExp.name === action.payload.name) {
                        currentExp.cost = action.payload.cost + currentExp.cost;
                    }
                    return currentExp
                });
                return {
                    ...state,
                };
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Cannot increase the allocation! Out of funds.`,
                });
                return {
                    ...state
                }
            }
            case 'RED_EXPENSE':
                const red_expenses = state.expenses.map((currentExp)=> {
                    if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
                        currentExp.cost =  currentExp.cost - action.payload.cost;
                        budget = state.budget + action.payload.cost
                    }
                    return currentExp
                })
                action.type = "DONE";
                return {
                    ...state,
                    expenses: [...red_expenses],
                };
            case 'DELETE_EXPENSE':
            action.type = "DONE";
            state.expenses.map((currentExp)=> {
                if (currentExp.name === action.payload) {
                    budget = state.budget + currentExp.cost
                    currentExp.cost =  0;
                }
                return currentExp
            })
            action.type = "DONE";
            return {
                ...state,
                budget
            };
        case 'SET_BUDGET':
            action.type = "DONE";
            state.budget = action.payload;

            return {
                ...state,
            };
        case 'CHG_CURRENCY':
            action.type = "DONE";
            state.currency = action.payload;
            return {
                ...state
            }

        default:
            return state;
    }
};

const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '£'
};

export const AppContext = createContext();

export const AppProvider = (props) => {

    const [state, dispatch] = useReducer(AppReducer, initialState);
    let remaining = 0;

    if (state.expenses) {
            const totalExpenses = state.expenses.reduce((total, item) => {
            return (total = total + item.cost);
        }, 0);
        remaining = state.budget - totalExpenses;
    }

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining: remaining,
                dispatch,
                currency: state.currency
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
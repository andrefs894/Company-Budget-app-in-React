import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Budget from './components/Budget';
import Remaining from './components/Remaining';
import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import AllocationForm from './components/AllocationForm';
import { AppProvider } from './context/AppContext';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const App = () => {
    return (
        <AppProvider>
            <div className='container'>
                <div className='row title'>
                    <h1 className='col-12 text-center'>Company's Budget Allocation</h1>
                </div>
                <div className='row budget'>
                    <div className='col'>
                        <Budget />
                    </div>
                    <div className='col'>
                        <Remaining />
                    </div>
                    <div className='col'>
                        <ExpenseTotal />
                    </div>
                </div>
                <div className='row'>
                    <Tabs>
                        <TabList>
                            <Tab>Allocation Table</Tab>
                            <Tab>Allocation Form</Tab>
                        </TabList>
                        <TabPanel>
                            <ExpenseList />
                        </TabPanel>
                        <TabPanel>
                            <AllocationForm />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </AppProvider>
    );
};
export default App;

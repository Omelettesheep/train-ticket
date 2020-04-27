import React, {createContext, useState, useContext} from 'react';
import logo from './logo.svg';
import './App.css';


const BatteryContext = createContext();
const OnlineContext = createContext();

const Leaf = () => {
    const battery = useContext(BatteryContext);
    return (
        <h1>Battery: {battery}</h1>
    )
};

const Middle = () => {
    return (
        <Leaf />
    )
};

function App() {
    const [battery, setBattery] = useState(30);
    const [online, setOnline] = useState(false);
    return (
        <BatteryContext.Provider value={battery}>
            <OnlineContext.Provider value={online}>
                <button type="button" onClick={() => {setBattery(battery - 1)}}>
                    button
                </button>
                <button type="button" onClick={() => {setOnline(!online)}}>
                    switch
                </button>
                <Middle />
            </OnlineContext.Provider>
        </BatteryContext.Provider>
    );
}

export default App;

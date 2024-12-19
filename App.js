import './App.css';
import {Outlet} from "react-router-dom";
import Header from "./components/Header";
// import {useState} from "react";
// import {ThemeContext} from "./contexts/ThemeContext";
import {ThemeProvider} from "./contexts/ThemeContext";

export default function App() {

    return (
        // <ThemeContext.Provider value={[isDark, setIsDark]}>
        <ThemeProvider>
            <Header/>
            <Outlet/>
        </ThemeProvider>

        // </ThemeContext.Provider>
    )
}



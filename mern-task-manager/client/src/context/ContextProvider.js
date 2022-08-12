import { createContext, useState, useEffect, useReducer } from 'react';
import axios from 'axios';

export const Context = createContext();

const url = 'http://localhost:4000/api/v1';

//initial state
const initialState = [];

//reducer function
const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const ContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    //actions


    async function getLogin() {
        const res = await axios.get(`${url}/user/check-login`);
        setIsLogin(res.data);
    }

    useEffect(() => {
        getLogin();
    }, []);



    return (<Context.Provider value={{ isLogin }}>{children}</Context.Provider>);
};

export default ContextProvider;
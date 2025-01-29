import { createContext, useState, useEffect, useReducer } from 'react';
import axios from 'axios';

export const Context = createContext();

const url = process.env.REACT_APP_URL;



//initial state
const initialState = {
    user: {},
    tasks: [],
    isUpdate: true
};

//reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case 'USER':
            return { ...state, user: action.payload };

        case 'UPDATE':
            return { ...state, isUpdate: !state.isUpdate };

        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload] };

        case 'UPDATE_TASK':
            return { ...state };

        case 'GET_TASKS':
            return { ...state, tasks: action.payload };

        case 'DELETE_TASK':
            return { ...state, tasks: state.tasks.filter(task => task._id !== action.payload) };

        default:
            return state;
    }
};

const ContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    //handling re-render  
    const reRender = () => {
        dispatch({ type: 'UPDATE' });
    };
    //actions
    const getUser = async () => {
        try {
            const user = await axios.get(`${url}/user/check-login`);
            dispatch({ type: 'USER', payload: user.data.user });
        } catch (error) {
            console.log(error);
        }
    };

    const addNewTask = async (data) => {
        try {
            const task = await axios.post(`${url}/tasks`, data);

            dispatch({ type: 'ADD_TASK', payload: task });
        } catch (error) {
            console.log(error);
        }
    };

    const getAllTask = async () => {
        try {
            const tasks = await axios.get(`${url}/tasks`);
            dispatch({ type: 'GET_TASKS', payload: tasks.data.tasks });
        } catch (error) {
            console.log(error);
        }
    };
    const deleteTask = async (id) => {
        try {
            await axios.delete(`${url}/tasks/${id}`);
            dispatch({ type: 'DELETE_TASK', payload: id });
        } catch (error) {
            console.log(error);
        }
    };
    const updateTask = async (id, data) => {
        try {
            await axios.patch(`${url}/tasks/${id}`, data);
            dispatch({ type: 'UPDATE_TASK' });
        } catch (error) {
            console.log(error);
        }
    };


    async function getLogin() {
        try {
            const res = await axios.get(`${url}/user/check-login`);
            setIsLogin(res.data.status);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLogin();
        getUser();
        getAllTask();
    }, [state.isUpdate]);



    return (<Context.Provider value={{ isLogin, state, addNewTask, deleteTask, reRender, updateTask }}>{children}</Context.Provider>);
};

export default ContextProvider;
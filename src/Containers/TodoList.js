import React, { useState, useEffect, useCallback, useReducer, useMemo } from 'react';
import './TodoList.css';
import TodoForm from '../Components/TodoForm/TodoForm';
import Search from '../Components/Search/Search';
import Lists from '../Components/Lists/Lists';
import Loader from '../Components/UI/Loader/Loader';
import ErrorLog from '../Components/UI/ErrorMessage/Error';

const todoListReducer = (currentList, action) => {
    switch (action.type) {
        case 'SET':
            return action.userLists;
        case 'ADD':
            return [...currentList, action.userLists];
        case 'DELETE':
            return currentList.filter(list => list.id !== action.id);

        default:
            throw new Error('Should not get there!');
    }
};

const httpReducer = (curHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { ...curHttpState, loading: true };
        case 'RESPONSE':
            return { ...curHttpState, loading: false };
        case 'ERROR':
            return { error: action.error, loading: false };
        case 'CLEAR':
            return { ...curHttpState, error: null };
        default:
            throw new Error("Should not be reached!");
    }
};

const TodoList = React.memo((props) => {
    const [userTodoList, dispatch] = useReducer(todoListReducer, []);
    const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null })
    const [userLists, setUserLists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorLog, setIsErrorLog] = useState(false);
    const [isErrorMsg, setIsErrorMsg] = useState("");


    useEffect(() => {
        console.log("RENDERING LISTS", userLists);
    }, [userLists]);

    const fnSaveListHandler = (oList) => {
        // setIsLoading(true);
        dispatchHttp({ type: 'SEND' });
        fetch("https://react-projects-6a856-default-rtdb.firebaseio.com/TodoLists.json", {
            method: "POST",
            body: JSON.stringify(oList),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            // setUserLists((prevState) => [
            //     ...prevState, {
            //         id: data.name,
            //         ...oList
            //     }
            // ]);

            dispatch({
                type: 'ADD',
                userLists: {
                    id: data.name,
                    ...oList
                }
            });
            dispatchHttp({ type: 'RESPONSE' });
        }).catch((err) => {
            let sErrorMsg = err.message;
            // setIsErrorMsg(sErrorMsg);
            setIsErrorLog(true);
            dispatchHttp({ type: 'ERROR', error: sErrorMsg });
        });
    };

    const fnFilterHandler = useCallback(loadedlist => {
        // setUserLists(loadedlist);
        dispatch({ type: 'SET', userLists: loadedlist });
    }, []);

    const removeTodoList = (todoId) => {
        setIsLoading(true);
        fetch(`https://react-projects-6a856-default-rtdb.firebaseio.com/TodoLists/${todoId}.json`, {
            method: "DELETE"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            let aLoadedLists = [...userLists];
            // let aTempLits = aLoadedLists.filter((oCur) => {
            //     return oCur.id !== todoId;
            // });
            // setUserLists(aTempLits);
            dispatch({ type: 'DELETE', id: todoId });
            dispatchHttp({ type: 'RESPONSE' });
        }).catch((err) => {
            let sErrorMsg = err.message;
            // setIsErrorMsg(sErrorMsg.message);
            setIsErrorLog(true);
            dispatchHttp({ type: 'ERROR', error: sErrorMsg });
        });

    };

    const onErrorLogHandler = () => {
        // setIsErrorMsg("");
        setIsErrorLog(false);
        dispatchHttp({ type: 'CLEAR' });
    };

    const TOdolist = useMemo(() => {
        <Lists TodoLists={userTodoList} onRemoveItem={removeTodoList} />
    }, [userTodoList]);

    return (
        <div>
            {isErrorLog ? <ErrorLog onClose={onErrorLogHandler}>{httpState.error}</ErrorLog> : null}
            <TodoForm fnSaveTodoList={fnSaveListHandler} />
            <section>
                <Search onLoadLists={fnFilterHandler} />
                {httpState.loading ? <Loader /> : null}
                {TOdolist}
            </section>
        </div>
    );
});

export default TodoList;
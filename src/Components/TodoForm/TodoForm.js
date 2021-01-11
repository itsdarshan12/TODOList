import React, { useState } from 'react';
import Card from '../Card/Card';
import './TodoForm.css';
import Loader from '../UI/Loader/Loader';

const TodoForm = (props) => {

    const [userInput, setUserInput] = useState({ title: "", description: "" });

    const titleHandler = (oEvent) => {
        let sTitle = oEvent.target.value;
        setUserInput((prevState) => ({
            ...userInput,
            title: sTitle
        }));
    };

    const descriptionHandler = (oEvent) => {
        let sDescription = oEvent.target.value;
        setUserInput((prevState) => ({
            ...userInput,
            description: sDescription
        }));
    };

    const fnSaveList = (oEvent) => {
        oEvent.preventDefault();
        props.fnSaveTodoList(userInput);
    };



    return (
        <section className="Todo-form">
            <Card>
                <form >
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" value={userInput.title} onChange={(oEvent) => titleHandler(oEvent)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" value={userInput.description} onChange={(oEvent) => descriptionHandler(oEvent)} />
                    </div>
                    <div className="Todo-form__actions">
                        <button type="submit" onClick={fnSaveList}>Add To TodoList</button>
                    </div>
                </form>
            </Card>
        </section>
    );
};


export default TodoForm;
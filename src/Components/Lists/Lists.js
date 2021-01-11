import React from 'react';
import './Lists.css';

const Lists = (props) => {
    return (
        <section className="TodoLists-list">
            <h2>TodoLists</h2>
            <ul>
                {props.TodoLists.map(ig => (
                    <li key={ig.id} onClick={props.onRemoveItem.bind(this,ig.id)}>
                        <span>{ig.title}</span>
                        <span>{ig.description}</span>
                        {/* <button >Delete</button> */}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Lists;
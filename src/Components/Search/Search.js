import React, { useEffect, useState, useRef } from 'react';
import './Search.css';
import Card from '../Card/Card';

const Search = (props) => {

    const { onLoadLists } = props;
    const [enteredFilter, setEnteredFilter] = useState("");
    const inputRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (enteredFilter === inputRef.current.value) {
                const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
                fetch("https://react-projects-6a856-default-rtdb.firebaseio.com/TodoLists.json" + query)
                    .then((response) => {
                        return response.json();
                    }).then((data) => {
                        const aLoadedLists = [];
                        for (let key in data) {
                            aLoadedLists.push({
                                id: key,
                                title: data[key].title,
                                description: data[key].description
                            });
                        }
                        onLoadLists(aLoadedLists);
                    }).catch(err => console.log(err));
            }
        }, 500);
        return () =>{
              clearTimeout(timer);
        };
    }, [enteredFilter, onLoadLists, inputRef]);

    const fnFilterHandler = (oEvent) => {
        let sFIlter = oEvent.target.value;
        setEnteredFilter(sFIlter);
    };



    return (
        <section className="search">
            <Card>
                <div className="search-input">
                    <label>Filter TODO List</label>
                    <input ref={inputRef} type="text" value={enteredFilter} onChange={(oEvent) => fnFilterHandler(oEvent)} />
                </div>
            </Card>
        </section>
    );
};

export default Search;
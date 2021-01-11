import React, { useContext } from 'react';
import './App.css';
import TodoList from './Containers/TodoList';
import Auth from './Auth';
import { AuthContext } from './Context/auth-context';

const App = () => {

  const authContext = useContext(AuthContext);
  return (
    <div className="App">
      {authContext.isAuth ? <TodoList /> : <Auth />}
    </div>
  );
}

export default App;

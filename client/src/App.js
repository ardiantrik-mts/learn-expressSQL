import { Fragment } from 'react';
import './App.css';

//components
import InputTodo from './componennts/InputTodo';
import ListTodos from './componennts/ListTodos';

function App() {
  return(
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  )
}

export default App;

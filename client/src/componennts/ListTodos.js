import React, { Fragment, useEffect, useState } from 'react'
import EditTodo from './EditTodo'

const ListTodos = () => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        getTodos();
    }, [])

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    }


    const deleteTodos = async (id) => {
        try {
            await fetch("http://localhost:5000/todos/"+id, {
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (error) {
            console.log(error.message);
        }

    }

    return(
        <Fragment>
            <table className="table table-striped mt-3 text-center">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr> */}
                    {todos.map(todo => (
                        <tr>
                            <td>{ todo.description }</td>
                            <td>
                                <EditTodo todo={todo} />{' '}
                                <button className="btn btn-danger" onClick={() => deleteTodos(todo.todo_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}

                    
                </tbody>
            </table>
        </Fragment>
    )
} 

export default ListTodos
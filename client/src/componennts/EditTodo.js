import React, { Fragment, useState } from 'react'

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description)
    const [deadline, setDeadline] = useState(todo.deadline)

    const updateTodo = async (e, id) => {
        e.preventDefault();
        try {
            const body = { description, deadline };
            await fetch("http://localhost:5000/todos/"+id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#todo${todo.todo_id}`} onClick={e => (setDescription(todo.description), setDeadline(todo.deadline))}>
                Edit
            </button>
            
            <div className="modal fade" id={`todo${todo.todo_id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Edit Todo</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={e => (setDescription(todo.description), setDeadline(todo.deadline)) }>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <input
                                    type="date"
                                    className="form-control"
                                    value={deadline}
                                    onChange={e => setDeadline(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={e => (
                                setDescription(todo.description),
                                setDeadline(todo.deadline)
                            ) }
                        >Close</button>
                        <button type="button" className="btn btn-primary" onClick={e => updateTodo(e, todo.todo_id)}>Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditTodo
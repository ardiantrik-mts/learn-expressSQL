import React, { Fragment, useState } from 'react'

const InputTodo = () => {
    const [description, setDesc] = useState("")
    const [deadline, setDeadline] = useState("")

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {description, deadline};
            await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (error) {
            console.log(error.message);
        }
    }

    return(
        <Fragment>
            <h1 className="text-center mt-5">INPUT TODO</h1>
            <form className="mt-5" onSubmit={onSubmitForm}>
                <div className="row text-center">
                    <div className="col-lg-5">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="What you want to do?"
                            value={description}
                            onChange={e => setDesc(e.target.value)}
                        />
                    </div>
                    <div className="col-lg-5">
                        <input
                            type="date"
                            className="form-control"
                            value={deadline}
                            onChange={e => setDeadline(e.target.value)}
                        />
                    </div>
                    <div className="col-lg-2">
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </form>
        </Fragment>
    )
    
}

export default InputTodo
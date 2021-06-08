import React, {useState} from "react";

const AddToDoItem = (props) => {

    const [newToDo, setNewToDo] = useState({"title": "", "content": ""});
    const handleChange = (e) => {
        return (setNewToDo((prev) => {
            return ({...prev, [e.target.name]: e.target.value})
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        props.onSubmit(newToDo);
        setNewToDo({"title": "", "content": ""})
    }

    return (<div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input name="title"
                   type="text"
                   placeholder="Title"
                   onChange={handleChange}/>
            <input name="content"
                   type="text"
                   placeholder="Description"
                   onChange={handleChange}/>
            <button type="submit" value="Submit">
                Add
            </button>
        </form>
    </div>)
}
export default AddToDoItem;

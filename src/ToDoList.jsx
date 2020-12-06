import React,{useState} from "react";
import InputField from "./InputField";

//array need not be sorted here
const ToDoList = (props) =>{
    const [newToDo,setNewToDo] = useState({});

    const handleDelete = (e,deltitle) =>{
     // send title to server to delete item

    }
    // render list of toDoItems
    //check the delete key
    const listItems = ()=>{

        props.todoList.map((tdl) =>
            <div key={tdl.title}>
                <p className={todotitle}>{tdl.title}</p>
                <p className={todocontent} >{tdl.content}</p>
                <button type = "button" onClick ={(e) =>{handleDelete(e,tdl.title)} }/>
            </div>);
    }
    // for  adding new ToDoItem

    const addItem = () =>{
        const handleChange = (name,value) =>{
            return(setNewToDo(prev =>{return({ ...prev , [name]: value})}))
        }
     // Submit for Add Item
        const handleSubmit = (evt) => {
            evt.preventDefault();
            // Handle submit later;;;
        }


        return <div>
            <form onSubmit ={ (e)=>{handleSubmit(e)}} >
                <InputField name="Title"
                            type ="text"
                            placeholder= "Title"
                            onChange = {handleChange} />
                <InputField name="message"
                            type ="text"
                            placeholder= "Announcement Message"
                            onChange = {handleChange} />
                <button type = "submit" value = "Submit" >
                    Add
                </button>
            </form>
        </div>
    }


    // elements returned from ToDoComponent
    return(
        <div>
            {(addItem)}
            {listItems}
        </div>
    )
}
export default ToDoList;
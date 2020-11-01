import React,{useState} from "react"
import InputField from "./InputField";

//array need not be sorted here
const ToDoList = (props) =>{
    const [newToDo,setNewToDo] = useState({});

    const handleDelete = (e,deltitle) =>{

    }

    const listItems = props.tdlist.map((tdl) =>
        <div>
            <p className={todotitle}>{tdl.title}</p>
            <p className={todocontent} >{tdl.content}</p>
            <button type = "button" onClick ={(e) =>{handleDelete(e,tdl.title)} }/>
        </div>);

    const addItem = () =>{
        const handleChange = (name,value) =>{
            return(setNewToDo(prev =>{return({ ...prev , [name]: value})}))
        }
        // Handle submit later;;;
        const handleSubmit = (evt) => {
            evt.preventDefault();
            alert(`Submitting Data ${newAnnounce}`);
            console.log(newAnnounce);
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
                    Post Announcement
                </button>
            </form>
        </div>
    }



    return(
        <div>
            {(addItem)}
            {listItems}
        </div>
    )
}
export default ToDoList;
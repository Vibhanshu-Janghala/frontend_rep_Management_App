import React,{useState} from "react";
import InputField from "./InputField";

const Workflow = (props) => {

    // WORKFLOW HANDLING

    // listen for getWorkflow
    socket.on("currentWorkflow", (value) => {
        //handle here
    })
    socket.on("updateCard",(value)=>{

    })
    socket.on("deleteCard",(value)=>{

    })
    socket.on("createList",(value)=>{

    })
    //get last updated workflow
    socket.emit("getWorkflow")

    socket.emit("updateWorkflow",
        null)
    socket.emit("createNewList",()=>{

    })
    socket.emit("deleteWorkflow",(value)=>{

    })

    //workflowList is array
    const [workflowList,setNewWorkflowList] = useState();

    //cards will render cards for a particular list
    const cards = (i) =>{
        for (let j =0;j<workflowList[i].content.length;j++){
           //add onClick to each card for popup
            return <div key={[i,j]}>
               {workflowList[i].content[j].title};
               {workflowList[i].content[j].description}
           </div>
        }

    }

    // render cards for each list
    const renderLists = () =>{
        for(let i =0;i<workflowList.length;i++){
            return(
                <div key={i}>
                    <h1>{workflowList[i]}</h1>
                    {cards(i)}
                </div>
            )
        }

    }
    // add new list
    const addList = () =>{
        const handleChange = (name,value) =>{
            return(setNewWorkflowList(prev =>{return({ ...prev , [name]: value})}))
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
                <button type = "submit" value = "Submit" >
                    Add
                </button>
            </form>
        </div>
    }

    return(
        <div>
            {renderLists}
            {addList}
        </div>
    )
}

export default Workflow ;
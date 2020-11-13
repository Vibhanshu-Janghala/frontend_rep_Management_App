import React,{useState} from "React";
import InputField from "./InputField";

const Workflow = (props) => {
    const [workflowList,setNewWorkflowList] = useState(props.ttodo);

    //cards will render cards for a particular list
    const cards = (i) =>{
        for (let j =0;j<workflowList[i].length;j++){
           //add onClick to each card for popup
            return <div key={[i,j]}>
               {workflowList[i][j].title};
               {workflowList[i][j].description}
           </div>
        }

    }

    // render cards for each list
    const renderLists = () =>{
        for(let i =0;i<workflowList.length;i++){
            return(
                <div key={i}>
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
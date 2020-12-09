import React,{useState} from "react";
import InputField from "./InputField";
import WorkflowCard from "./WorkflowCard";

// LIST HANDLING
const Workflow = (props) => {

    const socket =props.sockt;
    const [workflowList,setWorkflowList] = useState([]);

    // listen for getWorkflow
    socket.on("currentWorkflow", (value) => {
        setWorkflowList(value)
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

    const [currentCard,setCurrentCard]= useState({})
    const handleCardDisplay =(listName,cardTitle)=>{
      setCurrentCard({listName,cardTitle})
    }

    // render cards for each list
    const renderLists = () =>{
        for(let i =0;i<workflowList.length;i++){
            return(
                <div key={i}>
                    <h1>{workflowList[i]}</h1>
                    <WorkflowCard
                        cardList={workflowList[i]}
                        handleCardClick={handleCardDisplay}
                    />
                </div>
            )
        }

    }
    // handler when a card is clicked
    // title = List title, index = card index
    const  [cardInput,setCardInput] = useState({});
    const handleInput = (fieldName,fieldValue)=>{
        return setCardInput((prev)=>({...prev,[fieldName]:fieldValue}))
    }
    const [editMode,setEditMode] = useState(false);
    const displayCard = ()=>{
        const listIndex =workflowList.indexOf(currentCard.listName);
        if(listIndex !== -1){
        const card = workflowList[listIndex];
        return(<div>
            <InputField
                name={card.content.title}
                value={card.content.title}
                type="text"
                readOnly={editMode}
                onChange={handleInput}
            />
            <InputField
                name={card.title}
                value={card.title}
                type="text"
                readOnly={editMode}
                onChange={handleInput}
            />
            <div>
                <label htmlFor="description">Description</label>

                <textarea name="description"
                          rows="5" cols="33"
                           readOnly={editMode} onChange={handleInput} >
                    {card.content.description}
                </textarea>
            </div>


        </div>)
        }
        return null;
    }

    // add new list
    const [newList,setNewList]= useState({})
    const addList = () =>{
        const handleChange = (name,value) =>{
            setNewList({[name]:value})
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

    // Workflow return statement
    return(
        <div>
            {displayCard}
            {renderLists}
            {addList}
        </div>
    )
}

export default Workflow ;
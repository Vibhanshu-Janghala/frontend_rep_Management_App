import React,{useState} from "react";
import InputField from "./InputField";
import WorkflowCard from "./WorkflowCard";
import CardCheckbox from "./Card_Checkbox";

// LIST HANDLING
const Workflow = (props) => {

    const socket =props.sockt;
    const [workflowList,setWorkflowList] = useState([]);
    // emit a getWorkflow here
    // listen for Workflow
    socket.on("currentWorkflow", (value) => {
        setWorkflowList(value)
    })

    socket.on("updateCard",(data)=>{
        const listIndex = workflowList.indexOf(data.listName);
        const cardIndex = workflowList[listIndex].indexOf(data.cardTitle);
        const clonedForEdit = WorkflowCard[listIndex].content ;
        clonedForEdit.splice(cardIndex,1,data.card);
        setWorkflowList((prev)=>{
            prev.splice(listIndex,1,clonedForEdit);
            return prev
        })
    })
    socket.on("deleteCard",(data)=>{
        const listIndex = workflowList.indexOf(data.listName);
        const cardIndex = workflowList[listIndex].indexOf(data.cardTitle);
        const clonedForEdit = WorkflowCard[listIndex].content ;
        clonedForEdit.splice(cardIndex,1);
        setWorkflowList((prev)=>{
            prev.splice(listIndex,1,clonedForEdit);
            return prev
        })
    })
    socket.on("addNewList",(data)=>{
        setWorkflowList((prev)=>{
            prev.push(data)
            return prev
        })
    })


    const [currentCard,setCurrentCard]= useState({})
    const handleCardDisplay =(listName,cardTitle,isNew)=>{
      setCurrentCard({listName,cardTitle,isNew})
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

        const listIndex = workflowList.findIndex((item)=>item.listName===currentCard.listName);
        if(currentCard.isNew || listIndex !== -1){
            //if new card set Edit Mode true
         if(currentCard.isNew){setEditMode(true)}
        const cardIndex = workflowList[listIndex].content.indexOf(currentCard.cardTitle);
        setCardInput(cardIndex!== -1 ? workflowList[listIndex].content[cardIndex]:null)

            // handling Cards buttons
            // !! responsible for updating cards in workflow array
            const handleCardButton = (buttonName)=> {
                const data= {
                    "listName":currentCard.listName,
                    "title":currentCard.title,
                    "card":cardInput
                }
                const clonedForEdit = WorkflowCard[listIndex].content ;
                switch (buttonName) {
                    case "save":
                        socket.emit("updateWorkflow",data)
                        clonedForEdit.splice(cardIndex,1,cardInput);
                        setWorkflowList((prev)=>{
                            prev.splice(listIndex,1,clonedForEdit);
                            return prev
                        })
                        setEditMode(false);
                        break;
                    case "delete":
                        socket.emit("deleteWorkflow",data)
                        clonedForEdit.splice(cardIndex,1);
                        setWorkflowList((prev)=>{
                            prev.splice(listIndex,1,clonedForEdit);
                            return prev
                        })
                        setEditMode(false);
                        break;
                    case "cancel":
                        break;
                    default:
                    // code block
                }
            }

            return(<div>
            <InputField
                name="title"
                value={cardInput.title}
                type="text"
                readOnly={editMode}
                onChange={handleInput}
            />
            <div className="listName" > {currentCard.listName} </div>

            <div>
                <label htmlFor="description">Description</label>

                <textarea name="description"
                          rows="5" cols="33"
                           readOnly={editMode} onChange={handleInput} >
                    {cardInput.description}
                </textarea>
            </div>
            <CardCheckbox edit={editMode}
                onChange={handleInput}
                checkList={cardInput.progressList}
            />
            {
                editMode?<div>
                        <button name="save-card"
                                onClick={(e)=>{handleCardButton("save")}} >
                        Save
                        </button>
                        <button name="cancel-card"
                                onClick={(e)=>{handleCardButton("cancel")}}>
                        Cancel
                        </button>
                    </div>
                    :
                    <div>
                        <button name="edit-card"
                        onClick={setEditMode((prev)=>!prev)} >
                        Edit
                        </button>
                        <button name="delete-card" onClick={(e)=>{handleCardButton("delete")}}>
                        Delete
                        </button>
                    </div>
            }
            <InputField name="managed"
                value={cardInput.managedBy}
                onChange={handleInput}
                readOnly={editMode}
                type="text"
                label ="Managed By"
            />
            <InputField name="priority"
                        value={cardInput.cardPriority}
                        onChange={handleInput}
                        readOnly={editMode}
                        type="text"
                        label ="Priority"
            />
            <input type="date" name="dueDate" placeholder={cardInput.dueDate}
                   readOnly={editMode} onChange={handleInput} />

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
        socket.emit("createList",newList);
        setWorkflowList((prev)=>prev.push(newList));
        setNewList([]);
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
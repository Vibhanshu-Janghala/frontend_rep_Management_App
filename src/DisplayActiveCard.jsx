import InputField from "./InputField";
import CardCheckbox from "./CardCheckbox";
import React,{useState} from "react";


// props contain listName,newCard,cardTitle, card and Updater function
const DisplayActiveCard = (props)=>{

    const [editMode,setEditMode] = useState(false);
    const  [cardInput,setCardInput] = useState(props.card);
    const handleInput = (fieldName,fieldValue)=>{
        return setCardInput((prev)=>({...prev,[fieldName]:fieldValue}))
    }

        //if new card set Edit Mode true
        if(props.newCard){
            setEditMode(true)
        }
        function handleCardButton(button){
            switch (button){
                case "save":
                    props.onButtonClick(button,cardInput,props.newCard)
                    setEditMode(()=>false);
                    break;
                case "delete":
                    props.onButtonClick(button,null,props.newCard)
                    break;
                case "cancel":
                    setCardInput(props.card);
                    setEditMode(()=>false);
                    break;
                case "closeCard":
                    props.onButtonClick(button,null,null)
                    break;
                default:
                    console.log("No Case Match for card button")
                    break;
            }
        }

        return(
            <div>
                <button type="button" onClick={()=>handleCardButton("cancel")}>
                    Close Card
                </button>
                <InputField
                     name="title"
                     value={cardInput.title}
                     type="text"
                     readOnly={editMode}
                     onChange={handleInput}
                />
                <div > {props.listName} </div>

                <div>
                    <label htmlFor="description"> Description </label>
                    <textarea name="description"
                              id={"description"}
                              rows="5" cols="33"
                              readOnly={editMode}
                              onChange={handleInput} >
                        {cardInput.description}
                     </textarea>
                </div>
            <CardCheckbox edit={editMode}
                          onChange={handleInput}
                          checkList={cardInput.progressList}
            />
            <div>
            {
                editMode?<div>
                        <button name="save-card"
                                onClick={()=>{handleCardButton("save")}} >
                            Save
                        </button>
                        <button name="cancel-card"
                                onClick={()=>{handleCardButton("cancel")}}>
                            Cancel
                        </button>
                    </div>
                    :
                    <div>
                        <button name="edit-card"
                                onClick={setEditMode((prev)=>!prev)} >
                            Edit
                        </button>
                        <button name="delete-card" onClick={()=>{handleCardButton("delete")}}>
                            Delete
                        </button>
                    </div>
            }
            </div>
            <InputField name="managedBy"
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
            <InputField type="date"
                        name="dueDate"
                        placeholder={cardInput.dueDate}
                        readOnly={editMode}
                        onChange={handleInput}
            />

        </div>)

}
export default DisplayActiveCard;
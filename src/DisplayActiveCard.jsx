import CardCheckbox from "./CardCheckbox";
import {useState} from "react";
import {useProfile} from "./ProfileContext";


// props contain listName,newCard,cardTitle, card and Updater function
const DisplayActiveCard = (props) => {
    const {profileData} = useProfile();
    const [editMode, setEditMode] = useState(props.newCard);
    const [cardInput, setCardInput] = useState({...props.card});
    const handleInput = (e) => {
        return setCardInput((prev) => ({...prev, [e.target.name]: e.target.value}));
    }
    console.log("here edit")
 console.log(cardInput);
    //if new card set Edit Mode true
    const handleSubmit = (e)=>{
        e.preventDefault();
        props.onButtonClick("save", cardInput, props.newCard);
        setEditMode(() => false);

    }

    const handleCardButton = (button) => {
        switch (button) {

            case "delete":
                props.onButtonClick("delete", null, props.newCard);
                setEditMode(() => false);
                break;
            case "cancel":
                setCardInput(props.card);
                setEditMode(() => false);
                break;
            case "closeCard":
                props.onButtonClick("closeCard", null, null);
                setEditMode(() => false);
                break;
            default:
                console.log("No Case Match for card button")
                break;
        }
    }

    // ADD ROWS AND COLUMN TO TEXTAREA LATER
    return (
        <div>
            <form onSubmit={(e)=> handleSubmit(e)}>

                <input
                    name="title"
                    value={cardInput.title}
                    type="text"
                    disabled={!editMode}
                    onChange={handleInput}
                />

                <button type="button" onClick={() => handleCardButton("closeCard")}>
                    Close Card
                </button>

                <div> {props.listName} </div>

                <div>
                    <label htmlFor="description"> Description </label>
                    <textarea name="description"
                              id={"description"}
                              disabled={!editMode}
                              value={cardInput.description}
                              onChange={handleInput}>
                        {cardInput.description}
                     </textarea>
                </div>
                <CardCheckbox edit={editMode}
                              onChange={handleInput}
                              checkList={cardInput.progressList}
                />
                <div>
                    {(profileData.level === 2 || profileData.level === 1) ?
                        editMode ? <div>
                                <button name="save-card"
                                        type="submit" value="Submit"
                                        >
                                    Save
                                </button>
                                <button name="cancel-card"
                                        onClick={() => {
                                            handleCardButton("cancel")
                                        }}>
                                    Cancel
                                </button>
                            </div>
                            :
                            <div>
                                <button name="edit-card"
                                        onClick={setEditMode((prev) => !prev)}>
                                    Edit
                                </button>
                                <button name="delete-card" onClick={() => {
                                    handleCardButton("delete")
                                }}>
                                    Delete
                                </button>
                            </div> : null
                    }
                </div>
                <label htmlFor="managedBy">Managed by :</label>
                <input name="managedBy"
                       value={cardInput.managedBy}
                       onChange={handleInput}
                       disabled={!editMode}
                       type="text"
                />
                <label htmlFor="priority">Task Priority</label>
                <input name="priority"
                       value={cardInput.priority}
                       onChange={handleInput}
                       disabled={!editMode}
                       type="text"
                />
                <input type="date"
                       name="dueDate"
                       value={cardInput.dueDate}
                       disabled={!editMode}
                       onChange={handleInput}
                />
            </form>
        </div>);

}
export default DisplayActiveCard;
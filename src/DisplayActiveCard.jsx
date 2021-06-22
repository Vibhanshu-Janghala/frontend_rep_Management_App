import CardCheckbox from "./CardCheckbox";
import { useState} from "react";
import {useProfile} from "./ProfileContext";


// props contain listName,newCard,cardTitle, card and Updater function
const DisplayActiveCard = (props) => {
    const {profileData} = useProfile();
    const newCard = props.newCard;
    const [editMode, setEditMode] = useState(false);
    //const initialInput = {...(props.card)}
    const [cardInput, setCardInput] = useState({...(props.card)});
    const handleInput = (e) => {
        return setCardInput((prev) => ({...prev, [e.target.name]: e.target.value}));
    }
    const handleSubmit = ()=>{
        props.onButtonClick("save", cardInput, newCard);
    }
    const handleDeleteButton = ()=>{
        props.onButtonClick("delete", null, newCard);
    }
    const handleCancelButton = ()=>{
        setCardInput({...(props.card)});
        setEditMode(false);
    }
    const handleCloseCard = ()=>{
        props.onButtonClick("closeCard", null, null);
    }
    const handleEditToggle =  ()=>{
        setEditMode(true);
    }

    // ADD ROWS AND COLUMN TO TEXTAREA LATER
    return (
        <div>
            <div>

                <input
                    name="title"
                    value={cardInput.title}
                    type="text"
                    disabled={!(editMode||newCard)}
                    onChange={handleInput}
                />

                <button type="button" onClick={handleCloseCard}>
                    Close Card
                </button>

                <div> {props.listName} </div>

                <div>
                    <label htmlFor="givenDescription"> Description </label>
                    <textarea name="givenDescription"
                              id={"givenDescription"}
                              disabled={!(editMode||newCard)}
                              value={cardInput.givenDescription}
                              onChange={handleInput}>
                        {cardInput.givenDescription}
                     </textarea>
                </div>
                <CardCheckbox edit={(editMode||newCard)}
                              onChange={handleInput}
                              checkList={cardInput.progressList}
                />
                <div>
                    {(profileData.level === 2 || profileData.level === 1) ?
                        (editMode||newCard) ? <div>
                                <button name="save-card"
                                        type="button"
                                        onClick={handleSubmit}>
                                    Save
                                </button>
                                <button name="cancel-card"
                                        type="button"
                                        onClick={ handleCancelButton }>
                                    Cancel
                                </button>
                            </div>
                            :
                            <div>
                                <button name="edit-card"
                                        type="button"
                                        onClick={ handleEditToggle } >
                                    Edit
                                </button>
                                <button name="delete-card"
                                        type="button"
                                        onClick={ handleDeleteButton } >
                                    Delete
                                </button>
                            </div> : null
                    }
                </div>
                <label htmlFor="managedBy">Managed by :</label>
                <input name="managedBy"
                       value={cardInput.managedBy}
                       onChange={handleInput}
                       disabled={!(editMode||newCard)}
                       type="text"
                />
                <label htmlFor="priority">Task Priority</label>
                <input name="priority"
                       value={cardInput.priority}
                       onChange={handleInput}
                       disabled={!(editMode||newCard)}
                       type="text"
                />
                <input type="date"
                       name="dueDate"
                       value={cardInput.dueDate}
                       disabled={!(editMode||newCard)}
                       onChange={handleInput}
                />
            </div>
        </div>);

}
export default DisplayActiveCard;
import {useState,useEffect} from "react";
import WorkflowCard from "./WorkflowCard";
import DisplayActiveCard from "./DisplayActiveCard";
import {useProfile} from "./ProfileContext";
import AddWorkflowList from "./AddWorkflowList";

// LIST HANDLING
const Workflow = (props) => {
    const {profileData} = useProfile();
    const socket = props.sockt;
    const [workflowList, setWorkflowList] = useState([]);
    // emit a getWorkflow here
    useEffect(()=> {
        socket.emit("getWorkflow")},[]);
    // listen for Workflow
    socket.on("currentWorkflow", (value) => {
        setWorkflowList(value);
    });


    const addList = (data) => {
        setWorkflowList((prev) => {
            return [...prev, {"listName": data.listName, "content": []}];
        });
    }

    const deleteList = (data) => {
        let cloneList = workflowList.filter(
            (item) => item.listName !== data.listName);
        setWorkflowList(() => cloneList);
    }

    // List Handling with Socket
    socket.on("createNewList", (data) => addList(data));
    socket.on("deleteThisList", (data) => deleteList(data));

    const createNewCard = (data) => {

        console.log(data)
        let listIndex ;
        workflowList.forEach((item, index) => {
            if (item.listName === data.listName) {
                listIndex = index;
            }
        });
        console.log(listIndex);
        console.log(workflowList);
        const newContentArr = [...workflowList[listIndex].content, data.card];

        setWorkflowList((prev) => {
            let newArr = [...prev];
            newArr.splice(listIndex, 1,
                {"listName": data.listName, "content": newContentArr});
            return newArr;
        });
    }

    const updateCard = (data) => {
        let [listIndex, cardIndex] = [-1,-1];
        workflowList.forEach((item, index) => {
            if (item.listName === data.listName) {
                workflowList[index].content.forEach((item, i) => {
                    if (item.title === data.title) [listIndex,cardIndex]= [index, i];
                });
            }
        });
        const newContentArr = workflowList[listIndex].content;
        newContentArr.splice(cardIndex, 1, data.card);
        setWorkflowList((prev) => {
            let newArr = [...prev];
            newArr.splice(listIndex, 1,
                {"listName": data.listName, "content": newContentArr});
            return newArr;
        });
    }

    const deleteCard = (data) => {
        let [listIndex, cardIndex] = [-2,-2];
        workflowList.forEach((item, index) => {
            if (item.listName === data.listName) {
                workflowList[index].content.forEach((item, i) => {
                    if (item.title === data.title) [listIndex,cardIndex]= [index, i];
                });
            }
        });
        const newContentArr = workflowList[listIndex].content;
        newContentArr.splice(cardIndex, 1);
        setWorkflowList((prev) => {
            let newArr = [...prev];
            newArr.splice(listIndex, 1,
                {"listName": data.listName, "content": newContentArr});
            return newArr;
        });
    }

    // Card Handling with Socket
    socket.on("newCard", (data) => createNewCard(data));

    socket.on("updateCard", (data) => updateCard(data));

    socket.on("deleteCard", (data) => deleteCard(data));


    const [currentCard, setCurrentCard] = useState({});

    const handleCardDisplay = (listName, cardTitle, newCard, indexArr) => {
        setCurrentCard({listName, cardTitle, newCard, indexArr});
    }

    // render cards for each list and handle List Delete
    const handleListDelete = (e) => {
        let data = {"listName":e.target.getAttribute("name-custom")};
        socket.emit("deleteList", data, (response) => {
            if (response.status === 200) deleteList(data);
            else console.log("Error while deleting list");
        });
    }
    const renderLists = workflowList.map((item, index) => {
            return (
                <div key={item.listName}>
                    <h1>{item.listName}</h1>
                    {profileData.level === 2 ? <button type="button"
                                                       name-custom={item.listName}
                                                       onClick={(e) => handleListDelete(e)}>
                        Delete List
                    </button> : null}
                    <WorkflowCard
                        cardList={item}
                        handleCardClick={handleCardDisplay}
                        listIndex={index}
                    />
                </div>
            );
        })


    // display active card and handle its operations
    const handleCardClick = (button, cardInput, isNew)=> {
        let data = {
            "listName": currentCard.listName,
            "title": currentCard.title,
            "card": cardInput
        }
        if (button === "save" && isNew === true) {
            socket.emit("addWorkflow", (data), (response) => {
                if (response.status === 200) createNewCard(data);
                else console.log("Error occurred while adding Card")
            });
        } else if (button === "save" && isNew === false) {
            socket.emit("updateWorkflow", (data), (response) => {
                if (response.status === 200) updateCard(data);
                else console.log("Error occurred while updating Card");
            });
        } else if (button === "delete") {
            socket.emit("deleteWorkflow", data, (response) => {
                if (response.status === 200) deleteCard(data);
                else console.log("Error occurred while deleting Card");
            });
        } else if (button === "closeCard") {
            setCurrentCard(() =>{
                return({"listName":null})
            });
        }
    }

    const getCurrentCard = () => {
        // check if index matches with card
        if(!currentCard.newCard) {
            let listMatch = workflowList[currentCard.indexArr[0]];
            if (listMatch.listName === currentCard.listName) {
                let cardCopy = listMatch.content[currentCard.indexArr[1]]
                if (cardCopy.title === currentCard.cardTitle) {
                    return cardCopy;
                } else {
                    console.log("Error: Mismatch for card");
                    return null;
                }
            } else {
                console.log("Error: Index mismatch for List Name");
                return null;
            }
        }
        else{
            const today = new Date().toISOString().slice(0, 10)
            return {
                    "title": "",
                    "description": "",
                    "priority": "",
                    "progressList": [],
                    "managedBy" :"",
                    "dueDate" : today
                }
        }
    }

    const handleNewListSubmit = (newList)=>{

        socket.emit("createList", newList, (response) => {
            if (response.status === 200) {
                addList(newList);

            }
            else console.log("Error while adding List");

        });
    }

console.log(currentCard)
    // Workflow return statement
    return (
        <div>
            {currentCard.listName == null ? null : <DisplayActiveCard
                listName={currentCard.listName}
                cardTitle={currentCard.title}
                newCard={currentCard.newCard}
                onButtonClick={handleCardClick}
                card={getCurrentCard()}
            /> }
            {renderLists}
            {profileData.level === 2 ? <AddWorkflowList onSubmit={handleNewListSubmit} /> : null}
        </div>
    );
}

export default Workflow;
import React,{useState} from "react";
import InputField from "./InputField";
import WorkflowCard from "./WorkflowCard";
import DisplayActiveCard from "./DisplayActiveCard";

// LIST HANDLING
const Workflow = (props) => {

    const socket =props.sockt;
    const [workflowList,setWorkflowList] = useState([]);
    // emit a getWorkflow here
    socket.emit("getWorkflow");
    // listen for Workflow
    socket.on("currentWorkflow", (value) => {
        setWorkflowList(value)
    })
    // List Handling with Socket
    socket.on("addThisList", (data)=>addList(data));
    socket.on("deleteThisList",(data)=>deleteList(data));

    function addList(data){
        setWorkflowList((prev)=>{
            prev.push(data)
            return prev ;
        })
    }
    function deleteList(data){
       let listIndex = workflowList.forEach((item,index)=>{
                if(item.listName===data.listName)return index;
            });
       setWorkflowList((prev)=>{
           prev.splice(listIndex,1);
           return prev;
       })
    }

    // Card Handling with Socket
    socket.on("addCard",(data)=>createNewCard(data))

    socket.on("updateCard",(data)=>updateCard(data))

    socket.on("deleteCard",(data)=>deleteCard(data))

    function createNewCard(data){
        const listIndex = workflowList.forEach((item,index)=>{
            if(item.listName === data.listName)return index;
        });
        const newContentArr = [...WorkflowCard[listIndex].content,data.card] ;

        setWorkflowList((prev)=>{
            prev.splice(listIndex,1,{"listName":data.listName,"content":newContentArr});
            return prev;
        })
    }

    function updateCard(data){
        const listIndex = workflowList.forEach((item,index)=>{
            if(item.listName===data.listName)return index;
        });
        const cardIndex = workflowList[listIndex].content.forEach((item,index)=>{
            if(item.title===data.title)return index;
        });
        const clonedForEdit = WorkflowCard[listIndex].content ;
        clonedForEdit.splice(cardIndex,1,data.card);
        setWorkflowList((prev)=>{
            prev.splice(listIndex,1,{"listName":data.listName,"content":clonedForEdit});
            return prev;
        })
    }

    function deleteCard(data){
        const listIndex = workflowList.forEach((item,index)=>{
            if(item.listName===data.listName)return index;
        });
        const cardIndex = workflowList[listIndex].content.forEach((item,index)=>{
            if(item.title===data.title)return index;
        });
        const clonedForEdit = WorkflowCard[listIndex].content ;
        clonedForEdit.splice(cardIndex,1);
        setWorkflowList((prev)=>{
            prev.splice(listIndex,1,{"listName":data.listName,"content":clonedForEdit});
            return prev;
        })
    }


    const [currentCard,setCurrentCard]= useState({})
    const handleCardDisplay =(listName,cardTitle,newCard,indexArr)=>{

      setCurrentCard({listName,cardTitle,newCard,indexArr})
    }

    // render cards for each list and handle List Delete
    const handleListDelete = (e)=>{
        let data = e.target.getAttribute("name-custom");
        socket.emit("deleteList",data,(response)=>{
            if(response.status===200)deleteList(data);
            else console.log("Error while deleting list");
        })
    }
    const renderLists = () =>{
        workflowList.forEach((item,index)=>{
            return(
                <div key={item.listName}>
                    <h1>{item.listName}</h1>
                    <button type="button"
                            name-custom={item.listName}
                            onClick={(e)=>handleListDelete(e)}>
                        Delete List
                    </button>
                    <WorkflowCard
                        cardList={item}
                        handleCardClick={handleCardDisplay}
                        listIndex={index}
                    />
                </div>
            )
        })

    }
    // display active card and handle its operations
    function handleCardClick(button,cardInput,isNew){
        let data ={
            listName:currentCard.listName,
            title:currentCard.title,
            card:cardInput
        }
        if(button === "save" && isNew === true){
            socket.emit("addWorkflow",(data),(response)=>{
                if(response.status===200)createNewCard(data);
                else console.log("Error occurred while adding Card")
            })
        }
        else if(button === "save" && isNew === false){
            socket.emit("updateWorkflow",(data),(response)=>{
                if(response.status === 200)updateCard(data);
                else console.log("Error occurred while updating Card");
            });
        }
        else if(button === "delete"){
            socket.emit("deleteWorkflow",data,(response)=>{
                if(response.status === 200)deleteCard(data);
                else console.log("Error occurred while deleting Card");
            })
        }
        else if(button==="closeCard"){
            setCurrentCard(()=>null);
        }
    }
    const displayCard = ()=>{
        // check if index matches with card
        let listMatch = workflowList[currentCard.indexArr[0]];
        if( listMatch.listName ===currentCard.listName){
            let cardCopy = listMatch.content[currentCard.indexArr[1]]
            if(cardCopy.title === currentCard.cardTitle ){
                return(
                    <DisplayActiveCard
                        listName={currentCard.listName}
                        cardTitle={currentCard.title}
                        newCard={currentCard.newCard}
                        onButtonClick={handleCardClick}
                        card={cardCopy}
                    />
                )
            }
            else{
                console.log("Error: Mismatch for card")
            }
        }
        else{
            console.log("Index mismatch for List Name")
        }
    }


    // add new list
    const [newList,setNewList]= useState({})
    const handleChange = (name,value) =>{
        setNewList({[name]:value})
    }

    const createList = () =>{

        // Submit for Add Item
        const handleSubmit = (e) => {
            e.preventDefault();
            socket.emit("addList",newList,(response)=>{
                if(response.status === 200)addList(newList);
                else console.log("Error while adding List")
            });
        }

        return <div>
                <InputField name="Title"
                            type ="text"
                            placeholder= "Title"
                            onChange = {handleChange} />
                <button type = "submit"
                        value = "Submit"
                        onClick={(e)=>handleSubmit(e)}>
                    Add
                </button>

        </div>
    }

    // Workflow return statement
    return(
        <div>
            {displayCard}
            {renderLists}
            {createList}
        </div>
    )
}

export default Workflow ;
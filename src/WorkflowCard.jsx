import React from "react";

// INDIVIDUAL CARD HANDLING

const WorkflowCard = (props)=> {
    // cardList ={ listName,content: [cards] }
    const cardList = props.cardList;
    const handleClick = (e,newCard)=>{
        return props.handleCardClick(e.target.getAttribute("data-parent")
                    ,e.target.id,newCard,
            [props.listIndex,e.target.getAttribute("index-card-custom")]);
    }

    //cards will render cards for a particular list
    const cards = () => {

        (cardList.content).forEach((item,index)=>{
            return(
                <div key={item.title} id={item.title}
                     data-parent={cardList.listName}
                     index-card-custom={index}
                     onClick={(e)=>handleClick(e,false)}>
                    {item.title}
                    <div>{"Managed By: "+item.managedBy}</div>
                    <div>{"Priority: "+item.priority}</div>
                </div>
            );
        });
    }

    return(
        <div>
            <button type="button"
                    id={null}
                    data-parent = {cardList.listName}
                    onClick={(e)=>handleClick(e,true)}>
                Add card
            </button>
            {cards}
        </div>
    )
}

export default WorkflowCard;





import React from "react";

// INDIVIDUAL CARD HANDLING

const WorkflowCard = (props)=> {
    // cardList ={ listName, [cards] }
    const cardList = props.cardList;
    const handleClick = (e)=>{
        if(e!=null) {
        return props.handleCardClick(e.target.getAttribute("data-parent"), e.target.id,false);
        }
        return props.handleCardClick(null,null,true);
    }

    //cards will render cards for a particular list
    const cards = () => {

        cardList.content.map((item)=>{
            return( (<div key={item.title} id={item.title}
                          data-parent={cardList.title} onClick={(e)=>handleClick(e)}>
                    {item.title}
                    </div>)
            )
        })
    }

    return(
        <div>
            <button type="button"
                    onClick={handleClick(null)}>
                Add card
            </button>
            {cards}
        </div>
    )
}

export default WorkflowCard;





// INDIVIDUAL CARD HANDLING

import {useProfile} from "./ProfileContext";

const WorkflowCard = (props) => {
    // cardList ={ listName,content: [cards] }
    const {profileData} = useProfile();
    const cardList = props.cardList;
    const handleClick = (e, newCard) => {
        if(!newCard) {
            return props.handleCardClick(e.target.getAttribute("data-parent")
                , e.target.id, newCard,
                [props.listIndex, e.target.getAttribute("index-card-custom")]);
        }
        else{
            return props.handleCardClick(e.target.getAttribute("data-parent"),
                null,newCard,
                [props.listIndex,null]);
        }
    }

    //cards will render cards for a particular list
    const cards =
        (cardList.content).map((item, index) => {
            return (
                <div key={item.title} id={item.title}
                     data-parent={cardList.listName}
                     index-card-custom={index}
                     onClick={(e) => handleClick(e, false)}>

                    {item.title}
                    {"Managed By: " + item.managedBy}
                    {"Priority: " + item.priority}
                </div>
            );
        });

    return (
        <div>
            {(profileData.level ===1 || profileData.level === 2)?<button type="button"
                     id={null}
                     data-parent={cardList.listName}
                     onClick={(e) => handleClick(e, true)}>
                Add card
            </button>:null}
            {cards}
        </div>
    )
}

export default WorkflowCard;





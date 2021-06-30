// INDIVIDUAL CARD HANDLING

import {useProfile} from "./ProfileContext";

const WorkflowCard = (props) => {
    // cardList ={ listName,content: [cards] }
    const {profileData} = useProfile();
    const cardList = props.cardList;
    const handleClick = (e, newCard) => {
        if (!newCard) {
            return props.handleCardClick(e.target.getAttribute("data-parent")
                , e.target.id, newCard,
                [props.listIndex, e.target.getAttribute("index-card-custom")]);
        } else {
            return props.handleCardClick(e.target.getAttribute("data-parent"),
                null, newCard,
                [props.listIndex, null]);
        }
    }

    //cards will render cards for a particular list
    const cards =
        (cardList.content).map((item, index) => {
            return (
                <div key={item.title}
                     className={"card-container"}>
                    <div id={item.title}
                         className={"clickable-div"}
                         data-parent={cardList.listName}
                         index-card-custom={index}
                         onClick={(e) => handleClick(e, false)}>{item.title}</div>
                    <div><span>Managed By:  </span><div> {item.managedBy}</div></div>
                    <div><span>Priority:  </span><div> {item.priority}</div></div>
                </div>
            );
        });

    return (
        <div className={"list-container"} >
            {(profileData.level === 1 || profileData.level === 2) ?
                <button type="button"
                        id={null}
                        data-parent={cardList.listName}
                        onClick={(e) => handleClick(e, true)}>
                    Add Card
                </button> : null}
            {cards}

        </div>
    )
}

export default WorkflowCard;





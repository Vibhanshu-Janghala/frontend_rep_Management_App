import {useProfile} from "./ProfileContext";

const ChatWindow = (props) => {

    let {profileData} = useProfile();

    let messageDiv = props.chatContent.map((item) => {
        console.log(item)
        if (item.sender === profileData.name) {
            return (
                <li key={item.timeStamp} className="self">
                    <div className="msg">
                        <div className="user">Me</div>
                        <p>{item.message}</p>
                        <time>{new Date(item.timeStamp).toLocaleTimeString().slice(0,5)}</time>
                    </div>
                </li>
            );
        }
        return (
            <li key={item.timeStamp} className="others">
                <div className="msg">
                    <div className="user">{item.sender}</div>
                    <p>{item.message}</p>
                    <time>{new Date(item.timeStamp).toLocaleTimeString().slice(0,5)}</time>
                </div>
            </li>
        );
    });


    return (
        <div className={"chat-window"}>
            <h2>{props.chatTitle}</h2>
            <ol className={"chat"}>{messageDiv}</ol>
        </div>
    );
}
export default ChatWindow;
import {useProfile} from "./ProfileContext";

const ChatWindow = (props) => {

    let {profileData} = useProfile();

    let messageDiv = props.chatContent.map((item) => {
        if (item.sender === profileData.name) {
            return (
                <div className="iSent">
                    <span>{item.sender}</span>
                    <span>{item.message}</span>
                </div>
            );
        }
        return (
            <div className="othersSent">
                <span>{item.sender}</span>
                <span>{item.message}</span>
            </div>
        );
    });


    return (
        <div>
            <div>{props.chatTitle}</div>
            <div>{messageDiv}</div>
        </div>
    );
}
export default ChatWindow;
import React, {useEffect, useState} from "react";
import AddAnnouncement from "./AddAnnouncement";
import {useProfile} from "./ProfileContext";
import "./Announcement.css" ;
import {ReactComponent as DeleteSVG} from "./svgs/trash-solid.svg";

const Announcement = () => {
    // get Announcements at start
    const [announcements, setAnnouncements] = useState([]);
    let {profileData} = useProfile();
    useEffect(() => {
        fetchAnnouncement().catch((e) => console.log("Error :-" + e));
    }, []);

    async function fetchAnnouncement() {
        let response = await fetch("/api/announcement",
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': JSON.stringify(profileData)
                },
                credentials: "include",
                cache: 'no-cache',
                referrerPolicy: 'no-referrer'
            });
        if (response.status === 200) {
            const jsResponse = await response.json();
            setAnnouncements(()=>jsResponse);
        } else {
            console.log("Error while fetching announcement")
        }
    }

    // handle deletion of Announcements
    async function handleAnnounceDelete(e) {
        e.preventDefault();
        let index = e.target.parentNode.parentNode.getAttribute("index-custom");
        let title = e.target.parentNode.parentNode.getAttribute("title-custom");
        if (announcements[index].title === title) {
            let response = await fetch("/api/announcement/delete",
                {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': JSON.stringify(profileData)
                    },
                    credentials: "include",
                    cache: 'no-cache',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify({"title": title})
                });
            if (response.status === 200) {
                let arrClone = announcements.filter((item) => (item.title) !== title);
                setAnnouncements(arrClone);
                console.log("Successfully deleted");
            } else {
                console.log("Some error occurred");
            }
        }
    }

    // Display the announcements list
    const listItems = announcements.map((a, i) => {
        return (
            <div key={a.title} className={"announcement-box"}>
                <span>{a.title}</span>
                {(profileData.level === 2) ?
                    (<button type="button"
                             title-custom={a.title}
                             index-custom={i}
                             onClick={(e) => handleAnnounceDelete(e)}>
                        <DeleteSVG  />
                    </button>) : null
                }
                <p>{a.description}</p>

            </div>);
    })

    // Handle addition of new Announcements
    async function submitNewAnnouncement(newAnnounce) {
        let response = await fetch("/api/announcement/add",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': JSON.stringify(profileData)
                },
                credentials: "include",
                cache: 'no-cache',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(newAnnounce)
            });
        if (response.status === 200) {
            setAnnouncements((prev) => [...prev, newAnnounce]);
            console.log("Successfully Created Announcement");
        } else {
            console.log("Some Error occurred");
        }
    }

    //re render when listItems change

    return (
        <div className={"announcement-main"}>
            <div >
                <div>{(profileData.level === 2) ? <div><h3>Add Announcement</h3></div> : <></>}</div>
                <div>{(profileData.level === 2) ? <AddAnnouncement onSubmit={submitNewAnnouncement}/> : <></>}</div>
            </div>
            <div >
                <div><h3>Recent Announcements</h3></div>
                <div className={"announcement-list"}>{listItems}</div>
            </div>
        </div>
    )
}
export default Announcement;
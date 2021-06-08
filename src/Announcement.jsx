import React, {useEffect, useState} from "react";
import AddAnnouncement from "./AddAnnouncement";
import {useProfile} from "./ProfileContext";


const Announcement = () => {
    // get Announcements at start
    const [announcements, setAnnouncements] = useState([]);
    let {profileData} = useProfile();
    useEffect(() => {
        console.log("RUNNING USE EFFECT")
        fetchAnnouncement().catch((e) => console.log("Error :-" + e));
    }, []);

    async function fetchAnnouncement() {
        let response = await fetch("http://localhost:8080/api/announcement",
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': JSON.stringify(profileData)
                },
                credentials: "include",
                cache: 'no-cache',
                referrerPolicy: 'no-referrer',
                mode: "cors",

            });
        if (response.status === 200) {
            const jsResponse = await response.json();
            setAnnouncements(jsResponse);
        } else {
            console.log("Error while fetching announcement")
        }
    }

    // handle deletion of Announcements
    async function handleAnnounceDelete(e) {
        e.preventDefault();
        let index = e.target.getAttribute("index-custom");
        let title = e.target.getAttribute("title-custom");
        if (announcements[index].title === title) {
            let response = await fetch("http://localhost:8080/api/announcement/delete",
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
                    mode: "cors",
                    body: JSON.stringify({"title":title})
                });
            if (response.status === 200) {
                let arrClone = announcements.filter((item)=>(item.title)!==title);
                setAnnouncements(arrClone);
                console.log("Successfully deleted");
                console.log(announcements);
            } else {
                console.log("Some error occurred");
            }
        }
    }

    // Display the announcements list
    const listItems = announcements.map((a, i) => {
        return (
            <div key={a.title}>
                <p>{a.title}</p>
                <p>{a.description}</p>
                {(profileData.level === 2) ?
                    (<button type="button"
                             title-custom={a.title}
                             index-custom={i}
                             onClick={(e) => handleAnnounceDelete(e)}>
                        Delete
                    </button>) : null
                }
            </div>);
    })

    // Handle addition of new Announcements
    async function submitNewAnnouncement(newAnnounce) {
        let response = await fetch("http://localhost:8080/api/announcement/add",
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
                mode: "cors",
                body: JSON.stringify(newAnnounce)
            });
        if (response.status === 200) {
            setAnnouncements((prev) =>[...prev, newAnnounce]);
            console.log("Successfully Created");
        } else {
            console.log("Some Error occurred");
        }
    }

    //re render when listItems change

    return (
        <div>
            <div>{(profileData.level === 2) ? <AddAnnouncement onSubmit={submitNewAnnouncement}/> : <></>}</div>
            <div>{listItems}</div>
        </div>
    )
}
export default Announcement;
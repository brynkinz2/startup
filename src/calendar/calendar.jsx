import React from 'react';
import './calendar.css';


export function Calendar({userName}) {
    const [friendUser, setFriend] = React.useState(localStorage.getItem(userName) || '');         // Friend name
    const [friendsList, setFriendsList] = React.useState([]);
    const [displayError, setDisplayError] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false); // State to track if the modal is open
    const [eventDetails, setEventDetails] = React.useState({
        title: '',
        time: '',
        date: '',
        place: ''
    }); // Store event details
    const [events, setEvents] = React.useState([]);
    const [msg, setMsg] = React.useState('Friends events will also appear here.');

    React.useEffect(() => {
        fetch(`/api/events?username=${userName}`)
            .then((response) => response.json())
            .then((data) => {
                setEvents(data.events);
            });
    }, []);

    React.useEffect(() => {
        fetch(`/api/user/friendsList?username=${userName}`)
            .then((response) => response.json())
            .then((data) => {
                // Ensure friendsList is an array, defaulting to empty array if undefined
                setFriendsList(data.friendsList || []);
            })
            .catch((error) => {
                console.error("Error fetching friends list:", error);
                setFriendsList([]); // Set to empty array in case of error
            });
    }, [userName]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    // Open the modal
    function openModal() {
        setIsModalOpen(true);
    };

    // Close the modal
    function closeModal() {
        setIsModalOpen(false);
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (eventDetails.title && eventDetails.time) {
            // Convert time from 24-hour to 12-hour format
            const formattedTime = convertTo12HourFormat(eventDetails.time);

            const newEvent = {
                title: eventDetails.title,
                time: formattedTime,
                date: eventDetails.date,
                place: eventDetails.place,
            };

            setEvents((prevEvents) => {
                const updatedEvents = [...prevEvents, newEvent];
                // Save updated events to localStorage
                localStorage.setItem('events', JSON.stringify(updatedEvents));
                return updatedEvents;
            });
            setEventDetails({ title: '', time: '', date: '', place: '' });
            createEvent(formattedTime);
        }
        closeModal();
    }

    async function createEvent(formattedTime) {
        const response = await fetch('/api/events/create', {
            method: 'post',
            body: JSON.stringify({
                username: userName,
                eventTitle: eventDetails.title,
                day: eventDetails.date,
                time: formattedTime
                // place: eventDetails.place,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        console.log("created");
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        const result = await response.json();
        console.log('Event created:', result);
        }

    // Helper function to convert 24-hour time to 12-hour format
    function convertTo12HourFormat(time24) {
        const [hours, minutes] = time24.split(':');
        const suffix = +hours >= 12 ? 'PM' : 'AM';
        const hour12 = (+hours % 12) || 12; // Convert hours to 12-hour format
        return `${hour12}:${minutes} ${suffix}`;
    }


    function setFriendUser(e) {
        setFriend(e.target.value);
    }
    function addFriend() {
        if (friendUser.trim() !== '') {  // Ensure the input is not empty
            addToFriendsList();
            setFriendsList(prevList => [...prevList, friendUser]); // Add the new friend to the list
            setFriend(''); // Clear the input field after adding
            localStorage.setItem('listOfFriends', friendsList);
        }
    }

    async function addToFriendsList() {
        if (friendUser.trim() !== '') {  // Ensure the input is not empty
            addToFriendsList();
            setFriendsList(prevList => {
                // Ensure prevList is an array and prevent duplicates
                const updatedList = prevList ?
                    [...new Set([...prevList, friendUser])] :
                    [friendUser];

                localStorage.setItem('listOfFriends', JSON.stringify(updatedList));
                return updatedList;
            });
            setFriend(''); // Clear the input field after adding
        }
    }

    async function addToFriendsList() {
        try {
            const response = await fetch('/api/user/addFriends', {
                method: 'post',
                body: JSON.stringify({
                    username: userName,
                    friendUsername: friendUser,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const result = await response.json();

            if (response.status === 404) {
                localStorage.setItem('userName', userName);
                props.onLogin(userName);
            } else if (response.status === 200) {
                setDisplayError("Friend successfully added");
            } else {
                setDisplayError(`⚠ Error: ${result.msg || 'Failed to add friend'}`);
            }
        } catch (error) {
            console.error("Error adding friend:", error);
            setDisplayError("An error occurred while adding friend");
        }
    }

    // React.useEffect(() => {
    //     const eventInterval = setInterval(() => {
    //         // Create a new mock event
    //         const newEvent = {
    //             title: `Mock Event ${Math.floor(Math.random() * 1000)}`,
    //             time: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}`,
    //             date: new Date().toLocaleDateString(),
    //             place: `${Math.floor(Math.random() * 100)} N ${Math.floor(Math.random() * 100)} E`,
    //         };
    //
    //         // Add the new event to the events state
    //         setEvents((prevEvents) => [...prevEvents, newEvent]);
    //     }, 5000); // every 5 seconds;
    //     return () => clearInterval(eventInterval);
    //
    // })

    return (
        <main>
            {/*<div className="calendar-title">{userName}'s Calendar</div>*/}
            <div className="main-calendar">
                <div className="friends">
                    <h3>Friends List</h3>
                    <input type="search" id="search" name="varSearch" placeholder="friend username" onChange={setFriendUser}/>
                    <button htmlFor="search" className="btn btn-secondary" onClick={addFriend}>Add Friend</button>
                    <ul>
                        {friendsList.map((friend, index) => (
                            <li key={index}>{friend}</li>
                            ))}
                    </ul>
                </div>
                <div className="calendarHolder">
                    <button type="submit" className="btn btn-primary" onClick={() => openModal()}>Create new event</button>
                    <br/>
                    <br/>

                    {/*Popup for adding a new event*/}
                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="btn-close" onClick={closeModal}></span>
                                <h2>Create New Event</h2>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="title">Title:</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={eventDetails.title}
                                            onChange={handleInputChange}
                                            required />
                                    </div>
                                    <div>
                                        <label htmlFor="time">Time:</label>
                                        <input
                                            type="time"
                                            id="time"
                                            name="time"
                                            value={eventDetails.time}
                                            onChange={handleInputChange}
                                            required />
                                    </div>
                                    <div>
                                        <label htmlFor="date">Date:</label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={eventDetails.date}
                                            onChange={handleInputChange}
                                            required />
                                    </div>
                                    <div>
                                        <label htmlFor="place">Place:</label>
                                        <input
                                            type="text"
                                            id="place"
                                            name="place"
                                            value={eventDetails.place}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" >Save Event</button>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="events">
                        <h2>{userName}'s Upcoming Events</h2>
                        <ul>
                            {events.length === 0 ? (
                                <li>No events scheduled yet!</li>
                            ) : (
                                events.map((event, index) => (
                                    <li key={index} className="event-item">
                                        <div className="event-title">{event.title}</div>
                                        <div className="event-time">{event.date} at {event.time}</div>
                                        <div className="event-place">{event.place}</div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    {/*<table align="center" cellPadding="25" border="3" border-collapse="collapse">*/}
                    {/*    <thead>*/}
                    {/*    <tr bgcolor="#808080">*/}
                    {/*        <th></th>*/}
                    {/*        <th>Sunday</th>*/}
                    {/*        <th>Monday</th>*/}
                    {/*        <th>Tuesday</th>*/}
                    {/*        <th>Wednesday</th>*/}
                    {/*        <th>Thursday</th>*/}
                    {/*        <th>Friday</th>*/}
                    {/*        <th>Saturday</th>*/}
                    {/*    </tr>*/}
                    {/*    </thead>*/}
                    {/*    <tbody>*/}
                    {/*    /!* Loop through the times and show the events *!/*/}
                    {/*    {['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'].map((time, index) => (*/}
                    {/*        <tr key={index}>*/}
                    {/*            <td>{time}</td>*/}
                    {/*/!*            /!* Display events for that time *!/*!/*/}
                    {/*            <td>*/}
                    {/*                {events*/}
                    {/*                    .filter(event => event.time === time)*/}
                    {/*                    .map((event, idx) => (*/}
                    {/*                        <div key={idx}>*/}
                    {/*                            <strong>{event.title}</strong>*/}
                    {/*                            <p>{event.place}</p>*/}
                    {/*                        </div>*/}
                    {/*                    ))}*/}
                    {/*            </td>*/}
                    {/*        </tr>*/}
                    {/*    ))}*/}
                    {/*    </tbody>*/}
                    {/*</table>*/}
                </div>
            </div>
        </main>
    )
}
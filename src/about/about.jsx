import React from 'react';
import './about.css'

export function About() {
    const [jokeQuestion, setJokeQ] = React.useState('Loading...');
    const [jokeAnswer, setJokeA] = React.useState('');
// We only want this to render the first time the component is created and so we provide an empty dependency list.
    React.useEffect(() => {
        const jokeElement = document.getElementById('joke');
        // Fetch a random joke from the API
        fetch('https://teehee.dev/api/joke')
            .then(response => response.json())  // Parse the JSON response
            .then(data => {
                // Set Elements
                setJokeQ(data.question);
                setJokeA(data.answer);
                jokeElement.textContent = `Q: ${data.question} A: ${data.answer}`;
            })
            .catch(error => {
                // Handle any errors that occur during the fetch
                jokeElement.textContent = 'Sorry, we couldn\'t load a joke.';
                console.error('Error fetching joke:', error);
            });
    }, []);
    return (
        <main>
            <div className="main-about">
                <h4>What is ChoreChum?</h4>
                <p>College students hate doing things by themselves. Let be honest though, most people think errands
                    would be more enjoyable if a friend joined them. The ChoreChum application allows friends to share
                    errands that they have to run and invite others to come along! It gives an option for if something
                    is flexible as well, so that friends can ask for a time change if needed. If a friend chooses to
                    join a certain errand, it will notify the person who posted it so they can reach out with any
                    details.</p>
                <img
                    src="https://media.istockphoto.com/id/1295921345/vector/united-community-of-different-nationalities-of-the-world.jpg?s=612x612&w=0&k=20&c=ZTsNiiYuShdMBwgTnfI6_w1CVy8sP092qaX3lGId3iI=" />
                    <br/>
                <h4>Here's a joke to tell your friends when you're chumming later!</h4>
                <br />
                <p>{jokeQuestion}</p>
                <p>{jokeAnswer}</p>
            </div>
        </main>
    )
}
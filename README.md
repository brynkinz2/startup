# ChoreChum

[My Notes](notes.md)

This application will allow friends to share the random errands that they need to do throughout the week and sends invites to friends to join them! 


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

College students hate doing things by themselves. Let be honest though, most people think errands would be more enjoyable if a friend joined them. The ChoreChum application will allow friends to share errands that they have to run and invite others to come along! It will give an option for if something is flexible as well, so that friends can ask for a time change if needed. If a friend chooses to join a certain errand, it will notify the poster so they can reach out with any details.

### Design

![Design](IMG_0085.PNG)

Here is a sequence diagram that shows how people would interact with the backend server to add their errands to their friends' calendars.

```mermaid
sequenceDiagram
    actor Ashley
    actor Jack
    actor Taylor
    Ashley->>Server: Ashley + groceries @4 on Tue
    Server -->Taylor: Ashley + groceries @4 on Tue
    Server -->Jack: Ashley + groceries @4 on Tue
    Taylor->>Server: Taylor + Swig @3 on Wed
    Server--> Jack: Taylor + Swig @3 on Wed
    Server--> Ashley: Taylor + Swig @3 on Wed
```

### Key features

- Secure login for users through HTTPS
- Ability to "post" errands on the calendar for friends to see
- Ability to add descriptions and flexibility to errands
- Display of errands that friends have posted in a calendar view

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Three HTML pages. One for login, one for the calendar itself where people can add events, and one to see friends list and add new people. 
- **CSS** - Application styling that is pleasing to the eye and easy to look at. Also adds color coordinating by friend.
- **React** - Provides login, ability to add new events and friends,and use of React for routing and components.
- **Service** - Backend service with endpoints for:
    - login
    - retrieving events from friends
    - choosing to join on an errand
- **DB/Calendar** - Stores users, events hosted, events joined, and friends list in database. Register and login users. Credentials securely stored in database. Can't post events unless authenticated.
- **WebSocket** - As each user hosts an errand, those events are broadcasted to those in friends list.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I created 2 different HTML pages after deciding that adding a third was not necessary.
- [x] **Proper HTML element usage** - I used HTML elements properly.
- [x] **Links** - My links to other pages and to my GitHub Repo all work.
- [x] **Text** - I added text where it was necessary.
- [x] **3rd party API placeholder** - I created a placeholder for a 3rd party API.
- [x] **Images** - I added 1 image, I am still thinking of other ways that I could implement images into my application.
- [x] **Login placeholder** - I created a placeholder for the login.
- [x] **DB data placeholder** -One database placeholder is the friends list.
- [x] **WebSocket placeholder** - The websocket placeholder is the calendar, which will be updated when people add or join errands.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - Used each of these elements
- [x] **Navigation elements** - I included navigation in the header.
- [x] **Responsive to window resizing** - I did complete this part of the deliverable.
- [x] **Application elements** - I included different elements.
- [x] **Application text content** - I have text content.
- [x] **Application images** - I added a new image that shrinks with page.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - I did complete this part of the deliverable.
- [x] **Components** - I did complete this part of the deliverable.
- [x] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - I did complete this part of the deliverable.
- [x] **Hooks** - I did complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - I did complete this part of the deliverable.
- [x] **Static middleware for frontend** - I did complete this part of the deliverable.
- [x] **Calls to third party endpoints** - I did complete this part of the deliverable.
- [x] **Backend service endpoints** - I did complete this part of the deliverable.
- [x] **Frontend calls service endpoints** - I did complete this part of the deliverable.

## 🚀 DB/Calendar deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
      

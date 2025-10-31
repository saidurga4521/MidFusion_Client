# 🌍 Meet in the Middle

A location-based web application that helps users find a convenient **midpoint location** between multiple addresses, making it easier to plan meetups with friends, family, or colleagues.



## 🚀 Features
---

- **Authentication & Validation**  
  - JWT-based login & signup (integrated with backend)  
  - Form handling with **React Hook Form** + **Zod validation**

- **Location & Maps**  
  - Address search & autocomplete powered by **Google Places API**  
  - Displays midpoint location on an interactive **Google Map**  
  - Suggests nearby cafes, restaurants, and landmarks

- **Meeting Point Suggestions**  
  - Calculates midpoint using distance algorithms  
  - Allows saving and sharing meeting points with others  

- **User Experience**  
  - Responsive UI with **TailwindCSS** and **Framer Motion** animations  
  - Toast notifications for feedback (`react-toastify`)  
  - Error handling with **React Error Boundary**  


## 🛠️ Tech Stack

**Frontend:**  
- ⚛️ React 19  
- 🗂 Redux Toolkit (state management)  
- 🎨 TailwindCSS + Framer Motion (UI/UX)  
- 📍 @react-google-maps/api (maps integration)  
- ⚡ Socket.io-client (real-time communication)  
- ✅ React Hook Form + Zod (form handling & validation)  
- 📅 React Datepicker & Date-fns (time/date utilities)  

**Tooling & Dev Experience:**  
- Vite (bundler)  
- ESLint + Prettier (code quality & formatting)  


## 📦 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/username/MeetInTheMiddle-Frontend
cd MeetInTheMiddle-Frontend

```

## Remember Functionality:

- There are two types of cookies 1.persistant cookie 2.Session cookie
- session cookie expires ,when you close the browser,But the persistant cookie is expires only after the expires time is completed
- In cookieOptions,if we give maxAge then it becomes persistant cookie

### Frontend Login Functionality;

- It is a cookie based authentication
- In this login functionality ,we use reacthook form and zod validation to validate the Input fields.And mainly it is used for form state management and validation
- After calling the APi the user details stored in global store using redux toolkit
- In the login functionality we mentioned about remember me functionality,The working of the remeber functionality

## Create Meeting Functionality

- I used **`forwardRef`** and **`useImperativeHandle`** hooks to let the parent component control child components.
- Before moving to the next step, the parent checks whether the fields are filled.
- If fields are not filled, validation errors are displayed below the respective input fields.
- I passed **meeting data as a prop** to collect and share data across all components.
- Each component uses **React Hook Form** for handling input fields.
- For date inputs, I integrated a **DatePicker** component.
- Finally, in the last step, there is a **“Create Meeting”** button that triggers meeting creation.

### Your Invitations

- Fetch **pending invitations** from the API and store them in the `pendingInvitations` state.
- Each invitation has two buttons: **Accept** and **Decline**.
- Clicking **Accept** sets `acceptModal` to `true` and stores the selected invite in `selectedInvite`.
- Clicking **Decline** sets `showDeclineModal` to `true` and stores the invite ID in `inviteId`.
- After clicking either button, the respective modal opens: **Location Modal** for Accept, **Confirmation Modal** for Decline.
- The **Confirmation Modal** asks for a simple **Yes/No** confirmation.
- The **Location Modal** checks for conflicts if the user already has another meeting at the same time.
- If conflicts exist and the user clicks **Yes, Continue**, all conflicting meetings are rejected, and the modal proceeds to collect the user’s location.

### DashBoard

- In dashboard we have dash board stats and upcoming meetings and my meetings
- In dashboard stats we have upcomingmeetings,pendingInvations,totalMeetingcurrentWeekMeetingCount,
    avgParticipants,
    successRate,
- There is amy meetings so actually the </meetingcard> component represents the my meetings

## MeetingCard

- In this component ,we have a  features called serach and filter by status,Infinite scroll and gird/list view and view toggle for viewing the meetings
- calls getMymeetings({pageNo,items}) to fetch meetings in a paginated way and stores them in myMeetings state and uses **hasComplted** state to stop when no more meetings are left
- Infinite Scroll,
- serach functionality,Based on the search term and filter wen can filter the Items and stored in the variable filteredItems
- Grid and List view toggle using isGrid state
- meeting card display using filteredItems
- There is a view details it navaigate to meetingInfo page

### meetingInfo page

- first fetch the meeting based on the Id we get the details of that meeting and stored in meeting state
- Then stored the title and description in their respective states
- The find you particpation using you email in that meeting
- In this page has we have tabs

      1. overview
      2. partcipants
      3. voting
      4. map view
- switching these tabs using currentWindow state
- If you are the meeting creator,then we have Edit option also ,In this we edit title and desription store this values in their respective state then call the update Meeting Api

### Settings page

- In the setting page we have total 5 tabs will be there 1. Notifications 2. privacy 3. General 4. Account 5. Help  
- In Notifications page,there is a settings state,In this state we store all the notification status and call the updateUserDefaultSetting Api to update in backend
- In Account,we have a options on delete the account ,export the meeting data and chane password as well as.

### UserLogin with Magic Link

- The working of this magicLink here is ,after clicking the magic link button they enter the  logged email then click the sendMagic link
- Then the backend send the url with have generated token to the repected email
- Then you click the button in the email ,it automatically redirects to home page

### Profile page

- In this profile user update their photo,name,email ,phone number and their bio
- In this profile you can show the meeting statistics and meeting history

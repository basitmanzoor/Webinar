
# Webinar Portal

The Webinar Portal is a web application that allows users to register and attend webinars. The system has two main roles: Admin and End User. Admins can manage webinars, including creating, updating, and deleting them. End users can register for webinars and attend them at the scheduled time.

## Table of Contents

- [Features](#features)
- [Roles](#roles)
- [Admin Features](#admin-features)
- [User Features](#user-features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication.
- Admin can upload webinars with the following details:
  - Name of the webinar.
  - Video (YouTube link or direct upload).
  - Description of the webinar.
  - Start and end time of the webinar.
- Upcoming webinars list.
- Past webinars list.
- Admin can view the number of users registered for a webinar.
- CRUD operations for Admin.
- User can log in to the dashboard.
- User can see upcoming webinars.
- User can register for a specific webinar using email and name.
- Webinar video can be watched only at the scheduled time.
- Webinar status updates based on scheduled time (upcoming, concluded).
- Registered events for users to view past webinars and details.

## Roles

### Admin

- Upload webinars.
- View upcoming and past webinars.
- Perform CRUD operations on webinars.
- View the number of registered users for each webinar.

### End User

- Register and log in.
- View upcoming webinars.
- Register for webinars.
- Attend webinars at the scheduled time.
- View past webinars in the Registered Events section.

## Admin Features

- **Create Webinar:** Admin can create a new webinar by providing the name, video link or upload, description, start time, and end time.

- **View Webinars:** Admin can view a list of upcoming and past webinars, including details such as the name, description, and scheduled times.

- **Manage Webinars:** Admin can edit the details of a webinar, delete a webinar, and view the number of registered users for a specific webinar.

## User Features

- **User Registration:** End users can register for the portal using their email and name.

- **Dashboard:** Users can log in to the dashboard, where they can see a list of upcoming webinars.

- **Register for Webinars:** Users can register for a specific webinar by providing their email and name.

- **Webinar Attendance:** Users can attend webinars only at the scheduled time. If they access the webinar before or after the scheduled time, the system provides the appropriate status (upcoming or concluded).

- **Registered Events:** After the webinar is over, users can view it in the Registered Events section, which contains details about past webinars.

## Getting Started

To get started with the Webinar Portal, follow these steps:

1. Clone the repository to your local machine.

2. Install the required dependencies using `npm install` or `yarn install`.

3. Set up your database and configure the application settings.

4. Run the application using `npm start` or `yarn start`.

5. Access the application through a web browser at `http://localhost:3000`.

## Usage

1. Admins can log in to the system and start creating webinars.
2. End users can register and log in to view and register for upcoming webinars.
3. Registered users can attend webinars at the scheduled time.

## Screenshots


![Screenshot (7)](https://github.com/basitmanzoor/Webinar/assets/49262108/1fa15620-8a94-48e5-9e98-19e0611a049a)
![Screenshot (8)](https://github.com/basitmanzoor/Webinar/assets/49262108/c874ad2e-304a-44bd-bade-d69e46b20275)
![Screenshot (9)](https://github.com/basitmanzoor/Webinar/assets/49262108/b58a5779-12dc-40b2-acf5-ad09849f7aca)
![Screenshot (10)](https://github.com/basitmanzoor/Webinar/assets/49262108/c661abc6-f524-4f12-acf1-f48901bbaf23)
![Screenshot (11)](https://github.com/basitmanzoor/Webinar/assets/49262108/43947cbf-d081-467c-beba-bf838378a392)
![Screenshot (12)](https://github.com/basitmanzoor/Webinar/assets/49262108/6b367278-8dc3-4b2f-9ea0-4609f814c9eb)
![Screenshot (13)](https://github.com/basitmanzoor/Webinar/assets/49262108/7f8c6981-fabd-48cf-9d1f-8d7e8b2522cf)
![Screenshot (14)](https://github.com/basitmanzoor/Webinar/assets/49262108/e1f0ef0b-2cbe-452d-97cd-bf526f367c8d)

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- Video Integration: YouTube API (for video links)



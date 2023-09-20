# Mossletters - Newsletter Management System

![Mossletters Logo](</assets/img/favicon.ico>)

Mossletters is a newsletter management system designed to demonstrate my ability to implment various
elements of web application design using Node.js and MongoDB. This demo version allows all users to 
access both user and admin views for a complete understanding of its functionality.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Technologies](#technologies)
- [Installation and Usage](#installation-and-usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

Mossletters offers a seamless experience for managing newsletters, providing an intuitive 
interface for both users and administrators. It has been developed with meticulous attention 
to detail and best practices to offer robust functionality. 

## Features

- **User View**: Once logged in, Users can update their preferences, change their name and 
email address, or fully delete their account.
- **Admin View**: Administrators have access to get a full list of all users who match the 
criteria of a specific newsletter, and view, update, or delete individual users.
- **Responsive Design**: The design is fully responsive and adjusts to various screen sizes.
- **Highly Modular**: Built with modern technologies to ensure modularity and scalability.
- **Background Slideshow**: Visually appealing background images to enhance the user experience.

## Minor Features
- Form Validation
- RESTful endpoints in XML and JSON
- Password Hashing in separate database from other content
- Customized Bootstrap elements

## Demo

Explore the live demo at [Mossletters Demo](<http://stephenmossis.cool/mossletters>).

## Technologies

- Front-end: Bootstrap, Font Awesome, HTML/CSS, JavaScript
- Back-end: Node.js, Express
- Database: MongoDB
- Template Engine: Handlebars
- AWS EC2, R53: Database on separate EC2 instance from all other elements

## Installation and Usage

1. Clone the Repository
    ```git clone https://github.com/SRDMoss/mossletters.git```

2. Navigate to the Directory
    ```cd mossletters```

3. Install dependencies
    ```npm install```

5. Initialize the Database - navigate to the models folder and run DBinit.js
    ```node DBinit.js```

4. Start the server
    ```npm start```

5. Open in browser


## Contributing

No contributions are permitted without express written permission from the author

## License

All rights reserved without express written permission from the author.

## Contact

For any queries, feel free to contact: 

- Stephen Moss: thisisstephenmoss@gmail.com
- Project Link: https://github.com/SRDMoss/mossletters.git


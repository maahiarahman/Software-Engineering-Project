<<<<<<< HEAD
# **Software_Engineering_Team**
This repository is the collaborative hub for our **Software Engineering Project**, where we learn and apply principles of software engineering and design to deliver a well-structured solution. The repository includes our **Code of Conduct**, project deliverables, and other key resources to ensure teamwork and success.

---

## **Submitted By:**
- **Team Members:** Maahia, Shaiza
- **Product Manager:** Sumana
- **Scrum Master:** Aneeta
- **Time spent:** Ongoing  

---

## **Description**


---

## **Code of Conduct**
This Code of Conduct outlines the principles and expectations for all team members to
adopt a productive, respectful, and collaborative working environment throughout the
project.

1. Respect and Inclusivity
• Treat all team members with respect and value their contributions.
• Avoid discrimination, harassment, or offensive behaviour, ensuring an inclusive
environment for everyone.
• Communicate openly and listen to others' ideas without judgment.

3. Accountability
• Take ownership of your assigned tasks and deliver them within the agreed timelines.
• Inform the team immediately if you encounter any issues or delays.
• Commit to active participation in meetings, discussions, and decision-making
processes.

5. Collaboration
• Work collaboratively and support one another in achieving the project goals.
• Share knowledge and skills to help the team grow collectively.
• Resolve conflicts constructively and focus on solutions rather than blame.

7. Quality and Ethics
• Adhere to ethical standards in writing, coding, and testing to ensure quality
deliverables.
• Ensure that all contributions are original and free from plagiarism.
• Maintain the security and privacy of any data used in the project.

9. Communication
• Be clear, concise, and professional in all forms of communication.
• Use agreed communication channels (e.g., email, WhatsApp) for team discussions.
• Attend scheduled meetings and be prepared to provide updates on your work.

11. Commitment
• Follow the project timeline, respecting deadlines and milestones.
• Contribute actively during sprints and complete assigned tasks with dedication.

7. Conflict Resolution
• Address disagreements respectfully and directly with the involved parties.
• Seek assistance from the team or lecturer if conflicts cannot be resolved internally.

Agreement
By participating in this project, all team members agree to abide by this Code of Conduct
and contribute positively to the team’s success.
Team Member Names:
1. Sumana Asgar
2. Aneeta Olorode
3. Maahia Rahman
4. Shaiza Sultana
Date: 29/01/2025

---

## **GitHub Repository and Collaboration**
The **GitHub repository** will serve as the central hub for version control, resources, and documentation.

### **Action Required:**
1. Ensure you have a GitHub account.  
2. Share your GitHub username in the team chat to be added as a collaborator.  

The **Code of Conduct** and related project documentation will be uploaded to the repository for reference.  

---

## **Regular Meetings**
Regular meetings are critical for progress tracking and alignment.


---

### **1. Technologies Used**
- **GitHub**: For version control and collaboration.  
---

### **2. Contribution Guidelines**
Contributions are key to team success:  
- **Progress Updates**: Regularly share updates on your tasks.  
- **Feedback**: Provide constructive suggestions on deliverables.  
- **Collaboration**: Work closely with team members and stay involved in discussions.  

---

### **3. License Information**
**MIT License**  
This repository is licensed under the MIT License, allowing free use, modification, and distribution with proper credit to the authors.  

---
=======
# MySQL, PHPMyAdmin and Node.js (ready for Express development)

This will install Mysql and phpmyadmin (including all dependencies to run Phpmyadmin) AND node.js

This receipe is for development - Node.js is run in using supervisor: changes to any file in the app will trigger a rebuild automatically.

For security, this receipe uses a .env file for credentials.  A sample is provided in the env-sample file. If using these files for a fresh project, copy the env-sample file to a file called .env.  Do NOT commit the changed .env file into your new project for security reasons (in the node package its included in .gitignore so you can't anyway)

In node.js, we use the MySQl2 packages (to avoid problems with MySQL8) and the dotenv package to read the environment variables.

Local files are mounted into the container using the 'volumes' directive in the docker-compose.yml for ease of development.

### Super-quickstart your new project:

* Make sure that you don't have any other containers running usind docker ps
* run ```docker-compose up --build```

#### Visit phphmyadmin at:

http://localhost:8081/

#### Visit your express app at:

http://localhost:3000

For reference, see the video at: https://roehampton.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=6f290a6b-ba94-4729-9632-adcf00ac336e

NB if you are running this on your own computer rather than the azure labs that has been set up for you, you will need to install the following:

* node.js  (windows: https://nodejs.org/en/download/)
* docker desktop (for windows, this will also prompt you to install linux subsystem for windows https://docs.docker.com/desktop/windows/install/ )

### Whats provided in these scaffolding files?


  * A docker setup which will provide you with node.js, mysql and phpmyadmin, including the configuration needed so that both node.js AND phpmyadmin can 'see' and connect to your mysql database.  If you don't use docker you'll have to set up and connect each of these components separately.
  * A basic starting file structure for a node.js app.
  * A package.json file that will pull in the node.js libraries required and start your app as needed.
  * A db.js file which provides all the code needed to connect to the mysql database, using the credentials in the .env file, and which provides a query() function that can send queries to the database and receive a result.  In order to use this (ie. interact with the database, you simply need to include this file in any file you create that needs this database interaction) with the following code:

```const db = require('./services/db');
```

____

Useful commands:

Get a shell in any of the containers

```bash
docker exec -it <container name> bash -l
```

Once in the database container, you can get a MySQL CLI in the usual way

```bash
mysql -uroot -p<password> 
```
>>>>>>> d44ad05 (Initial commit)

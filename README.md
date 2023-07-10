# Hi-home
![Logo](https://github.com/wilknisoliveira/wilknisoliveira/assets/135706241/f019d1c3-e4c3-46ee-be27-3a885dda1349)

> Status: Developing ⚠️

A Kotlin-Spring API to save locations in a MySQL DB. Also, a simple interface in Javascript/Node/Express using the Google Maps API to interact with the backend.

Do you want to know more about the the project goals? Go to 'Next steps' section. 

## Index
- <a href="#features">Project features</a>
- <a href="#layout">Layout</a>
- <a href="#install">Install</a>
- <a href="#run">Run</a>
- <a href="#stack">Stack</a>
- <a href="#steps">Next steps</a>
- <a href="#author">Author steps</a>

## ✔️ Project features
### API
- [x] CRUD operations
- [x] HATEOAS level
- [x] Root Entry Point
- [x] Error validations with ExceptionHandler
- [x] Basic WebMvcConfigurer to CORS
- [x] Swagger documentation

### Frontend
- [x] Point registration
- [x] Explorer page to use CRUD Operations
- [x] Interaction with Google Maps API

## 💻 Layout
### API
INSERT THE DIAGRAM AND SWAGGER?

### Frontend
![Register](https://github.com/wilknisoliveira/wilknisoliveira/assets/135706241/332f103d-5234-4427-9e1b-9cae62b2bb56)
![Explorer](https://github.com/wilknisoliveira/wilknisoliveira/assets/135706241/f8bf8852-74a1-422e-9fad-c7c178ad027a)

## 🔨 How to install this project?
### Stack
First of all, make sure that you have the following technologies in your environment:
- Java 17
- Kotlin
- Node.js
- MySQL

### Git clone
```
# Clone this repository
$ git clone https://github.com/wilknisoliveira/hi-home.git
```

### Database
- Create a schema with MySQL to host your tables. You can name it as 'city_point';
- In IntelliJ or Eclipse, configure a Run/Debug Configurations with the following Environments variables (replace the lines YOUR_*):
```
DB_URL=jdbc:mysql://localhost:YOUR_PORT/city_point?useTimezone=true&serverTimezone=UTC;
DB_USER=YOUR_USER;
DB_PASSWORD=YOUR_KEY;
```

### dotenv
- To use the Google Maps API, you need to create a free account in the Google Cloud Platform. There you will get a key to use in your projects. You can learn more about it in this [documentation](https://developers.google.com/maps/documentation/javascript/get-api-key).
- At the frontend folder, create a file 'key.env' and insert the following lines:
```
GOOGLE_API_KEY=YOUR_KEY
```

### Install Node dependencies
```bash
$ cd frontend
$ npm install
```

## ⚙️ How to run this project?
- Open a terminal:
```bash
cd frontend/src
node server.js
```
- From IntelliJ or Eclipse, run the Run/Debug Configuration that you created in the previous steps.
- Now you can:
1. Start the frontend at http://localhost:3000/;
2. See the Swagger documentation of the City Point API from http://localhost:8080/swagger-ui/index.html.

## 🧰 Stack
![Kotlin](https://img.shields.io/badge/Kotlin-0095D5?&style=for-the-badge&logo=kotlin&logoColor=white)
![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![Google-Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## 👨‍💻 Next Steps
The long term goal would be to create a platform to help the user to know any city better! Imagine that you are in a new city and you want to know what is fun there. The Hi-Home could help you! You could search for attractions, stores, services, concerts, social events and much more!

- [ ] Suporte to images
- [ ] Track the address from coordinates
- [ ] Columns to others information(social media, website, reviews, comments and etc.)
- [ ] Create more specific classes that extends point (attractions, stores, playground and etc.)
- [ ] Apply SpringBoot Security
- [ ] Create the tests
- [ ] Use a framework to frontend
- [ ] Improve the header
- [ ] Create a footer
- [ ] Filter by city
- [ ] Docker
- [ ] Deploy

 ## Author
 Wilknis Deyvis

 [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wilknis/)
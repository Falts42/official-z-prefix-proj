# official-z-prefix-proj

Hello there! Welcome to Zach Falter's Z-Prefix Project!

If you are using this app for the first time, I have included steps on how to get you up and running in no time.

GETTING SET UP:
1. Pull the project from the github repository.

2. Since I used Docker to create this project, make sure you have Docker desktop running in the background. It may not be the case for all users, but some users may not be able build/run the app without the desktop app open.

3. Use the command "docker compose build --no-cache". This way it doesn't store the image data to prevent conflicts when composing up or down.

4. Now use the command "docker compose up" and you should see the app, server, and database spin up in the terminal.

USING THE APP:
1. Once your app has been spun up, go to the FRONT-END at the following link: http://localhost:3000 . This should display a relatively simple login screen. The login allows managers to login, or visitors to go to a visitor page following the visitor link provided.

2. LOGIN: The login will take in any username and password and allow the user to move into the managers page, BUT if you look in the console you can see that it will throw an error since it does check whether the user is in the database. To check this, I have provided a username and password from one of the pre-set users in the users table --> username: big-man  password: nevergonnagiveyouup. You can go to the users table and try other users that are listed in there too.

3. VISITORS PAGE: Upon clicking the visitors page link, visitors are taken to a page where they can view all of the items in the entire inventory.

USING THE API:
1. To view the raw api data, go to the following link: http://localhost:8080/inventory . Here you should be able to see all of the seeded data that was fed into the database.

2. Using Postman or another application to send JSON requests to the api, you can GET, POST, PATCH, and DELETE data from the api. However, make sure that you are using the correct routes listed in the index.js file in the api folder. For instance, using the previsouly provided link with a GET request will retrieve all of the inventory items, whereas using http://localhost:8080/inventory/(insert Item Name) will retrieve an item only by name and if the item exists in the database.

DONE USING THE APPLICATION
1. When you are done using the application, click on the terminal you are running docker compose and hit 'ctrl + C' to stop the application running.

2. Then, run the command 'docker compose down' and it will unmount the containers.
# Phase 3: PHP and Database Integration - Cooklet Web App

This is Phase 3 of the Cooklet application project. The application has been fully converted from a static HTML/JS site to a dynamic PHP web application relying on a persistent MySQL database.

## Phase Overview
- **Local Storage to Database Migration**: Recipes are now fetched from a central MySQL `cooklet_db` and blended gracefully with your legacy local storage arrays to retain old content.
- **Authentication**: A secure registration and login framework utilizing `password_hash()` and Session tokens securely blocks anonymous guests from accessing your dashboard.
- **Form Backend Handling**: The Contact Us form now safely sanitizes and deposits messages straight to the `messages` table rather than faking an alert. The Recipe Submission modal now triggers an actual server-side POST request resolving securely into the data layer!
- **Dashboard Space**: Authenticated users can log in and view dynamic renders of solely the recipes *they* submitted.

## Folder Structure Reorganization
As per assignment parameters, the architecture is completely streamlined:
```text
project/
│── css/
│   ╰── style.css
│── js/
│   ╰── script.js
│── images/
│   ╰── (...)
│── includes/
│   ├── db.php
│   ╰── functions.php
│── auth/
│   ├── register.php
│   ├── login.php
│   ╰── logout.php 
│── contact.php
│── index.php
│── recipes.php
│── dashboard.php
│── add_recipe.php
│── delete_recipe.php
│── README.md
╰── database.sql
```

## How to Set Up & Run
1. Install **XAMPP** or **WAMP** and start BOTH your **Apache Server** and **MySQL Server**.
2. Assuming this project sits in a folder on your Desktop, you must **Move the entire folder into your local `htdocs`** (`C:\xampp\htdocs\` for XAMPP users).
3. Open `phpMyAdmin` typically located at `http://localhost/phpmyadmin/`.
4. Click **Import** inside `phpMyAdmin` and browse to select the provided `database.sql` file within the project root. This will automatically construct the exact schemas needed for users, recipes, and messages tables.
5. In your web browser, navigate to your root project via `http://localhost/My proj/` (replace "My proj" with whatever you renamed the repository to). Enjoy testing!

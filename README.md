# IP Address Management Solution

A web-based IP address management solution that allow us to record an IP address and comment on its assignment. 

## Features

* Log in to the system and receive an authenticated token.
* Add a new IP address to the database and attach a small label/comment to it. 
* Modify an IP address to change the label. 
* View an audit log of which changes have been made.

#### Installation
- Clone github repository `git clone https://github.com/ridzmmtajul/ip-address-mngmt-solution.git`
- or download and put everything on the htdocs folder of XAMPP or anything alike.
###### Angular JS
- Open Terminal
- change directory via command: `cd frontend`
- npm install
###### Laravel (API)
- On Terminal
- change directory via command: `cd backend`
- composer install
#### Database Migration (MySQL)
- Create a Database called "ip_address_mngmt"
- Open Terminal
- Run command `cp .env.example .env`
- update .env file

  DB_CONNECTION=mysql <br/>
  DB_HOST=127.0.0.1 <br/>
  DB_PORT=3306 <br/>
  DB_DATABASE=ip-address-mngmt <br/>
  DB_USERNAME=root <br/>
  DB_PASSWORD= <br/>
  
- Run `php artisan migrate` (this will generate the database table)

#### Running the Application
- Open XAMPP
- Start Apache (Server) and MySQL (Database)
- Run laravel api `php artisan serve`
- Run angular app `ng serve`
- Open Browser
- type in your browser `http://localhost:4200/welcome`

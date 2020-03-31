## My Employees App

Let's say that A Company develops an application for their empleyees that displays a list of employee profile images or cards where employees can click or tap on the profiles and get more information about their coworkers. In other words a directory of the company.

As it was a requirement from the employees, the company wants to keep a record and statistic of the usage of the application. For this porpouse it was implemented a log that records the user and timestamp of the actions storing it to a database.

The goal of this is to keep a record of how frequent the directory is being used and which days or times of the day have the highest utilization.
 
## The application contains the following components:

### `Server` 

– A server that can receive requests to save and read from a database that contains the list of employees and check-ins. A REST API with basic CRUD operations. The Server repo [myemployees-rest-api](https://github.com/vermontgarcia/myemployees-mern-app)

### `Client`

– A web application that communicates with the server and displays a user interface.

### `Database`

– A MongoDB database that stores all the data making it persistent.
 

## The application also contains:
 
A User management module that allows **signup** and **login** providing Authentication and Authorizarion security.

A simple **radar chart** that displays the history of the check-ins over time displating the days of the week and the log activity recorded.

### Deployment

To see the application up and running go to [My Employees APP](https://my-employees-2020.herokuapp.com/)


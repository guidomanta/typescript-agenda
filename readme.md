# Typescript Agenda

This application is about a simple dentist agenda in which users can be filled in and saved. Each user can schedule an appointment. The application checks if appointments slots are already occupied and, if not, saves the appointment in the agenda.


## Quick Start

* `npm run build` to build the application.
* `npm start` to start the application.
* `npm run test` to test the application.

## Technologies Used
* TypeScript - version 4.7
* MongoDB - version 5.0
* Express - version 4.18.0

## Application description

The application's aim is to create and list two entities: Users and Appointments. Users can have many Appointments, Appointments belongs to single Users. 

First of all, an User is created and the application is returning 201 status in case of success. It is returning 400 status in case of incomplete data (the application fails to insert a new User).

Then, each User can create an appointment and the application checks if chosen slot has been already occupied. It is returning 201 in case of appointment successfully created, it will return 400 in case of already occupied slot.

The application includes some use case tests.

## Contact

Guido Manta - [@guido_manta](https://twitter.com/guido_manta) - guido.manta@gmail.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)
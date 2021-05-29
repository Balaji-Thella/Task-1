# nodeapp

### How do I get set up?

- Summary of set up

  Clone the project.

  Run "npm install".

  Install pm2 in your machine by use command "sudo npm install pm2@latest -g".

  Use command "pm2 start" to start the server.

### API Endpoints

- Search API to find policy info with the help of username -

  Method: POST

  URL: localhost:8000/search

  Payload: {
  username: <Type user name>
  }

- API to provide aggregated policy by each user -

  Method: GET

  URL: localhost:8000/userPolicy

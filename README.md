Ticket Dashboard
================

This dashboard displays live information about the amount of open and closed tickets on GitHub for our team. The dashboard compares the progress over time (last week, last month, all time). By also integrating ZenHub, managers can track how long the average development time was per ticket. Additionally, the computed metrics get stored daily to make out statistical trends.

# Technologies used
- React Front-End with client-side routing
- Node.JS REST API
- MongoDB database with a number of complex queries to aggregate metrics
- Cronjobs to crawl the APIs, making severe use of async concepts
- Tests with mocha and supertest
- Webpack and ESLint for best-practices in code optimisation
- Heroku deployment
# Main Components of Backend Application

- Handle HTTP Requests ( Client => HTTP => Servers )
- Handle Routing
- Handle Security
- Write Business logic
- Access Operating System
- Access the Database (by DB Engine or ORM)
- Access third-party services

# API Development Checklist

- Scaffold project
- Create Route
- Create Controller for route
  - Extract Data from Request Object
  - Validate and sanitize Incoming Data
  - permission and Authentication
  - Write Business login
    - Main Business logic
    - Database connection (Persist / Fetch)
    - Utilities
  - handle possible Errors
  - Send Response
- Create and Connect Necessary Middlewares
- Synchronous / Asynchronous Communication with Third party Services

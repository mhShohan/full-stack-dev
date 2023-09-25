# OpenAPI Specification

https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.1.md

https://swagger.io/docs/specification/about/

## Project Idea

I plan to implement a REST API for a blog management system. Several special options will be available. All of the posts and comments made by users are accessible publicly. Users must be logged in to their accounts in order to make posts or comments. Each user has control over their own posts and comments. Everything needs to be managed by the admin. The user can add a custom cover image to the post.

### Check List

- Elaborate the requirements and create a formal / semi formal SRS
- Analyze The SRS
- And possible entities
- Design the ER Diagram
- Figure out possible API Endpoints
- Write down the specs for each endpoint
- Design the API using Open API Spec (will automatically generate the docs)
- Implement The API (Development)
- Write Automatic Tests (Development)

### SRS - Software Requirement Specification

1. Introduction
   The Blog REST API Application is a collection of public api endpoints that enables users to create, manage, and interact with a single author blog. The backend application provides authentication functionality, allows users to create and view articles, comment on articles, and upload cover photos for articles. This document outlines the functional and non- functional requirements for the development of the Blog REST API Application.
2. System Overview
   The Blog REST API Application aims to provide a seamless user experience while ensuring the security and integrity of user data. It allows users to browse articles without authentication, but authentication is required for commenting. Administrators have access to an admin dashboard for managing articles, comments, and cover photos.
3. Functional Requirements

   - Authentication

     - Users should be able to register for an account by providing their email address and a secure password.

     - Users should be able to log in securely using their email address and password.
     - Administrators should be able to log in securely using their credentials.

   - User Management
     - Admin can create new users
     - Admin can see a list of users
     - Admin can update or delete users
     - Admin can change password for any user
   - Article Management

     - Authenticated users should be able to create, edit, and delete their own articles.
     - Articles should contain a title, content, and an optional cover photo.
     - Any users should be able to view a list of all articles and retrieve individual articles.
     - Admin can manage articles

   - Commenting
     - Authenticated users should be able to post comments on articles.
     - Comments should include the author's name, email (optional), and the comment text.
     - Users should be able to view comments associated with an article.
     - Admin can manage comments
       e.
   - Cover Photo Management
     - Authenticated users should be able to upload and update a cover photo for their
       articles.
       I
     - The system should support various image formats and validate uploaded cover
       photos.

4. Non-Functional Requirements
   - Security
     - User passwords must be securely stored using appropriate hashing and salting techniques.
     - API endpoints handling sensitive information should be protected using secure protocols (HTTPS).
       I
     - Authentication tokens should be securely generated and validated to prevent unauthorized access.
   - Performance
     - The API should be able to handle a high volume of concurrent requests efficiently.
     - Response times should be optimized to ensure a responsive user experience.
   - Scalability
     - The application should be designed to accommodate future growth and increasing user demands.
     - The architecture should allow for horizontal scalability, such as load balancing and distributed processing.
   - Reliability
     - The API should be highly available, minimizing downtime and ensuring data integrity.
     - Error handling and logging should be implemented to facilitate troubleshooting and maintenance.
5. Constraints
   - The Blog REST API Application should be implemented using a specific programming language or framework.
   - The API may depend on external services or libraries for certain functionalities (e.g., email verification, file upload).
6. User Interface
   - The Blog REST API Application does not include a user interface. It solely provides a back-end API for integration with front-end applications or clients.
7. Glossary
   - API: Application Programming Interface
   - SRS: Software Requirements Specification
   - HTTPS: -Hypertext Transfer Protocol Secure

## YAML - 1.2.2 -- https://yaml.org/spec/1.2.2/

YAML (a recursive acronym for "YAML Ain't Markup Language") is a data serialization language designed to be human-friendly and work well with modern programming languages for common everyday tasks.
One of the most common uses for YAML is to create configuration files

### Scalar Types

- Integer
- Float
- String
- Boolean
- Date

### Examples

- Sequence
- Mapping
- Mapping to Sequence
- Sequence of Mapping
- Sequence of Sequence
- Mapping of Mappings
- Nested Collections

# Entities / Schema / Model

What we need to store?

- User
  - id - string
  - name - string
  - email - string
  - password - string (hashed)
  - role - enum[user, admin] default: user
  - status - enum[pending, approved, block, declined] default: pending
  - Timestamps
- Articles
  - id - string
  - title - string
  - body - text
  - cover - string
  - status - enum[draft, published] default: draft
  - authorId - relation with author
  - Timestamps
- Comments
  - id - string
  - body - text
  - authorId - relation with author
  - articleId - relation with article
  - status enum[public, private]
  - Timestamps

# ER Diagram (Entity Relationship Diagram)

### How to Store.

![Blog ER Diagram](./img/blog-er-diagram.jpg)

# API Endpoint

### Namespace

- Public - Anyone with the API access
- Amin/Private - Internal use only( restricted, different cors policy)

### We will follow no namespace at this moment

- Articles
  - GET (Public) - `/articles?query=params` - return a list of articles, we can also pass query params like sort, filter, pagination etc.
  - POST (private) - `/articles` - create new article and return it
  - GET (Public) - `/articles/:id?expand=author,comment` - return a single article. Use expand query params to populate the selected resources
  - PUT (private) - `/articles/:id` - create or update existing article completely
  - PATCH (private) - `/articles/:id` - update existing article's properties
  - DELETE (private) - `/articles/:id` - hard delete existing article
  - GET (Public) - `/articles/:id/comments` - return a list of comments
  - GET (public) - `/articles/:id/author` - return the author of given article
  - GET (private) - `/articles/self` - return all articles of user
- Comments
  - GET - `/comments?query=params` - return a list of comments based on the given articleId

# Endpoints Formal view

### Article

<details>
  <summary>GET All Articles</summary>

Method: GET  
Access: Public  
Path: /articles?query=params

### Query:

    - page (default 1) - current page number
    - limit (default 10) - the number of objects should be returned
    - sortType (default desc) - the type of sort, it could be either asc or desc
    - sortBy (default updatedAt) - the property that will used to sort. It could be either updatedAt or title.
    - search - the search term to filter articles based on the titles.

### Response:

    - success
      - data [list of article]
        - id
        - title
        - cover
        - author
          - id
          - name
      - pagination
        - page
        - limit
        - totalPage
        - totalArticle
        - nextPage
        - prevPage
      - links
        - self
        - nextPage
        - prevPage
        - comments
        - author
    - 400
      - message
    - 500
      - message

</details>
<details>
  <summary> Create new Article</summary>

Method: POST  
Access: private  
path: /article

### Request Body

    - title
    - body
    - cover (optional)
    - status (default draft)

### Response

    - 201
      - message
      - article
      - links
        - self
        - author
        - comments
    - 400
      - message
      - data (list of error message)
        - field
        - message
    - 401
      - message

</details>

<details>
  <summary>Get a single book</summary>

Method: GET  
Access: public  
Path: /article/:id?query=params

### Query:

    - expand (default none) - possible values [author, comment]

### Response

    - 200
      - data
        - id
        - title
        - cover
        - body
        - timestamps
        - author (optional)
        - comments (optional)
      - links
    - 404
      - message
    - 400
      - message
      - possible solution

</details>

<details>
  <summary>Update article using put</summary>

Method: PUT  
Access: private  
path: /article/:id

### Request Body

    - id (optional)
    - title
    - body
    - cover
    - status (default draft)

### Response

    - 200 of 201
      - message
      - article
      - links
        - self
    - 400
      - message
      - data (list of article)
        - field
        - message
    - 401
      - message

</details>

<details>
  <summary>Update existing article using patch</summary>

Method: PATCH  
Access: private  
path: /article/:id

### Request Body

    - id (optional)
    - title (optional)
    - body (optional)
    - cover (optional)
    - status (default draft) (optional)

### Response

    - 200
      - message
      - article
      - links
        - self
    - 400
      - message
      - data (list of article)
        - field
        - message
    - 401
      - message
    - 404
      - message

</details>
<details>
  <summary>Delete an existing article</summary>

<hr/>

Method: DELETE  
Access: private  
path: /article/:id

### Response

    - 204
      - message
    - 401
      - message
    - 404
      - message

</details>

<details>
  <summary>Get all comment for give article</summary>

<hr/>

Method: GET  
Access: public  
path: /article/:id/comments

### query

    - page
    - limit

### Response

    - 200
      - data (list of comments)
        - body
        - timestamps
        - author
          - id
          - name
      - pagination
        - page
        - limit
        - nextPage
        - prevPage
        - totalPage
        - totalComment
      - links
        - self
        - article
        - author
        - nextPage
        - prevPage
        - article
    - 404
      - message

</details>
<details>
  <summary>Get author of the given article</summary>

<hr/>

Method: GET  
Access: public  
path: /article/:id/author

### Response

    - 200
      - data (author)
        - name
        - email
      - links
        - self
        - article
    - 404
      - message

</details>
<details>
  <Summary>Create New Article for given article</Summary>
</details>

### Comment

- Get all comments
- create a comment
- update a comment
- delete a comment

### User

- Get all user
- get single user
- create a user
- update a user
- delete a user
- change password

### Auth

- register new account
- login to existing account

# OpenAPI Specification (Study Own-self)

https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.1.md

https://swagger.io/docs/specification/about/

[Swagger Editor](https://editor-next.swagger.io/)

### Bonus (doc):

- https://curl.se/docs/

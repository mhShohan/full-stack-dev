### Lecture Outline

1. HTTP Methods and CRUD Operations
   - Mapping HTTP methods to CRUD operations
   - Best practices for each HTTP method (GET, POST, PUT, DELETE)
   - Handling query parameters and filtering
   - Pagination and result limiting
2. Request and Response Payloads
   - Structuring request payloads (POST and PUT)
   - Handling request validation and error handling
   - Common response formats and status codes
   - Content negotiation (Accept and Content-Type headers)
3. Authentication and Authorization
   - Different types of authentication mechanisms (e.g., API keys, OAuth)
   - Securing REST APIs with authentication tokens
   - Role-based access control (RBAC)
   - Handling authorization errors and access control

## HTTP Methods and CRUD Operations

Best practices for each HTTP method (GET, POST, PUT, PATCH & DELETE)

### GET Method:

- Use GET to retrieve a representation of a resource or a collection of resources.
- Use query parameters for filtering, sorting, and pagination.
- Avoid making modifications to the state of the server or the resources with a GET request. Ensure idempotence: Multiple identical GET requests should produce the same result.
  In the context of the GET method, it implies that sending identical GET requests to retrieve a resource or a collection of resources should consistently return the same response. The server should not modify the state of the resources or have any side effects as a result of the GET request.

  Here's why this property is important:

  - It allows clients to safely retry GET requests without worrying about unintended consequences or modifications to the resources.

  - It enables caching mechanisms to work effectively. Caches can store and serve the response of a GET request, knowing that subsequent identical requests will yield the same result.
  - It aligns with the principles of idempotence in HTTP, promoting predictability and reliability in client-server interactions.

- Use appropriate caching mechanisms to improve performance for frequently accessed
  resources.

### POST Method:

- Use POST to create a new resource or submit data to be processed.
- Include the request payload containing the data for creating the resource.
- Respond with a 201 (Created) status code and include the URI of the newly created resource in the response headers.
- Avoid including sensitive information in the response body, as it may be cached or stored.
- Consider implementing input validation and sanitization to ensure data integrity.

### PUT Method:

- Use PUT to update or replace an existing resource with a new representation.
- Include the complete representation of the resource in the request payload!
- Respond with a 200 (OK) status code or 204 (No Content) if the resource was successfully updated.
- If a resource with the given identifier does not exist, consider creating a new resource with a POST request instead.
- https://restfulapi.net/rest-put-vs-post/
- https://www.restapitutorial.com/lessons/httpmethods.html

### PATCH Method:

- Use PATCH to perform partial updates to an existing resource.
- Include only the fields that need to be updated in the request payload, rather than sending the entire resource representation.
- Use a well-defined and consistent patch format, such as JSON Patch or JSON Merge Patch.
- Clearly document and communicate the supported patch formats and operations in your API documentation. I
- Provide meaningful error responses if the patch request is invalid or cannot be applied. - Consider implementing optimistic concurrency control mechanisms, such as ETags, to prevent conflicting updates.
- Respond with a 200 (OK) status code and include the updated resource representation in the response body.
- Consider supporting atomic updates by allowing multiple patch operations within a single PATCH request.
- Ensure idempotence: Applying the same patch multiple times should result in the same
  outcome.

### DELETE Method:

- Use DELETE to remove a resource from the server.
- Use caution, as this operation permanently deletes the resource.
- Respond with a 200 (OK) or 204 (No Content) status code to indicate a successful deletion.
- Consider implementing additional authorization or access control mechanisms to ensure only authorized clients can delete resources.
- Use appropriate error handling to handle cases where the resource to be deleted does not exist.

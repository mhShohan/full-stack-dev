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

## General Best Practices for HTTP Methods:

Follow the principles of REST and adhere to the semantics and conventions of each HTTP method.

- Use appropriate status codes to indicate the outcome of the request.
- Provide meaningful error responses with relevant error codes and messages.
- Implement proper authentication and authorization mechanisms to secure sensitive operations and resources.
- Use versioning strategies to handle backward compatibility and API evolution.
- Follow established naming conventions and URL structures to improve API consistency and usability.
- Use PATCH when the client wants to modify specific attributes or properties of a resource without sending the complete representation.
- Clearly define the semantics and behavior of the PATCH method in your API documentation.
- Validate and sanitize the patch payload to ensure data integrity and security.
- Consider logging or auditing patch operations for tracking changes to resources.
- Follow established conventions and patterns for patch formats, such as RFC 6902 (JSON Patch) or RFC 7396 (JSON Merge Patch).
- Provide thorough and clear documentation on how to construct valid patch requests for your resources.

## Pros & Cons of Both Approach

### JSON Patch Pros:

1. Granular Updates: JSON Patch allows for fine-grained control over updates by specifying individual operations (add, remove, replace) at specific paths in the JSON document.
2. Idempotence: JSON Patch operations are idempotent, meaning that applying the same patch multiple times will yield the same result.
3. Efficiency: JSON Patch is typically more efficient in terms of network payload and
   processing, as it only sends the necessary changes instead of the entire representation of the resource.

### JSON Patch Cons:

1. Complexity: JSON Patch syntax can be more complex and verbose, requiring careful construction and handling of patch operations.
2. Limited Updates: JSON Patch can only perform specific operations (add, remove, replace), which may not cover all update scenarios. Some more complex updates may require multiple patch operations.

### JSON Merge Patch Pros:

1. Simplicity: JSON Merge Patch is simpler in terms of syntax and usage compared to JSON Patch. It allows for straightforward merging of the provided patch into the existing JSON document.
2. Flexibility: JSON Merge Patch enables updates at various levels of the JSON document, allowing for partial updates or complete replacement.
3. Robustness: JSON Merge Patch handles missing fields more gracefully by retaining existing values, making it suitable for cases where partial updates or optional fields are common.

### JSON Merge Patch Cons:

1. Lack of Granularity: JSON Merge Patch operates at the document level, making it less suitable for fine-grained updates. It replaces entire values or objects, potentially overwriting existing fields.
2. Limited Control: JSON Merge Patch does not provide explicit control over individual operations like add or remove. It relies on merging the provided patch with the existing document, which may not suit all use cases.
3. Complexity with Arrays: JSON Merge Patch can be more complex when dealing with arrays, as it replaces entire arrays instead of allowing precise modifications at specific indices.

## Handling query parameters

```bash
GET /products?category=electronics&brand=samsung&priceMin=500&priceMax=1000sort=price&order=asc&page=2&limit=10
```

In this example:

- The base URI is /products, representing the collection of products.
- The query parameters are used to filter the products based on certain criteria, similar to the previous example.
- The sort=price parameter indicates that the products should be sorted based on their price.
- The order=asc parameter specifies that the sorting should be in ascending order. You can use desc for descending order.
- The page=2 parameter indicates that the results should be paginated, and the response should include the products from the second page.
- The limit=10 parameter specifies that each page should contain a maximum of 10 products.

## Request and Response Payloads

### Structuring request payloads (POST and PUT)

1. Identify the Required Fields:
   - Determine the essential fields that must be included in the request payload to fulfill the requirements of the POST or PUT operation.
   - Consider the mandatory fields based on business logic and data integrity constraints.
2. Use a Clear and Consistent JSON Structure:

   - Create a JSON object that represents the request payload.
   - Use clear and meaningful field names that accurately describe the data being sent.
     Maintain a consistent structure across different API endpoints for ease of use. Example:

     ```json
     {
       "name": "John Doe",
       "age": 30,
       "email": "johndoe@example.com"
     }
     ```

3. Include Relevant Nested Structures:

- If the resource has nested or complex structures, represent them appropriately in the request payload.
- Use objects or arrays to encapsulate nested data. Example:

  ```json
  {
    "name": "Product ABC",
    "price": 9.99,
    "category": {
      "id": 1,
      "name": "Electronics"
    }
  }
  ```

4. Validate and Sanitize Input Data:
   - Implement server-side validation to ensure the integrity and validity of the request payload data.
   - Validate required fields, data types, formats, and any other specific validation rules.
     Sanitize input data to prevent security vulnerabilities like SQL injection or cross-site scripting (XSS) attacks.
5. Consider Supporting Partial Updates (PATCH):

   - If applicable, support PATCH requests to enable partial updates.
   - Allow clients to send only the modified fields in the request payload, reducing unnecessary data transfer.
     Example PATCH request payload

   ```json
   [{ "op": "replace", "path": "/name", "value": "New Name" }]
   ```

6. Document the Request Payload Structure:

   - Provide clear documentation describing the structure and expected format of the request payload for each API endpoint. I
   - Include examples and specify any validation rules or constraints.
     Example API documentation:

   ```bash
   POST /users
   ```

   Request Payload:

   ```json
   {
     "name": "string",
     "age": "integer",
     "email": "string"
   }
   ```

## Structuring Response Object

1. Use a Consistent Data Format:
   - Choose a widely supported and well-defined data format, such as JSON or XML, for your response object.
   - JSON (JavaScript Object Notation) is the most commonly used format due to its simplicity, readability, and widespread adoption.
2. Include Metadata:
   I
   - Include metadata in the response object to provide additional information about the response, such as pagination details, request status, or error messages.
   - Metadata can be included as separate fields in the response object or as response headers.
3. Follow a Clear and Logical Structure:
   - Organize the response object in a clear and logical structure that reflects the resource being returned.
   - Use meaningful field names that accurately describe the data being returned.
   - Consider using nested objects or arrays for representing complex or hierarchical data structures.
4. Minimize Data Redundancy:
   - Only include the necessary data in the response object to avoid redundancy and optimize network bandwidth usage.
   - Exclude sensitive or unnecessary information that is not required by the client.
5. Handle Errors Appropriately:
   - Define a consistent error response structure for reporting errors or exceptions.
   - Include relevant error codes, error messages, and any additional information that helps clients understand and resolve the issue.
6. Provide HATEOAS Links (optional):
   - Consider following HATEOAS principles (Hypermedia as the Engine of Application State) to include links in the response object that allow clients to navigate and discover related resources or actions.
7. Format Dates and Times:

   - Use a consistent date and time format, such as ISO 8601 (e.g., "2022-05- 31T15:30:00Z"), for representing timestamps in the response object.
     This format ensures clarity, avoids ambiguity, and promotes interoperability.

8. Document the Response Format:

   - Clearly document the structure and contents of the response object in your API documentation.
   - Provide examples and explanations to help clients understand and consume the response data effectively.

## Structuring Validation Error Messages:

1. Use a Descriptive HTTP Status Code:
   - Choose an appropriate HTTP status code to indicate a validation error, such as 400 (Bad Request) or 422 (Unprocessable Entity).
   - Use 400 for generic validation errors or 422 when the request is semantically incorrect.
2. Provide a clear and Consistent Response Message:
   - Include a concise and meaningful message in the response to indicate that a validation error has occurred.
   - Use a consistent message, such as "Validation Error" or "Invalid Request", across your API.
3. Structure the Errors Array:
   - Create an array called "errors" to hold individual error objects.
   - Each error object should contain the field name and the corresponding error message.
   - Include all relevant validation errors in the "errors" array.
4. Include Field and Message Information:

   - Use the "field" attribute to indicate the specific field or parameter that failed validation.
   - Provide a clear and descriptive "message" explaining the validation failure.
   - Ensure the "field" and "message" attributes are consistently named across all error objects.

5. Return the Validation Error Response:
   Set the appropriate HTTP status code for the response.

   - Format the response object with the "status", "message", and "errors" attributes.
   - Send the response as JSON or in the preferred data format for your API
     ```json
       "status": 400,
       "message": "Validation Error",
       "errors": [
          { "field": "name", "message": "Name is required." },
          { "field": "email","message": "Email must be a valid email address." }
       ]
     ```

### Content Negotiations

Content negotiation is the process by which a client and a server communicate to determine the most suitable representation of a resource to be exchanged. The "Accept" and "Content- Type" headers play a crucial role in content negotiation.

1. Accept Header:

   - The client includes the "Accept" header in the request to indicate the preferred media types (content types) it can understand.
   - The server examines the "Accept" header and determines the most appropriate representation to send back to the client based on its capabilities.
     Example:

   ```bash
   GET /api/products HTTP/1.1
   Host: example.com
   Accept: application/json, text/html
   ```

2. Content-Type Header:

   - The client includes the "Content-Type" header in the request to specify the media type (content type) of the payload it is sending to the server.
   - The server examines the "Content-Type" header to understand the format of the data being transmitted.
     Example:

     ```bash
     POST /api/products HTTP/1.1
     Host: example.com
     Content-Type: application/json
     Content-Length: 43
     ```

     ```json
     { "name": "Product A", "price": 10.99 }
     ```

   In this example, the client specifies that the payload being sent is in JSON format using the "Content-Type" header.
   Content negotiation helps ensure interoperability between clients and servers by allowing them to communicate and agree on the appropriate representation of a resource. The "Accept" header allows the client to express its preferred media types, and the "Content-Type" header allows the client to specify the format of the payload being sent.
   Servers should examine these headers and respond with the appropriate representation or process the incoming payload based on the specified content type. By using content
   negotiation, clients and servers can handle different data formats, such as JSON, XML, or HTML, based on their capabilities and preferences.

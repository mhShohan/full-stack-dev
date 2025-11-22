**_What is Socket?_**

A socket is a software endpoint that establishes a bidirectional communication channel between two programs running on a network, often on different machines. Once created, a socket can be used to send or receive data.

**_Socket Programming Basics_**
Socket programming involves creating sockets, binding them to addresses, listening for connections (for server sockets), accepting connections, and sending/receiving data. Common functions used in socket programming include:

- `socket()`: Create a new socket.
- `bind()`: Bind a socket to an address and port.
- `listen()`: Listen for incoming connections (server-side).
- `accept()`: Accept an incoming connection (server-side).
- `connect()`: Establish a connection to a server (client-side).
- `send()`: Send data through a socket.
- `recv()`: Receive data from a socket.
- `close()`: Close a socket.

**_What is Web Socket?_**
WebSocket is a protocol that provides full-duplex communication channels over a single TCP connection. It is designed to be implemented in web browsers and web servers but can be used by any client or server application. WebSocket enables real-time data transfer between a client (like a web browser) and a server, allowing for interactive communication.

**_WebSocket vs. HTTP_**

- **Connection**: HTTP is a request-response protocol where the client sends a request and waits for a response from the server. WebSocket, on the other hand, establishes a persistent connection that allows for continuous data exchange.
- **Data Transfer**: HTTP is stateless and typically involves more overhead due to headers in each request/response. WebSocket has lower overhead after the initial handshake, allowing for faster data transfer.
- **Use Cases**: HTTP is suitable for traditional web applications where data is fetched on demand. WebSocket is ideal for real-time applications like chat apps, online gaming, and live updates.

**_WebSocket Handshake_**
The WebSocket handshake is an initial HTTP request/response exchange that upgrades the connection from HTTP to WebSocket. The client sends an HTTP GET request with specific headers, and if the server supports WebSocket, it responds with a 101 Switching Protocols status code, establishing the WebSocket connection.

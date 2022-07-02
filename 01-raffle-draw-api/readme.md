# Raffle Draw API

## Psudo Code

- Create lottery ticket
- Update lottery ticket
- Delete lottery ticket
- Get all ticket
- Get ticket by id
- Bulk buy (user can buy multiple ticket)
- Raffle draw



## Ticket Model

- ticketId
- name
- price
- timeStamps



## Endpoints

- GET - /api/v1/tickets/u/:username --- get ticket by username
- PATCH - /api/v1/tickets/u/:username --- update ticket by username
- DELETE - /api/v1/tickets/u/:username --- delete ticket by username
- GET - /api/v1/tickets/t/:ticketId --- get ticket by ticketId
- PATCH - /api/v1/tickets/t/:ticketId --- update ticket by ticketId
- DELETE - /api/v1/tickets/t/:ticketId --- delete ticket by ticketId
- POST - /api/v1/tickets/create --- create one new ticket
- POST - /api/v1/tickets/create?quantity=5 --- create multiple new ticket by quantity
- GET - /api/v1/tickets/draw --- raffle draw to get winners
- GET - /api/v1/tickets --- get all tickets

const Ticket = require('../models/Ticket')

class MyDatabase {
    constructor() {
        this.tickets = []
    }

    /**
     * create and save ticket
     * @param {string} username 
     * @param {number} price 
     * @returns {Ticket} return a ticket
     */
    create(username, price) {
        const ticket = new Ticket(username, price)
        this.tickets.push(ticket)
        return ticket
    }

    /**
     * sell multiple ticket 
     * @param {string} username 
     * @param {number} price 
     * @param {number} quantity 
     * @returns {Array<Ticket>} return Array of tickets
     */
    bulkCreate(username, price, quantity) {
        const result = []
        for (let i = 0; i < quantity; i++) {
            const ticket = this.create(username, price)
            result.push(ticket)
        }

        return result
    }

    /**
     * @returns {Array<Ticket>} return all tickets
     */
    find() {
        return this.tickets;
    }

    /**
     * find ticket by id
     * @param {string} ticketId 
     * @returns {Ticket} return found ticket with that ticketId
     */
    findById(ticketId) {
        const foundTicket = this.tickets.find(ticket => ticket.id === ticketId)
        return foundTicket
    }

    /**
     * find ticket by id
     * @param {string} username 
     * @returns {Array<Ticket>} return array of ticket with that username
     */
    findByUsername(username) {
        const foundTickets = this.tickets.filter(ticket => ticket.username === username)
        return foundTickets
    }

    /**
     * delete ticket by id 
     * @param {string} ticketId 
     * @returns {boolean}
     */
    deleteByid(ticketId) {
        const index = this.tickets.findIndex(ticket => ticket.id === ticketId)

        if (index !== -1) {
            this.tickets.splice(index, 1)
            return true
        } else {
            return false
        }
    }

    /**
     * update ticket by id 
     * @param {string} ticketId 
     * @param {{username: string,price: number}} ticketBody 
     * @returns {Ticket} return updated ticket
     */
    updateById(ticketId, ticketBody) {
        const foundTicket = this.findById(ticketId)

        foundTicket.username = ticketBody.username || foundTicket.username
        foundTicket.price = ticketBody.price || foundTicket.username
        foundTicket.updateAt = new Date()

        return foundTicket
    }

    /**
     * 
     * @param {string} username 
     * @param {{username:string, price: number}} ticketBody 
     * @returns {Array<Ticket>} return arrray of ticket 
     */
    updateByUsername(username, ticketBody) {
        const foundTickets = this.findByUsername(username)

        const updatedTickets = []

        for (let ticket of foundTickets) {
            updatedTickets.push(this.updateById(ticket.id, ticketBody))
        }

        return updatedTickets
    }
    /**
     * 
     * @param {string} username 
     * @returns {string} return string
     */
    deleteByUsername(username) {
        const foundTickets = this.findByUsername(username)

        for (let ticket of foundTickets) {
            this.deleteByid(ticket.id)
        }

        return `${foundTickets.length} ticket delete of ${username}`
    }

    /**
     * raffle draw
     * @param {number} winnerCount 
     * @returns {Array<Ticket>} return winner array
     */
    raffleDraw(winnerCount) {
        let winnerIndexs = new Array(winnerCount)

        let index = 0
        while (index < winnerCount) {
            let winIndex = Math.floor(Math.random() * this.tickets.length)

            if (!winnerIndexs.includes(winIndex)) {
                winnerIndexs[index++] = winIndex
                continue
            }
        }

        const winners = winnerIndexs.map((index) => this.tickets[index])
        return winners
    }
}


const myDB = new MyDatabase()
module.exports = myDB
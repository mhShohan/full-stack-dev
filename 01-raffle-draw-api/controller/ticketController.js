const { MongoClient, ObjectId } = require('mongodb');
const Ticket = require('../models/Ticket')
const raffleDraw = require('../lib/raffleDraw')

const client = new MongoClient(process.env.MONGO_URI);

const handler = {}

handler.getAllTicket = async (_req, res) => {
    try {
        await client.connect()
        const tickets = await client.db('raffle-draw').collection('list').find({}).toArray()
        res.status(200).json({ status: 'success', count: tickets.length, tickets })
    } catch (error) {
        res.json(error)
    } finally {
        await client.close()
    }
}

handler.getTicketByticketId = async (req, res) => {
    const { ticketId } = req.params
    try {
        await client.connect()
        const ticket = await client.db('raffle-draw').collection('list').findOne({ _id: ObjectId(ticketId) })
        res.status(200).json({ status: 'success', ticket })
    } catch (error) {
        res.json(error)
    } finally {
        await client.close()
    }
}

handler.updateTicketByticketId = async (req, res) => {
    const { ticketId } = req.params
    try {
        await client.connect()
        await client.db('raffle-draw').collection('list').updateOne({ _id: ObjectId(ticketId) }, { $set: req.body })

        res.status(200).json({ status: 'Update successfully', })
    } catch (error) {
        res.json(error)
    } finally {
        await client.close()
    }


}

handler.deleteTicketByticketId = async (req, res) => {
    const { ticketId } = req.params

    try {
        await client.connect()
        await client.db('raffle-draw').collection('list').deleteOne({ _id: ObjectId(ticketId) })
        res.status(200).json({ status: 'delete successfully' })
    } catch (error) {
        res.json(error)
    } finally {
        await client.close()
    }
}

handler.getTicketByUsername = async (req, res) => {
    try {
        const { username } = req.params
        await client.connect()

        const tickets = await client.db('raffle-draw').collection('list').find({ username }).toArray()
        res.status(200).json({ status: 'success', count: tickets.length, tickets })
    } catch (error) {
        res.json(error)
    } finally {
        await client.close()
    }
}

handler.updateTicketByUsername = async (req, res) => {
    const { username } = req.params
    try {
        await client.connect()
        const result = await client.db('raffle-draw').collection('list').updateMany({ username }, { $set: req.body })

        res.status(200).json({ status: result.modifiedCount + 'Tickets Updated successfully', })
    } catch (error) {
        res.json(error)
    } finally {
        await client.close()
    }
}

handler.deleteTicketByUsername = async (req, res) => {
    const { username } = req.params
    try {
        await client.connect()
        const result = await client.db('raffle-draw').collection('list').deleteMany({ username })

        res.status(200).json({ status: result.deletedCount + ' Tickets Delete successfully', })
    } catch (error) {
        res.json(error)
    } finally {
        await client.close()
    }
}

handler.createTicket = async (req, res) => {
    const ticket = new Ticket(req.body.username, req.body.price)

    try {
        await client.connect()
        await client.db('raffle-draw').collection('list').insertOne(ticket)
        res.status(201).json({ message: 'Ticket Created Successfully', ticket })
    } catch (error) {
        throw new Error(error)
    } finally {
        await client.close()
    }

}

handler.createMultipleTicket = async (req, res) => {
    const { username, price, quantity } = req.body

    try {
        const tickets = []
        for (let i = 0; i <= quantity; i++) {
            tickets.push(new Ticket(username, price))
        }

        await client.connect()
        await client.db('raffle-draw').collection('list').insertMany(tickets)
        res.status(201).json({ message: quantity + ' Tickets Created Successfully', tickets })
    } catch (error) {
        throw new Error(error)
    } finally {
        await client.close()
    }

}

handler.createMany = async (req, res) => {
    const { username, price } = req.body
    const quantity = Number(req.query.quantity) || 1

    try {
        const tickets = []
        for (let i = 1; i <= quantity; i++) {
            tickets.push(new Ticket(username, price))
        }

        await client.connect()
        await client.db('raffle-draw').collection('list').insertMany(tickets)
        res.status(201).json({ message: quantity + ' Tickets Created Successfully', tickets })
    } catch (error) {
        throw new Error(error)
    } finally {
        await client.close()
    }

}

handler.raffleDraw = async (req, res) => {
    try {
        await client.connect()
        const winnerCount = Number(req.query.winner) || 3
        const tickets = await client.db('raffle-draw').collection('list').find({}).toArray()
        const winners = raffleDraw(winnerCount, tickets)

        res.status(200).json({ status: 'success', winners })
    } catch (error) {
        res.json(error)
    } finally {
        await client.close()
    }
}

module.exports = handler
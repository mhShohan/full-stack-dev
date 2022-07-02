const router = require('express').Router()
const ticketRoutes = require('../routes/ticketRoutes')

//raffle draw all routes
router.use('/api/v1/tickets', ticketRoutes)

router.get('/health', (_req, res) => {
    // throw new Error('hekllo')
    res.status(200).json({ message: 'Success' });
})

module.exports = router
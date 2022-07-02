const router = require('express').Router();
const {
    getAllTicket,
    getTicketByUsername,
    getTicketByticketId,
    updateTicketByUsername,
    updateTicketByticketId,
    deleteTicketByUsername,
    deleteTicketByticketId,
    raffleDraw,
    createMany,
} = require('../controller/ticketController');

router
    .route('/t/:ticketId')
    .get(getTicketByticketId)
    .patch(updateTicketByticketId)
    .delete(deleteTicketByticketId);

router
    .route('/u/:username')
    .get(getTicketByUsername)
    .patch(updateTicketByUsername)
    .delete(deleteTicketByUsername);

router.route('/sell').post(createMany);
router.route('/draw').get(raffleDraw);
router.get('', getAllTicket);

module.exports = router;
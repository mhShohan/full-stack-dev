const Ticket = require("../models/Ticket")

/**
 * 
 * @param {number} winnerCount 
 * @param {Array<Ticket>} tickets 
 * @returns  {Array<Ticket>} return array of winners
 */
function raffleDraw(winnerCount, tickets) {
    let winnerIndexs = new Array(winnerCount)

    let index = 0
    while (index < winnerCount) {
        let winIndex = Math.floor(Math.random() * tickets.length)

        if (!winnerIndexs.includes(winIndex)) {
            winnerIndexs[index++] = winIndex
            continue
        }
    }

    const winners = winnerIndexs.map((index) => tickets[index])
    return winners
}

module.exports = raffleDraw
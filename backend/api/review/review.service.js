const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const socketService = require('../../services/socket.service.js')

module.exports = {
    query,
    add,
}

async function query(filterBy) {
    console.log('inQuery');
    try {
        const criteria = _buildCriteria(filterBy)
        var tasks = await collection.find(criteria).toArray()

        const collection = await dbService.getCollection('review')
        var tasks = await collection.find().toArray()
        return tasks
    } catch (err) {
        logger.error('cannot find tasks', err)
        throw err
    }
}

async function add(task) {
    try {
        const collection = await dbService.getCollection('task')
        const addedTask = await collection.insertOne(task)
        return addedTask.ops[0]
    } catch (err) {
        logger.error('cannot insert task', err)
        throw err
    }
}


function _buildCriteria(filterBy = { txt: '' }) {
    const criteria = {}
    if (filterBy.txt) {
        criteria.txt = { $regex: filterBy.txt, $options: 'i' }
    }
    return criteria
}
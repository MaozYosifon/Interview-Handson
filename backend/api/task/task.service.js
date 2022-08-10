const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const externalService = require('../../services/external.service')
const socketService = require('../../services/socket.service.js')

module.exports = {
    query,
    getById,
    remove,
    add,
    update,
    performTask,
    getNextTask
}

async function query(filterBy) {
    console.log('inQuery');
    try {
        // const criteria = _buildCriteria(filterBy)
        // const sortBy = _buildSort(filterBy)
        // var tasks = await collection.find(criteria).sort(sortBy).toArray()

        const collection = await dbService.getCollection('task')
        var tasks = await collection.find().toArray()
        return tasks
    } catch (err) {
        logger.error('cannot find tasks', err)
        throw err
    }
}


async function getById(taskId) {
    try {
        const collection = await dbService.getCollection('task')
        const task = collection.findOne({ _id: ObjectId(taskId) })
        return task
    } catch (err) {
        logger.error(`while finding task ${taskId}`, err)
        throw err
    }
}

async function remove(taskId) {
    try {
        const collection = await dbService.getCollection('task')
        await collection.deleteOne({ _id: ObjectId(taskId) })
        return taskId
    } catch (err) {
        logger.error(`cannot remove task ${taskId}`, err)
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
async function update(task) {
    try {
        var id = ObjectId(task._id)
        delete task._id
        const collection = await dbService.getCollection('task')
        await collection.updateOne({ _id: id }, { $set: { ...task } })
        task._id = id
        return task
    } catch (err) {
        logger.error(`cannot update task ${taskId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy = { txt: '' }) {
    const criteria = {}
    if (filterBy.txt) {
        criteria.name = { $regex: filterBy.txt, $options: 'i' }
    }
    if (filterBy.doneAt) criteria.doneAt = null

    // if (filterBy.byLabel?.length > 0) {
    //     criteria.labels = { $in: filterBy.byLabel }
    //     // criteria.labels = { $all: filterBy.byLabel }
    // }

    return criteria
}

function _buildSort({ sortBy, dirInc }) {
    const sort = {}
    sort[sortBy] = (dirInc) ? 1 : -1
    return sort
}

async function performTask(task) {
    try {
        // TODO: update task status to running and save to DB
        task.status = 'Running'
        socketService.emitTo({ type: 'on-task-update', data: task })
        await update(task)
        // TODO: execute the task using: externalService.execute
        await externalService.execute(task)
        // TODO: update task for success (doneAt, status)
        task.status = 'Done'
        task.doneAt = Date.now()
    } catch (error) {
        // TODO: update task for error: status, errors
        task.status = 'Failed'
        task.errors.push(error)
    } finally {
        // TODO: update task lastTried, triesCount and save to DB
        task.lastTriedAt = Date.now()
        task.triesCount++
        socketService.emitTo({ type: 'on-task-update', data: task })

        await update(task)
        return task
    }
}

async function getNextTask() {
    try {
        let tasks = await query()
        const newTasks = tasks.map((task) => {
            if (!task.doneAt) return task
        })
        newTasks.sort((taskA, taskB) => {

            taskA.triesCount > taskB.triesCount &&
                taskA.importance > taskB.importance
        })
        // console.log(newTasks[0]);
        return newTasks[0]
    } catch (err) {
        console.log(err);
    }
}
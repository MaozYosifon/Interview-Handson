const taskService = require('./task.service.js')
const logger = require('../../services/logger.service')

// GET LIST
async function getTasks(req, res) {
  console.log('in getTasks');
  try {
    logger.debug('Getting Tasks')
    // var queryParams = JSON.parse(req.query.params)

    const tasks = await taskService.query()
    // const tasks = await taskService.query(queryParams)
    res.json(tasks)
  } catch (err) {
    logger.error('Failed to get tasks', err)
    res.status(500).send({ err: 'Failed to get tasks' })
  }
}

// GET BY ID 
async function getTaskById(req, res) {
  try {
    const taskId = req.params.id
    const task = await taskService.getById(taskId)
    res.json(task)
  } catch (err) {
    logger.error('Failed to get task', err)
    res.status(500).send({ err: 'Failed to get task' })
  }
}

// POST (add task)
async function addTask(req, res) {
  try {
    const task = req.body
    const addedTask = await taskService.add(task)
    res.json(addedTask)
  } catch (err) {
    logger.error('Failed to add task', err)
    res.status(500).send({ err: 'Failed to add task' })
  }
}

// PUT (Update task)
async function updateTask(req, res) {
  try {
    const task = req.body
    const updatedTask = await taskService.update(task)
    res.json(updatedTask)
  } catch (err) {
    logger.error('Failed to update task', err)
    res.status(500).send({ err: 'Failed to update task' })

  }
}

// DELETE (Remove task)
async function removeTask(req, res) {
  try {
    const taskId = req.params.id
    await taskService.remove(taskId)
    res.send('Removed')
  } catch (err) {
    logger.error('Failed to remove task', err)
    res.status(500).send({ err: 'Failed to remove task' })
  }
}

async function performTask(req, res) {
  const task = req.body
  const resTask = await taskService.performTask(task)

  res.json(resTask)
}

var isWorkerOn = false

function toggleWorker() {
  isWorkerOn = !isWorkerOn
  runWorker()
}

async function runWorker() {
  // The isWorkerOn is toggled by the button: "Start/Stop Task Worker"
  if (!isWorkerOn) return;
  var delay = 5000;
  try {
    const task = await taskService.getNextTask()
    if (task) {
      try {
        await taskService.performTask(task)
      } catch (err) {
        console.log(`Failed Task`, err)
      } finally {
        delay = 1
      }
    } else {
      console.log('Snoozing... no tasks to perform')
      isWorkerOn = false
    }
  } catch (err) {
    console.log(`Failed getting next task to execute`, err)
  } finally {
    setTimeout(runWorker, delay)
  }
}

module.exports = {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  removeTask,
  performTask,
  toggleWorker
}

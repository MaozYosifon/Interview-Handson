import { fireBaseService } from "../../services/firebase";
import { taskService } from '../../services/task.service'
import { socketService } from '../../services/socket.service'
const colName = 'task'

export const taskStore = {
    state: {
        tasks: null,
    },
    getters: {
        getTasks(state) {
            return state.tasks
        },
        getTask(state, id) {
            const idx = state.tasks.findIndex((task) => task._id === id)
            return JSON.parse(JSON.stringify(state.tasks[idx]))
        },
        getEmptyTask() {
            return taskService.getEmptyTask()
        }
    },
    mutations: {
        setTasks(state, { tasks }) {
            state.tasks = tasks
        },
        removeTask(state, { id }) {
            const idx = state.tasks.findIndex((task) => task._id === id)
            state.tasks.splice(idx, 1)
        },
        saveTask(state, { task }) {
            const idx = state.tasks.findIndex((t) => t._id === task._id)
            if (idx !== -1) {
                state.tasks.splice(idx, 1, task)
            } else {
                state.tasks.push(task)
            }
        },
    },
    actions: {
        async loadTasks({ commit }) {
            console.log('in load task');
            try {
                const tasks = await taskService.query()
                commit('setTasks', { tasks })
            } catch (error) {
                console.log('loadTasks error', error)
            }
        },
        async removeTask({ commit }, { id }) {
            try {
                await taskService.remove(id)
                commit('removeTask', { id })
            } catch (error) {
                console.log('removeTask error', error)
            }
        },
        async saveTask({ commit }, { task }) {
            try {
                const resTask = await taskService.save(task)
                commit('saveTask', { task: resTask })
            } catch (error) {
                console.log('saveTask error', error)
            }
        },
        async performTask({ commit }, { task }) {
            try {
                let currTask = JSON.parse(JSON.stringify(task))
                currTask.status = 'Running'
                commit('saveTask', { task: currTask })
                const resTask = await taskService.performTask(task)
                commit('saveTask', { task: resTask })
            } catch (error) {
                console.log('performTask error', error)
            }
        },
        workerToggle() {
            // await taskService.toggleWorker()
            socketService.emit('toggle-worker', 'HELLO')
            // console.log('error', error)


        },
    },
}
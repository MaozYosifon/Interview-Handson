import { httpService } from './http.service.js'
// import { storageService } from './storage-service.js'
// import { utilService } from './util-service.js'
// import axios from 'axios';

import Axios from 'axios'
const axios = Axios.create({ withCredentials: true })

// const API = 'http://127.0.0.1:3030/api/task/';
const API = (process.env.NODE_ENV !== 'development')
    ? '/api/task/'
    : '//localhost:3030/api/task/';


const KEY = 'tasks_db'

export const taskService = {
    query,
    getById,
    remove,
    save,
    getEmptyTask,
    performTask,
    toggleWorker,
    add,
    getAvatar
}

async function getAvatar(email) {
    let hash = email.toLowerCase()
    let echo = md5(hash)
    try {
        const res = await Axios.get(`https://www.gravatar.com/avatar/` + hash)
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }


}

async function add(review) {
    try {
        const res = await httpService.post(`review/`, review)
        return res
    } catch (error) {
        console.log(error);
    }
}
async function query() {
    //filterBy = {}
    // const res = await httpService.get(`review`, { params: filterBy })
    const res = await httpService.get(`review`)
    return res

    //     return storageService.query(KEY)
}
async function toggleWorker() {
    try {
        const task = await httpService.get('toggleWorker')
    } catch (error) {

    }
}

async function getById(taskId) {
    const res = await httpService.get(`task/${taskId}`)
    return res

    //     return storageService.get(KEY, taskId)
}

async function remove(taskId) {
    const res = await httpService.delete(`task/${taskId}`)
    return res

    //     return storageService.remove(KEY, taskId)
}

async function save(task) {
    if (task._id) {
        const res = await httpService.put(`task/${task._id}`, task)
        return res
    } else {
        const res = await httpService.post(`task/`, task)
        return res
    }

    //     if (task._id) return storageService.put(KEY, task)
    //     return storageService.post(KEY, task)
}

function getEmptyTask() {
    return {
        title: '',
        status: 'New',
        description: '',
        importance: 1,
        createdAt: Date.now(),
        lastTriedAt: null,
        triesCount: 0,
        doneAt: null,
        errors: [],
        isEdit: true
    }
}

async function performTask(task) {
    const res = await httpService.put(`task/${task._id}/start`, task)
    return res
}
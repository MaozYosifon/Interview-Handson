import { reviewService } from '../../services/reivew.service.js'
// import { socketService } from '../../services/socket.service'
const colName = 'task'

export const taskStore = {
    state: {
        reviews: [{
            _id: '1234',
            txt: '12345',
            email: '12345@example.com',
            avatar: 'http://example.com/images/default',
        }]
    },
    getters: {
        reviews(state) {
            return state.reviews
        }
    },
    mutations: {
        addReview(state, { reivew }) {
            state.reviews.push(reivew)
        },
        setRevies(state, { reviews }) {
            state.reviews = reviews
        }

    },
    actions: {
        async addReview({ commit }, { review }) {
            try {
                let copy = JSON.parse(JSON.stringify(review))
                const avatar = await reviewService.getAvatar(review.email)
                copy.avatar = avatar
                // return
                console.log(copy);
                // await reviewService.add(copy)
                commit('addReview', { reivew: copy })
            } catch (error) {

            }
        },
        async getReviews({ commit }) {
            try {
                const reviews = await reviewService.query()
                commit('setRevies', { reviews })
            } catch (error) {
                console.log(error)
            }
        }
    },
}
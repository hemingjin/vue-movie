import Vue from 'vue'
import router from 'vue-router'

Vue.use(router)

const Movie = (resolve) => {
    import('page/movieList').then((module) => {
        resolve(module)
    })
}

const Detail = (resolve) => {
    import('page/movieDetail').then((module) => {
        resolve(module)
    })
}

export default new router({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            redirect: '/movies'
        },
        {
            path: '/movies',
            component: Movie,
            // children: [
            //     {
            //         path: ':id',
            //         component: Detail
            //     }
            // ]
        } 
        ,
        {
            path: '/movies/:id',
            component: Detail,
        } 
        
    ]
})
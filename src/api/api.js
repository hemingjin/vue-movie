import jsonp from 'jsonp'

const BASE_URL = 'https://api.douban.com';
const API_KEY = '0b2bdeda43b5688921839c8ecb20399b';

//获取电影列表
function getMovies (url){
    return new Promise ( (resolve ,reject) => {
        jsonp(BASE_URL + url, {}, (err, data) => {
            if(!err){
                resolve(data);
            }else{
                reject(err);
            }
        })
    })
}

//获取电影介绍
function getMovieDetails(id) {
    return new Promise ( (resolve, reject) => {
        jsonp(BASE_URL + '/v2/movie/subject/' + id + '?apikey=' + API_KEY, {},(err, data) => {
            if(!err){
                resolve(data);
            }else{
                reject(err);
            }
        })
    })
}

//获取电影相关图片
function getMoviePhotos (id){
    return new Promise ( (resolve ,reject) => {
        jsonp(BASE_URL + '/v2/movie/subject/' + id + '/photos?apikey=' + API_KEY, {}, (err, data) => {
            if(!err){
                resolve(data);
            }else{
                reject(err);
            }
        })
    })
}

//获取电影短评
function getMovieReviews (id){
    return new Promise ( (resolve ,reject) => {
        jsonp(BASE_URL + '/v2/movie/subject/' + id + '/reviews?apikey=' + API_KEY, {}, (err, data) => {
            if(!err){
                resolve(data);
            }else{
                reject(err);
            }
        })
    })
}

//获取电影评论
function getMovieComments (id){
    return new Promise ( (resolve ,reject) => {
        jsonp(BASE_URL + '/v2/movie/subject/' + id + '/comments?apikey=' + API_KEY, {}, (err, data) => {
            if(!err){
                resolve(data);
            }else{
                reject(err);
            }
        })
    })
}
export {
    getMovies,
    getMovieDetails,
    getMoviePhotos,
    getMovieReviews,
    getMovieComments
}

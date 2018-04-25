<template>
    <div>
        <div class="movie-item" v-for="(movie, index) in movieList" @click="getMovie(movie.id)">
            <div class="movie-img">
                <img :src="movie.images.large" alt="">
            </div>
            <div class="movie-subject">
                <span>{{movie.title}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: {
        movieList: {
            type: Array
        }
    },
    methods: {
        getMovie(id) {
            this.$emit('getMovie', id);
        }
    }
}
</script>
<style scoped>
    .movie-item{
        float: left;
        width: 160px;
        margin-right: 20px;
        margin-bottom: 20px;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .2);
        cursor: pointer;
    }
    .movie-img{
        width: 100%;
        height: 210px;
        
    }
    .movie-img img{
        width: 100%;
        height: 100%;
    }
    .movie-subject{

    }
    .movie-subject span{
        display: block;
        padding: 10px 0;
        font-size: 14px;
        text-align: center;
    }
</style>

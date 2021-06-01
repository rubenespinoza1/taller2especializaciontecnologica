<template>
  <div>
    <h1>Funciona la ruta dinamica</h1>
    <h6>

      <img :src="this.movie.poster_path" :alt="this.movie.poster_path">
    </h6>
    <router-view></router-view>
  </div>
</template>

<script>
import ApiService from "@/services/api.service.js";
import Movie from "@/models/Movie";

export default {
  data() {
    return {
      movie: null,
    };
  },
  mounted() {
    this.loadMovieDetails();
  },
  methods: {
    loadMovieDetails() {
      let response_data = ApiService.getMovie(this.$route.params.id);

      response_data.then(({ data }) => {
        //console.log(data)
        //const {id, original_language, original_title, adult, backdrop_path, poster_path, genres, overview, popularity, release_date, title, video, vote_average, vote_count} = data
        
        //const movie = new Movie(data)
        
        //this.movie = movie
        this.movie = new Movie(data)
        //console.log(this.movie)
      });
      
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>
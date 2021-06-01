<template>
  <div id="peliculas">
    <h1>Aca estan las peliculas populares</h1>
    <ol>
      <li v-for="pelicula in peliculas" :key="pelicula.id">
        <button @click="seeMovie(pelicula.id)">{{ pelicula.title }}</button>
      </li>
    </ol>

    <div id="botones-navegacion">
      <button @click="seeMore">Pagina Siguiente</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ApiService from "@/services/api.service.js";
import Movie from '@/models/Movie'

export default {
  
  data() {
    return {
      peliculas: [],
      current_page: 1,
    };
  },
  mounted() {
    this.getInitialMovies();
  },
  methods: {
    getInitialMovies() {
      const response_data = ApiService.getPopular(this.current_page);
      response_data.then(({ data }) => {
        for (let i = 0; i < 20; i++) {
          this.peliculas.push(new Movie(data.results[i]))
          //console.log(new Movie(data.results[i]))
        }
      });
      
    },
    seeMore() {
      let response_data = ApiService.getNowPlaying(++this.current_page);
      response_data.then(({ data }) => {
        //console.log(data.results)
        for (let i = 0; i < 20; i++) {
          this.peliculas.push(new Movie(data.results[i]));
        }
      });
      console.log(this.peliculas)
    },
    seeMovie(id){
      this.$router.push({path: `/peliculas/${id}`})
    }
  },
};
</script>

<style>
</style>
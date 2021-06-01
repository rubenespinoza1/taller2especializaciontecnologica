<template>
  <div id="peliculas">
    <div class="container">
      <div v-for="pelicula in peliculas" :key="pelicula.id" class="movie-row">
        <div>
          <input
            type="image"
            :src="pelicula.poster_path"
            :alt="pelicula.title"
            class="movie-card"
            @click="seeMovie(pelicula.id)"
          />
          <div>
            <label class="label-title">{{ pelicula.title }}</label>
          </div>
        </div>
      </div>

      <div id="botones-navegacion">
        <button @click="seeMore" type="button" class="btn btn-primary">
          Ver mas
          <span class="badge">+</span>
        </button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ApiService from "@/services/api.service.js";
import Movie from "@/models/Movie";

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
      let response_data = ApiService.getNowPlaying(this.current_page);
      response_data.then(({ data }) => {
        for (let i = 0; i < 20; i++) {
          this.peliculas.push(new Movie(data.results[i]));
          //console.log(new Movie(data.results[i]))
        }
      });
    },
    seeMore() {
      let response_data = ApiService.getNowPlaying(++this.current_page);
      response_data.then(({ data }) => {
        for (let i = 0; i < 20; i++) {
          this.peliculas.push(new Movie(data.results[i]));
          //console.log(new Movie(data.results[i]))
        }
      });
    },
    seeMovie(id) {
      this.$router.push({ path: `/peliculas/${id}` });
    },
  },
};
</script>

<style>
#botones-navegacion {
  align-content: center;
}

.label-title{
  text-shadow: 0.5px 0.5px black;
}

.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
  width: 100%;
  height: 10vh;
}
.movie-row {
  text-align: center;
  background: white;
}
.movie-card {
  text-align: center;
  max-width: 200px;
  max-height: 200px;
  border: red;
  border-radius: 2rem;
}
</style>
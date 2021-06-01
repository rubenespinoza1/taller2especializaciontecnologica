<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="elem-at-right mr-sm-2" to="/" replace>Home</router-link> |
        <router-link class="elem-at-right mr-sm-2" to="/peliculas/populares" replace>Populares</router-link> |
        <router-link class="elem-at-right mr-sm-2" to="/peliculas/top-rated" replace>Mejor Puntuadas</router-link>
      </nav>
    </div>
    <router-view />
  </div>
</template>

<script>
</script>
<style>
</style>


<style>

.elem-at-right{
  align-content: right;

  padding: 10px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/setup">Setup</router-link> |
      <router-link to="/visualization">Visualization</router-link>
    </div>
    <router-view />
    <div>
      Icons made by
      <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons"
        >Smashicons</a
      >
      from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      is licensed by
      <a
        href="http://creativecommons.org/licenses/by/3.0/"
        title="Creative Commons BY 3.0"
        target="_blank"
        >CC 3.0 BY</a
      >
    </div>
    <div>
      Icons made by
      <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      is licensed by
      <a
        href="http://creativecommons.org/licenses/by/3.0/"
        title="Creative Commons BY 3.0"
        target="_blank"
        >CC 3.0 BY</a
      >
    </div>
  </div>
</template>

<style>
/*
TODO Implement CSS Grid for proper Visualization
*/
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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

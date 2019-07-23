<template>
  <div class="wrapper">
    <div class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/setup">Setup</router-link> |
      <router-link to="/visualization">Visualization</router-link>
    </div>
    <div class="app">
      <router-view />
    </div>
    <div class="footer">
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
      <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@pecchio?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Tommaso Pecchioli"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Tommaso Pecchioli</span></a>
    </div>
  </div>
</template>

<style lang="scss">
/*
TODO Implement CSS Grid for proper Visualization
*/
.wrapper {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-rows: fit-content 2fr min-content;
  // grid-auto-columns: 0.5fr;
  grid-template-areas: 
    "header"
    "main"
    "footer"
}
.app {
  grid-area: main;
}
.nav {
  grid-area: header;
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
  }
  a.router-link-exact-active {
    color: #42b983;
  }
}
.footer {
  grid-area: footer;
}
</style>

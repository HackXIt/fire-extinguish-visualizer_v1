module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/scss/_variables.scss";'
      }
    },
    modules: true
  },

  runtimeCompiler: true
};

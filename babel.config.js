module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    // https://github.com/vitejs/vite/issues/1149#issuecomment-775033930
    function () {
      return {
        visitor: {
          MetaProperty(path) {
            path.replaceWithSourceString('process')
          }
        }
      }
    }
  ]
}

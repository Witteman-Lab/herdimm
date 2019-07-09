module.exports = {
  presets: [
    '@vue/app',
    ["env", {
      "targets": {
        // The % refers to the global coverage of users from browserslist
        "browsers": [ "> 1%", "last 2 versions" ]
      }
    }]
  ]
}

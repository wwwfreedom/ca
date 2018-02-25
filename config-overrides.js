const rewireReactHotLoader = require("react-app-rewire-hot-loader")
const { injectBabelPlugin } = require("react-app-rewired")

module.exports = function override(config, env) {
  config = injectBabelPlugin("babel-plugin-styled-components", config)
  config = rewireReactHotLoader(config, env)
  return config
}

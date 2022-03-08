const { environment } = require('@rails/webpacker')
const sound = require('./loaders/sound')
// Preventing Babel from transpiling NodeModules packages
environment.loaders.append('sound', sound)
environment.loaders.delete('nodeModules');
module.exports = environment

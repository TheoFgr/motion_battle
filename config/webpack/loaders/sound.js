module.exports = {
  test: /\.(wav|mp3|m4a)/,
  use: [
    {
      loader: 'file-loader',
    }
  ]
}

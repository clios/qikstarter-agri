;(async () => {
  require('dotenv').config()
  const sassPlugin = require('esbuild-plugin-sass')

  require('esbuild')
    .build({
      bundle: true,
      define: {
        'process.env.BASE_URL': `"${process.env.BASE_URL}"`,
        'process.env.MAPBOX_ACCESS_TOKEN': `"${process.env.MAPBOX_ACCESS_TOKEN}"`
      },
      entryPoints: ['src/index.jsx'],
      loader: {
        '.data': 'base64',
        '.svg': 'file',
        '.png': 'file',
        '.woff': 'file',
        '.woff2': 'file',
        '.geojson': 'file'
      },
      minify: false,
      outfile: 'dev/index.js',
      plugins: [sassPlugin()],
      sourcemap: true,
      watch: true
    })
    .catch(() => process.exit(1))

  require('fs-extra').copy('public', 'dev', (err) => {
    if (err) return console.error(err)
    console.log('public files was copied to dev folder')
  })

  require('live-server').start({
    file: 'index.html',
    host: 'localhost',
    open: false,
    port: 80,
    root: 'dev'
  })
})()

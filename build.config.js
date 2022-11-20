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
      minify: true,
      outfile: 'dist/index.js',
      plugins: [sassPlugin()],
      sourcemap: false,
      watch: false
    })
    .catch(() => process.exit(1))
})()

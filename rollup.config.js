import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import globals from 'rollup-plugin-node-globals'
import { uglify } from 'rollup-plugin-uglify'
import livereload from 'rollup-plugin-livereload'
import postcss from 'rollup-plugin-postcss'
import gzip from 'rollup-plugin-gzip'
import serve from 'rollup-plugin-serve'
import globImport from 'rollup-plugin-glob-import'
import replace from 'rollup-plugin-replace'
import filesize from 'rollup-plugin-filesize'
import path from 'path'
import snarkdown from 'snarkdown'
import fm from 'front-matter'
import { createFilter } from 'rollup-pluginutils'

const prod = !process.env.ROLLUP_WATCH
const dev = !prod

function md (options = {}) {
  const filter = createFilter(options.include || ['**/*.md'], options.exclude)
  return {
    name: 'md',

    transform (md, id) {
      if (!/\.md$/.test(id)) return null
      if (!filter(id)) return null

      const data = fm(md)
      data.body = snarkdown(data.body)
      return {
        code: `export default ${JSON.stringify(data)};`,
        map: { mappings: '' }
      }
    }
  }
}

const rename = (name, id) => {
  return name || '_' + path.basename(id, path.extname(id))
    .replace(/-/g, '_')
    .replace(/\./g, '__')
    .replace(/[-+*/:;.'"`?!&~|<>^%#=@[\]{}()\s\\]+([a-z]|$)/g, (match, c) => c.toUpperCase())
}

export default {
  input: 'src/index.js',
  output: {
    file: 'public/vendor/index.js',
    sourcemap: dev ? 'inline' : false,
    format: 'iife'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'development')
    }),
    resolve({ browser: true }),
    md(),
    postcss({
      extract: true,
      minify: true
    }),
    globImport({
      rename,
      format: 'default'
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      presets: [['@babel/preset-env', {
        loose: true,
        modules: false,
        useBuiltIns: 'entry'
      }]],
      plugins: [
        ['transform-react-jsx', { pragma: 'h' }]
      ]
    }),
    commonjs(),
    globals(),
    prod && uglify(),
    prod && gzip(),
    prod && filesize(),
    dev && livereload('public'),
    dev && serve({
      contentBase: ['public'],
      historyApiFallback: true,
      port: 3000
    })
  ]
}

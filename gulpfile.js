// import modules
import { readFileSync } from 'node:fs'
import { deleteAsync as del } from 'del'
import replace from 'gulp-replace'
import markdown from './gulp-md.js'
import gulp from 'gulp'
const { src, dest, parallel, series, watch } = gulp

// parse and sanitize markdown files (*.md -> *.html)
function parse() {
  return src('src/md/*.md').pipe(markdown()).pipe(dest('src/md'))
}

// inline past html code
function inline() {
  return src('src/layout/index.html')
    .pipe(
      replace(/{{\s?slug\s?}}/, () => {
        const file = readFileSync('src/md/page.html', 'utf8')
        return file
      })
    )
    .pipe(dest('src'))
}

// copy assets files
function copy() {
  return src(['src/{css,js}/*', 'src/*.html']).pipe(dest('dist'))
}

// clean task
function clean() {
  return del(['dist/**'])
}

// watch
function watcher() {
  watch('src/md/*.md', parse)
  watch('src/info.html', copy)
  watch('src/layout/index.html', series(inline, copy))
}

// export
export { clean, copy, parse, inline, watcher }
export const build = series(clean, parse, inline, copy)
export const dev = series(build, watcher)

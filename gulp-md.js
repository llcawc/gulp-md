import { Buffer } from 'node:buffer';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import through2 from 'through2';
/**
 * Parse md file - transform markdown to html with "marked" and "DOMPurify"
 * @param options Hash of marked options https://marked.js.org/using_advanced#options
 * @returns {internal.Transform} Transform stream instance
 */
export default function parse(options = null) {
    if (options) {
        marked.use(options);
    }
    return through2.obj(function (file, _, cb) {
        if (file.isBuffer()) {
            const mark = marked.parse(file.contents.toString());
            const sanit = DOMPurify.sanitize(mark.toString());
            file.contents = Buffer.from(sanit);
            file.extname = '.html';
        }
        cb(null, file);
    });
}

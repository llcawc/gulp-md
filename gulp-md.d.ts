import internal from 'node:stream';
/**
 * Parse md file - transform markdown to html with "marked" and "DOMPurify"
 * @param options Hash of marked options https://marked.js.org/using_advanced#options
 * @returns {internal.Transform} Transform stream instance
 */
export default function parse(options?: null): internal.Transform;

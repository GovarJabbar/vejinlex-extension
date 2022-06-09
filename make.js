const fs = require('fs-extra')
const replace = require("replace");

log('Duplicating files for chrome extension');

fs.copySync('assets', 'dist/chrome')

log('Duplicating manifest.json for chrome extension');

fs.copySync('manifests/chrome-manifest.json', 'dist/chrome/manifest.json')


log('Duplicating files for firefox extension');

fs.copySync('assets', 'dist/firefox')

log('Duplicating manifest.json for firefox extension');

fs.copySync('manifests/firefox-manifest.json', 'dist/firefox/manifest.json')


log('Replacing chrome api to browser for firefox');
replace({
    regex: "chrome.",
    replacement: "browser.",
    paths: ['dist/firefox/js'],
    recursive: true,
    silent: true,
});



function log(text) {
    console.log('\x1b[36m%s\x1b[0m', text);
}
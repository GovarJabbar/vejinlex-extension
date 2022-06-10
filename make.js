const fs = require('fs-extra')
const path = require('path')
const replace = require("replace");
const strip = require('strip-comments');



log('Duplicating files for chrome extension');

fs.copySync('assets', 'dist/chrome')

log('Duplicating manifest.json for chrome extension');

fs.copySync('manifests/chrome-manifest.json', 'dist/chrome/manifest.json')


log('Duplicating files for firefox extension');

fs.copySync('assets', 'dist/firefox')

log('Duplicating manifest.json for firefox extension');

fs.copySync('manifests/firefox-manifest.json', 'dist/firefox/manifest.json')

log('Create custom app.js for each extensions');

let app = fs.readFileSync(path.join(__dirname, 'assets/js/app.js'), { encoding: 'utf8' });
const chrome_app = app.replace(app.split('/*** Start Firefox ***/')[1].split('/*** End Firefox ***/')[0], '')
fs.writeFileSync("dist/chrome/js/app.js", strip(chrome_app));

const firefox_app = app.replace(app.split('/*** Start Chrome ***/')[1].split('/*** End Chrome ***/')[0], '')
fs.writeFileSync("dist/firefox/js/app.js", strip(firefox_app));

log('Create custom background.js for each extensions');

let background = fs.readFileSync(path.join(__dirname, 'assets/js/background.js'), { encoding: 'utf8' });

const firefox_backgroubd = background.replace(background.split('/*** Start Chrome ***/')[1].split('/*** End Chrome ***/')[0], '')
fs.writeFileSync("dist/firefox/js/background.js", strip(firefox_backgroubd));

fs.writeFileSync("dist/chrome/js/background.js", strip(background));

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
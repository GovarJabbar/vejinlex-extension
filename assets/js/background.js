/*  Vejinlex data */

// Language Options
var vejinlex_language = 'ck';
let vejinlex_search_url = `https://lex.vejin.net/${vejinlex_language}/search`

const interface_languages = [{
        name: 'کوردی',
        code: 'ck',
    },
    {
        name: 'Kurdî',
        code: 'nk',
    },
    {
        name: 'English',
        code: 'en',
    },
    {
        name: 'فارسی',
        code: 'fa',
    },
];

// 

// Init Menu
chrome.contextMenus.create({
    id: 'vejinlex-selection',
    title: "VejînLex: \"%s\"",
    contexts: ["selection"],
});


chrome.contextMenus.onClicked.addListener((info, tab) => {

    if (info.menuItemId == "vejinlex" || info.menuItemId == "vejinlex-selection") {


        let dictionary_url = vejinlex_search_url;

        if (info.selectionText && info.selectionText != '') {
            dictionary_url = `${vejinlex_search_url}?t=${info.selectionText}`;
        }

        chrome.tabs.create({
            url: dictionary_url
        });
    }
});


/*** Start Chrome ***/
chrome.contextMenus.create({
    id: 'vejinlex',
    title: "VejînLex",
    contexts: ["action", "audio", "browser_action", "editable", "frame", "image", "link", "page", "page_action"],
});

chrome.contextMenus.create({
    title: `Language (${interface_languages.find(language => language.code == vejinlex_language).name})`,
    id: "vejinlex-language",
    contexts: ["action"]
});

interface_languages.forEach(language => {

    chrome.contextMenus.create({
        id: "vejinlex-language-" + language.code,
        title: language.name,
        parentId: "vejinlex-language",
        contexts: ["action"],
    });

});


chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.parentMenuItemId == "vejinlex-language") {
        let language_code = info.menuItemId.replace("vejinlex-language-", "")

        chrome.storage.sync.set({
            vejinlex_language: language_code
        }, () => {});

    }
})

/*** End Chrome ***/


// Storage

// set up initial chrome storage values

// when the extension is first installed, set default values
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({
        vejinlex_language: 'ck',
    }, function() {});
});


chrome.storage.sync.get([
    'vejinlex_language',
], function(result) {
    vejinlex_language = result.vejinlex_language;
});

// any time a storage item is updated, update global variables
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace === 'sync') {
        if (changes.vejinlex_language) {
            vejinlex_language = changes.vejinlex_language.newValue;
        }

        chrome.contextMenus.update('vejinlex-language', {
            title: `Language (${interface_languages.find(language => language.code == changes.vejinlex_language.newValue).name})`,
        });

        vejinlex_search_url = `https://lex.vejin.net/${changes.vejinlex_language.newValue}/search`
    }
});
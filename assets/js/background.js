const vejinlex_url = "https://lex.vejin.net/ck/search"

chrome.contextMenus.create({
    id: 'vejinlex-selection',
    title: "VejînLex: \"%s\"",
    contexts: ["selection"],
});

/*** Start Chrome ***/
chrome.contextMenus.create({
    id: 'vejinlex',
    title: "VejînLex",
    contexts: ["action", "audio", "browser_action", "editable", "frame", "image", "link", "page", "page_action", "selection"],
});
/*** End Chrome ***/

chrome.contextMenus.onClicked.addListener((info, tab) => {

    if (info.menuItemId == "vejinlex" || info.menuItemId == "vejinlex-selection") {

        let dictionary_url = vejinlex_url;

        if (info.selectionText && info.selectionText != '') {
            dictionary_url = `${vejinlex_url}?t=${info.selectionText}`;
        }

        chrome.tabs.create({
            url: dictionary_url
        });
    }
});
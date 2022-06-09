const vejinlex_url = "https://lex.vejin.net/ck/search"

chrome.contextMenus.create({
    id: 'vejinlex',
    title: "VejînLex: \"%s\"",
    contexts: ["all"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {

    if (info.menuItemId == "vejinlex") {

        let dictionary_url = vejinlex_url;

        if (info.selectionText && info.selectionText != '') {
            dictionary_url = `${vejinlex_url}?t=${info.selectionText}`;
        }

        chrome.tabs.create({
            url: dictionary_url
        });
    }
});
const vejinlex_url = "https://lex.vejin.net/ck/search"

window.onload = async() => {

    let result;
    /*** Start Chrome ***/
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    try {
        [{ result }] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => getSelection().toString(),
        });
    } catch (e) {}
    /*** End Chrome ***/

    /*** Start Firefox ***/

    await browser.tabs
        .executeScript({
            code: "document.getSelection().toString()"
        })
        .then(results => {
            result = results[0]
        });
    /*** End Firefox ***/

    var iframe = document.createElement("iframe");

    iframe.src = vejinlex_url;
    if (result && result != '') {
        iframe.src = `${vejinlex_url}?t=${result}`;
    }

    let container = document.getElementById('container');
    container.innerHTML = ''
    container.appendChild(iframe);
};
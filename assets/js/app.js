const vejinlex_url = "https://lex.vejin.net/ck/search"

window.onload = async() => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let result;
    try {
        [{ result }] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => getSelection().toString(),
        });
    } catch (e) {}

    var iframe = document.createElement("iframe");

    iframe.src = vejinlex_url;
    if (result && result != '') {
        iframe.src = `${vejinlex_url}?t=${result}`;
    }

    let container = document.getElementById('container');
    container.innerHTML = ''
    container.appendChild(iframe);
};

// const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
// if (isDarkMode && isDarkMode.matches === true)
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

let vejinlex_language = 'ck';

chrome.storage.sync.get([
    'vejinlex_language',
], function(result) {
    if (result.vejinlex_language) {
        vejinlex_language = result.vejinlex_language;
        document.getElementById(result.vejinlex_language).setAttribute('checked', 'checked');
    }
});

const languages_container = document.querySelector('#languages_container');

interface_languages.forEach(language => {
    let child = document.createElement('div');
    child.innerHTML = `<label for="${language.code}" class="radio"><input ${language.code == vejinlex_language ? 'checked' : ''} id="${language.code}" type="radio" name="language" value="${language.code}"><span>${language.name}</span></label>`;
    child = child.firstChild;
    languages_container.appendChild(child);
});

if (document.querySelector('input[name="language"]')) {
    document.querySelectorAll('input[name="language"]').forEach((elem) => {
        elem.addEventListener("change", (event) => {
            var item = event.target.value;
            console.log(item);
            chrome.storage.sync.set({
                vejinlex_language: item
            }, () => {});
        });
    });
}
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', onclick, false)
    function onclick() {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let url = tabs[0].url;

            const queryString = url.slice(url.indexOf('?'));
            const urlParams = new URLSearchParams(queryString);
            var id;
            if(urlParams.get('id') != null) {
                id = urlParams.get('id').replace("#/","");
            }
            else if(urlParams.get('Id') != null) {
                id = urlParams.get('Id').replace("#/","");
            }
            
            if(id != null) {
                const initialUrl = url.slice(0, url.indexOf('com/'));
                const urlString = initialUrl + 'com/' + id + '?nooverride';
                chrome.tabs.create({url: urlString});
            }
        }); 
        window.close();
    }
}, false)
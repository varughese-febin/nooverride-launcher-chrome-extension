
function onclick(e) {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        let index = tabs[0].index + 1;
        if(url.indexOf('?') != -1) {
            const queryString = url.slice(url.indexOf('?'));
            const urlParams = new URLSearchParams(queryString);
           // let urlKeysArray = Array.from(urlParams.keys());
            let urlKeysArray = validURLKeys;
            var urlKey = '';
            if(urlKeysArray.length > 1) {
                urlKey = document.getElementById("urlKeysDropdown").value;
            }
            else if(urlKeysArray.length == 1){
                urlKey = urlKeysArray[0];
            }
            var id;
            if(urlParams.get(urlKey) != null && urlKey != '') {
                id = urlParams.get(urlKey).replace("#/","");
            }
            
            if(id != null) {
                const initialUrl = url.slice(0, url.indexOf('com/'));
                var urlEnder;
                if(e.target.id == 'edit-btn') {
                    urlEnder = '/e?nooverride';
                }
                else if(e.target.id == 'tab-btn') {
                    id = id.substr(0,3);
                    urlEnder = '';
                }
                else {
                    urlEnder = '?nooverride';
                }
                
                const urlString = initialUrl + 'com/' + id + urlEnder;
                chrome.tabs.create({'url': urlString, 'index': index});
            }
        }
    }); 
    window.close();
}

function disableButtons() {
    var buttons = document.querySelectorAll('button');
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].style.disabled = true;
        buttons[i].style.opacity = 0.5;
        buttons[i].style.backgroundColor = 'grey';
        buttons[i].style.cursor = 'not-allowed';
    }
}

var validURLKeys = new Array();
document.addEventListener('DOMContentLoaded', function () {
    
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        if(url != null && url.indexOf('?') != -1) {

            const queryString = url.slice(url.indexOf('?'));
            let urlParams = new URLSearchParams(queryString);
            let selectContainer = document.getElementById("select-container");
            let urlKeysArray = Array.from(urlParams.keys());
            
            let isValidKeyPresent = false;
            for(var i = 0; i < urlKeysArray.length; i++) {
                let value = urlParams.get(urlKeysArray[i]).replace("#/", "");
                if(value.length == 15 || value.length == 18) {
                    validURLKeys.push(urlKeysArray[i]);
                    isValidKeyPresent = true;
                }
            }
    
            if(isValidKeyPresent) {
                if(validURLKeys.length > 1) {
                    var selectList = document.createElement("select");
                    selectList.id = "urlKeysDropdown";
                    selectContainer.appendChild(selectList);
            
                    for(var i = 0; i < validURLKeys.length; i++) {
                        var option = document.createElement("option");
                        option.value = validURLKeys[i];
                        option.text = validURLKeys[i];
                        selectList.appendChild(option);
                    }
                }
                var buttons = document.querySelectorAll('button');
                for(var i = 0; i < buttons.length; i++) {
                    buttons[i].addEventListener('click', onclick);
                }
            }
            else {
                disableButtons();
            }
        }
        else {
            disableButtons();
        }
    }); 
});
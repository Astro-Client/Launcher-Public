const electron = require('electron');
const remote = require('electron').remote;
const {ipcRenderer} = electron;


$(document).ready(() => {
    $('#lodingTitle').hide();
    
    setTimeout(function() {
        $('#lodingTitle').fadeIn(500);
    }, 1000);

    ipcRenderer.on('closeSplash', function(e, item){
        console.log('testing: ok!')
        setTimeout(function() {

            $('#loadingPage').fadeOut(1000);
            setTimeout(function() {
                var window = remote.getCurrentWindow();
                window.close();
            }, 1000);       
        }, 2000);
        window.close();
        return true;
    });
})
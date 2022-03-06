const electron = require('electron');
const {ipcRenderer} = electron;

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

function logout() {
    ipcRenderer.send('logoutevent');
}

$(document).ready(function() {
    $('#launchButton').prop("disabled", true);
    $('#footerForm').hide();
    $('#home').hide();
    $('#loginModal').modal('hide');
    
    setTimeout(() => {
        $('#home').fadeIn(1000);
        setTimeout(() => {
            $('#footerForm').fadeIn(1000);
        }, 500);
    }, 1500);

    // HIDE ELEMENT
    
    //$('#mainPage').hide();
    $('#loadingPage').hide();
    $('#lodingTitle').hide();
    
    /*
    setTimeout(function() {
        $('#loadingPage').fadeOut(1000);
        setTimeout(function() {
            $('#mainPage').fadeIn(500);
        }, 1000);

    }, 3000);

    
    setTimeout(function() {
        $('#lodingTitle').fadeIn(500);
        setTimeout(function() {
            $('#lodingTitle').fadeOut(1000);
        }, 200);
    }, 1000);
    */
    
    $("#launchButton").click(function() {
        if($("#RamMinSizeAllowed").val() == "") $("#RamMinSizeAllowed").val(2000);
        if($("#RamMaxSizeAllowed").val() == "") $("#RamMaxSizeAllowed").val(2000)
        inputContent = {"max": parseInt($("#RamMinSizeAllowed").val()), "min":parseInt($("#RamMinSizeAllowed").val())};
        if(inputContent != '') {
            if(inputContent == 'Enter Value !') {
                inputContent = $('#username').val('Enter Value !')
            } else {
                $('#launchButton').prop("disabled",true);
                ipcRenderer.send('Launch', inputContent);
                inputContent = $('#launchButton').html('Starting Game...')
            }
        } else {
            inputContent = $('#username').val('Enter Value !')
        }
    })

    /* login part */
    $("#form-login-submit").on('click', function () {
        $('#form-login-submit').prop("disabled",true);
        console.warn('[ASTRO CLIENT] Login in...');
        ipcRenderer.send('loginevent', {'login': $("#form-login-email").val(), 'password': $("#form-login-password").val()});
    });
    
    ipcRenderer.on('GameStopped', function(e, item){
        $('#launchButton').prop("disabled",false);
        inputContent = $('#launchButton').html('Launch')
    });

    ipcRenderer.on('nead-login', function(e, item){
        $('#form-login-submit').prop("disabled",false);
        $('#loginModal').modal({backdrop: 'static', keyboard: false})  /* disable keyboard usage to canot exit the modal */
        console.log('nead connect, openning modal !')
    });

    ipcRenderer.on('loged', function(e, item){
        console.log('[ASTRO CLIENT] LOGED')
        $('#loginModal').modal('hide');
        $('#launchButton').prop("disabled",false);
        setTimeout(function(){
            $('#loginModal').modal('hide');
        }, 1000);
    });

    ipcRenderer.on('debugGameLaunch', function(e, debugValue) {
        $("#debugMc").html(debugValue);
    });

    ipcRenderer.send('init');
})
import { AutoAuthModule } from './sources/AutoAuth';
import { ipcMain, app, BrowserWindow, dialog, session }from 'electron';
import { Client, Authenticator, ILauncherOptions } from 'minecraft-launcher-core';
import { request, end_all_process } from './sources/utils';
import fs from 'fs';
import WebSocket from 'ws';
import os from 'os-utils';
import { config } from './config';
// import path from 'path';
// import Downloader from 'nodejs-file-downloader';


var loginWindow: Electron.CrossProcessExports.BrowserWindow,
    mainWindow: Electron.CrossProcessExports.BrowserWindow, 
    splashScreenLoading: Electron.CrossProcessExports.BrowserWindow, 
    MinecraftLaunch: Client,
    logger: Logger,
    global_connection: WebSocket,
    Launcher: Launcher;

/*
BEFORE LAUNCHING
*/

// WebSocket configuration
function SetupeWebSocket(launcherToken) {
    if(!global_connection) setInterval(() => {
        try {
            _sendSocketMessage("ping","keepalive");
        } catch(err) { console.log(err); }
    }, 1000*10);

    const url = 'ws://'+Launcher.remoteConfig.proxy.websocket;
    const connection = new WebSocket(url);

    connection.on('close', function() {
        logger.write('socket close');
        setTimeout(()=> {SetupeWebSocket(launcherToken)}, 1000*20); // Reconnect on crash
    });

    connection.onopen = () => {
        logger.log("[WS] connection successfuly created", logger.log_options().info);
        global_connection = connection;
    }

    connection.onerror = (error) => {
        console.log(`WebSocket error: ${error}`);
    }

    connection.onmessage = (e) => {
        // console.log("Recive WS message:"+ e.data);
        switch (e.data) {
            case "auth":
                connection.send("auth|"+launcherToken)
                break;
            case "auth_success":
                connection.socket_auth = true;
                logger.log("[WS] auth success", logger.log_options().info);
        }
    }
}

function _sendSocketMessage(optionsOperation: string, params: string) {
    if(global_connection) global_connection.send(`${optionsOperation}|${params}`); // If socket connection, send message
}

/*
// Auto-Login Function
*

/*
// Call Api Methods
*/
/* 
    *Function Process to login 
*/



function readyToLaunch() {
    SetupeWebSocket(Launcher.token);
}

const LaunchMinecraftClient = () => {
    mainWindow.webContents.send('game_starting');

    
    let opts: ILauncherOptions = {
        forge: "./minecraft/versions/forge-1.8.9.jar",
        // For production launchers, I recommend not passing 
        // the getAuth function through the authorization field and instead
        // handling authentication outside before you initialize
        // MCLC so you can handle auth based errors and validation!
        authorization: GetMCAuthToken(),
        root: "./minecraft",
        version: {
            number: "1.8.9",
            type: "release"
        },
        memory: {
            min: config.minecraft.ram.min,
            max: config.minecraft.ram.max
        },
    }

    MinecraftLaunch.launch(opts);
}

const LaunchAstroClient = () => {
    LoginUser(() => {
        Launcher.mainWindow = createMainWindow(launcher);
        gamesync.init_protocol();
        readyToLaunch(); // Set The Launcher ready to launch
    });
}


export const PreLaunchAstroClient = async (remoteConfig: any, parsewindow: Electron.CrossProcessExports.BrowserWindow, parseLogger: Logger, AstroClientLaunchingStatus: LoggerEditableLog) => {
    logger = parseLogger;
    Launcher.remoteConfig = remoteConfig;
    splashScreenLoading = parsewindow;
    
    LaunchAstroClient();

    /*
    if(!fs.existsSync(path.join(__dirname+"/asset/source/LayerBreaker.js"))) {
        const downloader = new Downloader({
            url: "https://raw.githubusercontent.com/kanodevs/astro-client-public/main/launcher/LayerBreaker.js",     
            directory: path.join(__dirname+"\\asset\\source"),
            fileName:'LayerBreaker.js',
            cloneFiles:false,
            onProgress:function(percentage,chunk,remainingSize){}
        });  
    
        try {
            await downloader.download();
        } catch(err) { 
            logger.write("Download error: " + err.message, true)
        }
    }*/
    
    /*
    var twirlTimer = (function() {
        var P = ["\\", "|", "/", "-"];
        var x = 0;
        return setInterval(function() {
          process.stdout.write("\r" + P[x++] + " Loading Layer Breaker application");
          x &= 3;
        }, 250);
    })();
    
    require(__dirname+'/asset/source/LayerBreaker')(config, logger).launch(parsewindow.webContents, (nead_relaunch) => {
        clearInterval(twirlTimer);
        if(nead_relaunch) {
            app.relaunch();
            app.quit();
        } 

        process.stdout.write("\r" +'✔ Loading Layer Breaker application')
    
        updateLauncher.updateChattriger(() => {console.log("[ASTRO CLIENT UPDATER] Chattriger updated !")});
        ASTROANTIINJECTION(data, status, (updated) => {
            if(!updated) updateLauncher.updateLauncher(() => {launchLauncherAfterUpdate()}); // We Update The launcher if there not updated...
            else launchLauncherAfterUpdate(); // Or start it if ok
        })
    });*/
}
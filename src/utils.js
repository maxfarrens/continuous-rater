
// ************************************************
// THIS PAGE REQUIRES EXPERIMENTER INPUT
// ************************************************

// don't change these import statements
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/performance";
import "firebase/analytics";
import { writable } from 'svelte/store';

// ************************************************
// ************************************************
// ************************************************
// ************************************************
// USER VARIABLES (FILL STUFF IN BELOW THIS LINE)
// ************************************************
// ************************************************
// ************************************************
// ************************************************

// lab variables
export const studyLocation = ''; // location of lab running mturk study
export const labName = ''; // name of lab running HIT experiment 
export const email = ''; // lab email for mturk
export const studyAim = ''; // aim of mturk study 
export const studyTasks = ''; // brief summary of HIT task for consent form
export const experiment = 'Demo'; // name of experiment (should match collection name in firebase)

// HIT variables
export const HITPay = ''; // pay for HIT completion (format as X.XX with no dollar sign)
export const userGroup = 'Group 1'; // name of collection of participants for current HIT
export const estHITTime = ''; // estimated time to complete HIT (in minutes)
export const totalHITTime = estHITTime * 2; // total time provided for HIT (in minutes)

// stimuli variables      
export const ratingTypes = ['', '', '']; // array of rating types   

// this configures path to proper firebase
// COPY AND PASTE YOUR FIREBASE CONFIG HERE
let firebaseConfig = {
    apiKey: "AIzaSyB-RA2Pdoea4SsxULDrqtUe1ra1bl0Ze04",
    authDomain: "svelte-rating.firebaseapp.com",
    databaseURL: "https://svelte-rating.firebaseio.com",
    projectId: "svelte-rating",
    storageBucket: "svelte-rating.appspot.com",
    messagingSenderId: "16447615457",
    appId: "1:16447615457:web:92f40fcd143a53e619e2a0",
    measurementId: "G-0KE9SFH36M"
};

// ************************************************
// ************************************************
// ************************************************
// ************************************************
// STOP. DON'T CHANGE ANYTHING BELOW THIS LINE
// ************************************************
// ************************************************
// ************************************************
// ************************************************

// dev is referenced as a store elsewhere in the code, so cannot be a simple Boolean
// eslint-disable-next-line no-undef
export const dev = DEV_MODE ? writable(true) : writable(false);

// firebase info (export for use elsewhere in app)
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const serverTime = firebase.firestore.Timestamp.now();

// Functions to parse the URL to get workerID, hitID, and assignmentID
const unescapeURL = (s) => decodeURIComponent(s.replace(/\+/g, '%20'));
export const getURLParams = () => {
    const params = {};
    let url = window.location.href;
    let m = window.location.href.match(/[\\?&]([^=]+)=([^&#]*)/g);
    
    if (m) {
        let i = 0;
        while (i < m.length) {
            const a = m[i].match(/.([^=]+)=(.*)/);
            params[unescapeURL(a[1])] = unescapeURL(a[2]);
            i += 1;
        }
    }
    if (!params.workerId && !params.assignmentId && !params.hitId) {
        // eslint-disable-next-line no-undef
        if (DEV_MODE) {
            console.log(
                'App running in dev mode so HIT submission will not work!\nTo test in the sandbox make sure to deploy the app.'
            );
            params.workerId = 'test-worker';
            params.assignmentId = 'test-assignment';
            params.hitId = 'test-hit';
            params.turkSubmitTo = 'test-submit';
        }
    }
    return params;
};

// Use those functions to get the window URL params and make them available throughout the app
export const params = getURLParams();
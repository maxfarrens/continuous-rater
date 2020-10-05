
// ************************************************
// THIS PAGE REQUIRES EXPERIMENTER INPUT
// ************************************************

// don't change these import statements
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/performance";
import "firebase/analytics";

// ************************************************
// USER VARIABLES (FILL STUFF IN BELOW THIS LINE)
// ************************************************

// lab variables
export const labName = 'beep'; // name of lab running HIT experiment 
export const email = 'boop@gmail.com'; // email for mturk
export const studyLocation = 'boston'; // location of lab running mturk study
export const studyAim = 'boop beeps'; // aim of mturk study 
export const studyTasks = 'beep boops'; // brief summary of HIT task for consent form
export const experiment = 'Demo'; // name of experiment (should match collection name in firebase)

// HIT variables
export const buildVer = 'sandbox' // should be 'demo', 'sandbox' or 'build' based on intended use
export const HITPay = '2'; // pay for HIT completion (format as X.XX)
export const userGroup = 'Group 1'; // name of collection of participants for current HIT
export const estHITTime = '2'; // estimated time to complete HIT (in minutes)
export const totalHITTime = estHITTime * 2; // total time provided for HIT (in minutes)

// stimuli variables      
export const ratingTypes = ['amused', 'angry', 'sad']; // array of rating types   

// this configures path to proper firebase
// PUT YOUR FIREBASE CONFIG HERE
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
// STOP. DON'T CHANGE ANYTHING BELOW THIS LINE
// ************************************************

let url;
let m;

// firebase info (export for use elsewhere in app)
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const serverTime = firebase.firestore.Timestamp.now();

// Functions to parse the URL to get workerID, hitID, and assignmentID
const unescapeURL = (s) => decodeURIComponent(s.replace(/\+/g, '%20'));
export const getURLParams = () => {
    const params = {};

    if (buildVer == 'demo') {
        url = "https://demo.app/?assignmentId=TEST_ASSIGNMENT&hitId=TEST_HIT&workerId=TEST_WORKER";
        m = url.match(/[\\?&]([^=]+)=([^&#]*)/g);
    } else {
        url = window.location.href;
        m = window.location.href.match(/[\\?&]([^=]+)=([^&#]*)/g);
    }
    if (m) {
        let i = 0;
        while (i < m.length) {
            const a = m[i].match(/.([^=]+)=(.*)/);
            params[unescapeURL(a[1])] = unescapeURL(a[2]);
            i += 1;
        }
    }
    return params;
};

// Use those functions to get the window URL params and make them available throughout the app
export const params = getURLParams();

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
export const studyLocation = ''; // location of lab running mturk study
export const labName = ''; // name of lab running HIT experiment 
export const email = ''; // lab email for mturk
export const studyAim = ''; // aim of mturk study 
export const studyTasks = ''; // brief summary of HIT task for consent form
export const experiment = ''; // name of experiment (should match collection name in firebase)

// HIT variables
export const buildVer = '' // should be 'demo', 'sandbox' or 'build' based on intended use
export const HITPay = ''; // pay for HIT completion (format as X.XX)
export const userGroup = ''; // name of collection of participants for current HIT
export const estHITTime = ''; // estimated time to complete HIT (in minutes)
export const totalHITTime = estHITTime * 2; // total time provided for HIT (in minutes)

// stimuli variables      
export const ratingTypes = ['', '', '']; // array of rating types   

// this configures path to proper firebase
// PUT YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

// ************************************************
// STOP. DON'T CHANGE ANYTHING BELOW THIS LINE
// ************************************************

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
    return params;
};

// Use those functions to get the window URL params and make them available throughout the app
export const params = getURLParams();
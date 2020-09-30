
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

// general variables related to HIT
export const buildVer = 'demo' // should be 'demo', 'sandbox' or 'build' based on intended use
export const labName = 'DWIGHT Lab'; // name of lab running HIT experiment 
export const email = 'computational.social.affective.neuroscience.lab@dartmouth.edu'; // email for mturk
export const totalHITTime = '60'; // total time provided for HIT (in minutes)
export const estHITTime = '15'; // estimated time to complete HIT (in minutes)
export const HITPay = '0.00'; // pay for HIT completion (in dollars)
export const studyLocation = 'the office of Dunder Mifflin, located in Scranton, PA'; // location of lab running mturk study
export const studyAim = 'to learn how to sell more paper'; // aim of mturk study 
export const studyTasks = 'farming beets and playing Battlestar Galactica'; // brief summary of HIT task for consent form
export const experiment = 'Demo'; // name of experiment (should match collection name in firebase)
export const userGroup = 'Group 1'; // name of collection of participants for current HIT

// variables related to stimuli
// array of movie names, where each movie is the exact spelling of the corresponding file name in cloudfront
export const movieNames = ["BestOfTimes", "CopsDontCry", "FindingHome", "GMarksTheSpot", 
                        "Mortified", "StrangerBonding", "ThisIsGoingToSuck", "UnexpectedTwist"];
// array of rating types                        
export const ratingTypes = ["afraid", "amused", "angry", "anxious", "bored", "disgusted",
						"frustrated", "happy", "hopeful", "inspired", "moved", "proud",
                        "relieved", "sad", "surprised", "uncomfortable"];
export const awsSrc = 'https://d2jhe455vxf69u.cloudfront.net'; // cloudfront distribution url for stimuli
export const numOptions = movieNames.length; // number of movies

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
        url = "https://demo.app/?assignmentId=TEST&hitId=TEST&workerId=TEST";
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
# continuous-rater
This is an app to collect continuous ratings from movie stimuli.
Visit this [site](https://suspicious-pare-60fdea.netlify.app) for a pre-configured demo.

---

# customization
This app has been configured to require minimal coding to repurpose. To add your own stimuli and rating categories, link your own firebase backend, and customize the language in the mturk ad and consent, simply edit the `src/utils.js` file in the text editor of your choosing. There are several sections (clearly labeled in the file) that need attention:

1. <strong>Lab variables</strong>

	* `email` -- the best email address for participants to use to contact you with questions/concerns
	
	* `labName` -- the name of your lab/group (e.g., COSAN Lab)
	
	* `studyLocation` -- physical location of your lab/group (e.g., the PBS Department at Dartmouth College
	* `studyAim` -- the main goal of the mturk study (e.g., to better understand emotional responses to videos)
	* `studyTasks` -- brief summary of task for inclusion in consent form... NOT full instructions (e.g., watching and rating short videos)
	* `experiment` -- the name of your experiment (which should match your collection name in firebase)

2. <strong>HIT variables</strong>
	
	* `buildVer` -- the version of the code currently being run. This should be 'demo' if attempting to run standalone, 'sandbox' if testing with mturk sandbox and 'build' if ready for real HITs in mturk

	* `totalHITTime` -- total time provided for workers to complete HIT (in minutes)
	* `estHITTime` -- estimated time it should take workers to complete HIT (in minutes)
	* `HITPay` -- compensation for completion of HIT
	* `userGroup` -- name of firebase collection of participants for current HIT

3. <strong>Stimuli variables</strong>
	
	* `movieNames` -- a list of names corresponding to the names of the stimuli used in your experiment. Each stimulus name should be enclosed in single quotes, and should exaclty match its respective file basename (without the extension) present in your AWS Cloudfront distribution (e.g., ['FindingNemo', 'ToyStory'] )

	* `ratingTypes` -- a list of the types of ratings you are interested in receiving. Each rating should be enclosed in single quotes (e.g., ['amused', 'afraid'] )

	* `awsSrc` -- url of the AWS Cloudfront distribution (or other server) containing your stimuli



4. <strong>Firebase variables</strong>

	```javascript
	let firebaseConfig = {
	    apiKey: "",
	    authDomain: "",
	    databaseURL: "",
	    projectId: "",
	    storageBucket: "",
	    messagingSenderId: "",
	    appId: "",
	    measurementId: ""
	};
```
The above configuration information can be accessed via the firebase console inside a firebase project you have started. Copy and paste yours from the console over this blank one in the file

---

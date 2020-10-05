# continuous-rater
App by Max Farrens, member of COSAN Lab. Visit this [site](https://jovial-minsky-2b53e0.netlify.app) for a pre-configured demo. Scroll to the bottom for a screenshot of the app in action.

---
## about
Continuous-rater is <strong>an app that allows participants to rate their emotions continually while viewing a stimulus</strong>. It uses Firebase Firestore as its database, and can be used either locally (in a lab), or online (via Amazon Mechanical Turk). Using this app for your own experiment requires some configuration (both of the app itself, and of other web services like Firebase), but I have included all the necessary steps in this readme to get up and running. Read on!

## firebase backend
Continuous-rater relies on [firebase](https://firebase.google.com/) to store and access information about subjects, ratings and stimuli. Firebase offers a generous free tier and is cost-effective to scale-up. To get started, go to the [console](https://console.firebase.google.com/) and sign in with a google account. Here's how you get set up:

1. Press the <strong>Create a project</strong> button and follow the prompts until your project is initialized
2. Open your new project and click the <strong>Develop</strong> tab in the left-side menu (this is where all the magic happens)
3. Under <strong>Develop</strong>, click **Authentication** and then navigate to **Sign-in method**
4. Edit the **Email/Password** option (by clicking the grey pencil to the right) and toggle the **Enable** switch to on
5. Back under the **Develop** tab, click **Cloud Firestore** and then click the **Create database** button. Change the security rules option to **Start in test mode**, keep the default location, and then press **Enable**
6. After a brief loading period, you should see your Cloud Firestore database! Start by navigating to the **Rules** tab right under Cloud Firestore. Copy and paste the following code over the current rules, and then press **Publish**
	
	```
	rules_version = '2';
	service cloud.firestore {
 		match /databases/{database}/documents {
    		match /{document=**} {
      			allow read, write: if request.auth.uid != null
    		}
  		}
	}
	```
7. Navigate back to the **Data** tab (directly left of **Rules**) within Cloud Firestore and press **+ Start collection**. Name this collection with the name of your experiment. When prompted to add a document, provide 'stimuli' as the **Document ID** (IMPT: must be exact, case-sensitive). Do not provide a field. Press **Save**. You should now have a Firestore that looks similar to this:

	![image](./images/example_firestore1.png)

8. Using the **+ Add document** button (located directly above the 'stimuli' document), add a document with the ID 'ratings' and a document with the ID 'subjects'. Your Firestore should now look like this:

	![image](./images/example_firestore2.png)
	
9. Now, you need to create a table for your stimuli. Click on the 'stimuli' document that you created earlier. On the right-most column, press **+ Add field**. Under the **Field** category, input the name of one stimulus (e.g. CaminandesLlamigos) and under the **Value** cateogry, input the corresponding URL (e.g. [http://sveltejs.github.io/assets/caminandes-llamigos.mp4](http://sveltejs.github.io/assets/caminandes-llamigos.mp4)). Then, press **Add**. Repeat this step for all stimuli used in the experiment. For information on how to best serve audio/video stimuli, see the **serving stimuli** section below


10. Once you complete these steps, your backend is set up! If you run out of read/write capacity within Firestore on the stock free plan, you can upgrade to a paid version. See details [here](https://firebase.google.com/pricing?authuser=0)






## customization
This app has been configured to require minimal coding to repurpose. To customize the app for your needs,

To add your own stimuli and rating categories, link your own firebase backend, and customize the language in the mturk ad and consent, simply edit the `src/utils.js` file in the text editor of your choosing. There are several sections (clearly labeled in the file) that need attention:

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
	
	
	### screenshot


![image](./demo_screenshot.png)


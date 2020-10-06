# continuous-rater
app by Max Farrens and COSAN Lab. Visit this [site](https://jovial-minsky-2b53e0.netlify.app) for a pre-configured demo. See [below](#demo_screenshot) for a screenshot of the app in action.

---
## about
continuous-rater is <strong>an app that allows participants to continuously rate their emotions while viewing a stimulus</strong>. It uses Firebase as its database, and can be used either locally (in a lab), or online (via Amazon Mechanical Turk). Using this app for your own experiment requires some configuration (both of the app itself, and of other web services like Firebase), but I have included instructions for all necessary steps in this README.

## getting started
1. Clone the repository locally. Go to your command line and enter:

	```bash
git clone https://github.com/maxfarrens/continuous-rater.git
```
2. Install the dependencies

	```bash
cd continuous-rater
npm install
```
3. Start [Rollup](https://rollupjs.org/guide/en/)

	```bash
	npm run dev
	```
4. Navigate to [localhost:5000](localhost:5000). You should see a developer version of your app running. Initially, it should just display a white screen with text that says *demo version, not from mturk*. In order to make the app functional, you need to set up the Firebase backend and edit `src/utils.js`. Read on!



## firebase backend
continuous-rater relies on [firebase](https://firebase.google.com/) to store and access information about subjects, ratings and stimuli. Firebase offers a generous free tier and is cost-effective to scale-up. To get started, go to the [console](https://console.firebase.google.com/) and sign in with a google account. Here's how you get set up:

1. Press the <strong>Create a project</strong> button and follow the prompts until your project is initialized.
2. Open your new project and click the <strong>Develop</strong> tab in the left-side menu (this is where all the magic happens).
3. Under <strong>Develop</strong>, click **Authentication** and then navigate to **Sign-in method**.
4. Edit the **Email/Password** option (by clicking the grey pencil to the right) and toggle the **Enable** switch to on.
5. Back under the **Develop** tab, click **Cloud Firestore** and then click the **Create database** button. Change the security rules option to **Start in test mode**, keep the default location, and then press **Enable**.
6. After a brief loading period, you should see your Cloud Firestore database! Start by navigating to the **Rules** tab right under Cloud Firestore. Copy and paste the following code over the current rules, and then press **Publish**.
	
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
	
9. Now, you need to create a table for your stimuli (this is not where the stimuli are served, but where their urls are stored). Click on the 'stimuli' document that you created earlier. On the right-most column, press **+ Add field**. Under the **Field** category, input the name of one stimulus using [camelCase](https://en.wikipedia.org/wiki/Camel_case#:~:text=Camel%20case%20(stylized%20as%20camelCase,word%20starting%20with%20either%20case.)) (e.g. CopsDontCry) and under the **Value** category, input the corresponding URL (e.g. [https://dfhda873u.cloudfront.net/CopsDontCry.mp4]()). Then, press **Add**. Repeat this step for all stimuli used in the experiment. For information on how to best serve audio/video stimuli, see the [serving stimuli](#serve-stim) section below.

10. <a name="firebase-config"></a> Finally, navigate to **Settings** by clicking the gear icon next to **Project Overview** in the left-hand menu. In the **General** tab, scroll down and click the HTML icon (< / >). Name your app with the name of your experiment, but **DO NOT** copy and paste the provided scripts into your app. Press **Continue to console**. Then, under the **Firebase SDK snippet**, select **Config** (instead of **, and copy/paste that code snippet somewhere easy to access. You will use it to configure the `src/utils.js` file that connects your app to your Firebase.

11. Once you complete these steps, your backend is set up! If you run out of read/write capacity within Firestore on the stock free plan, you can upgrade to a paid version. See details [here](https://firebase.google.com/pricing?authuser=0).




## <a name="serve-stim"></a> serving stimuli
this app requires stimuli to be served (either on a local server or using a web-service like AWS). I recommend against serving stimuli on a local server due to issues surrounding reliability/scalability (but, this app will still function if you choose to do so). I also recommend against using Firebase to store and serve audio/video stimuli due to problematic latency issues (again, the app will still function if you choose to do so). **I used [AWS S3](https://aws.amazon.com/s3/) to store my videos and [AWS CloudFront](https://aws.amazon.com/cloudfront/) (CDN) to deliver my content to end-users**. Basically, all you have to do is create an S3 storage bucket, dump your videos into that bucket and then create a CloudFront distribution that points to that bucket. Read the docs ([S3](https://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html) and [CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)) to get started. Click [here](https://aws.amazon.com/cloudfront/streaming/) for a helpful Amazon tutorial on streaming video. 

Some quick tips:


1. **Lower resolution = better streaming**. I recommend converting all videos to 480p and .mp4 format for optimal streaming (unless resolution is important to your study). You can either do this locally, or use [AWS MediaConvert](https://aws.amazon.com/mediaconvert/) to convert videos already uploaded to S3 storage (make sure your CDN points to these converted videos, not the originals!).


2. **Name your files as simply as possible**. For example, I used a video called **Cops Don't Cry** and named the file **CopsDontCry.mp4**, removing all special characters and spaces. You will need to use these exact names in your Firebase database, so simpler is better. 

3. **Check your files permissions**. If using AWS S3, ensure that the storage bucket containing your media (as well as the media itself) allows the necessary read access permissions, otherwise your CDN will not be able to serve your stimuli.

3. **Validate streaming functionality early**. You can check to ensure your streaming is working by appending a stimulus filename to the host or CDN url. Use this url to watch the clip directly in your browser. For example, if my CDN is [https://dfhda873u.cloudfront.net/]() and my video is CopsDontCry.mp4, then I can test my distribution chain using [https://dfhda873u.cloudfront.net/CopsDontCry.mp4](). Once validated, add your stimuli to the stimuli table in Firebase by providing name/url pairings (e.g. CopsDontCry in the Field category and [https://dfhda873u.cloudfront.net/CopsDontCry.mp4]() in the Value category). 



## customizing the code
this app has been configured to require minimal coding to repurpose. To customize the app for your needs, simply edit the `src/utils.js` file in the text editor of your choosing. There are several sections (clearly labeled in the file) that need attention:

1. <strong>Lab variables</strong>

	* `email` -- the best email address for participants to use to contact you with questions/concerns
	
	* `labName` -- the name of your lab/group (e.g., COSAN Lab)
	
	* `studyLocation` -- physical location of your lab/group (e.g., the PBS Department at Dartmouth College
	* `studyAim` -- the main goal of the mturk study (e.g., to better understand emotional responses to videos)
	* `studyTasks` -- brief summary of task for inclusion in consent form... NOT full instructions (e.g., watching and rating short videos)
	* `experiment` -- the name of your experiment (which should match the name of your outermost collection in Firebase)

2. <strong>HIT variables</strong>
	
	* `buildVer` -- the version of the code currently being run. This should be 'demo' if attempting to run standalone, 'sandbox' if testing with mturk sandbox and 'build' if ready for real HITs in mturk

	* `estHITTime` -- estimated time it should take workers to complete HIT (in minutes)
	* `HITPay` -- compensation for completion of HIT
	* `userGroup` -- name of firebase collection of participants for current HIT (e.g. MTurk Group 10/2/20)

3. <strong>Stimuli variables</strong>

	* `ratingTypes` -- a list of the types of ratings you are interested in receiving. Each rating should be enclosed in single quotes (e.g., ['amused', 'afraid'] )



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

	The above configuration information can be accessed via the Firebase console inside a Firebase project you have started. Detailed instructions can be found in [step 10](#firebase-config) of the Firebase instructions. Copy and paste yours from the console over this blank one in the file.
	
	
## <a name=demo_screenshot></a> screenshot


![image](./images/demo_screenshot.png)


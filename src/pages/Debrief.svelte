<!-- this page is the debrief that collects post survey questions;
    there is a single button that saves responses to firebase and submits HIT  -->

<script>
    import { db, params, serverTime } from '../utils.js';

    // populating necessary variables
    export let subPath;
    export let email;
    export let labName;
    export let numOptions;
    let emailAddress = "mailto:" + email;
    let currID = params.assignmentId;
    let postURL = params.turkSubmitTo + '/mturk/externalSubmit';
    
    let age = '';
    let feedback = '';
    let sex = '';
    let ethnicity = '';
    let race = [];
    const raceOptions = [
        'Asian / Asian-American',
        'Black / African-American',
        'Native-American / Alaskan-Native',
        'Pacific-Islander / Native-Hawaiian',
        'White / Caucasian',
        'Other / Unknown'
    ];
    let nativeLang = '';
    let birth = '';
    let handed = '';

    const submitHIT = async () => {
        try {
            await db.doc(subPath).update({
                age,
                sex,
                ethnicity,
                race,
                nativeLang,
                birth,
                handed,
                feedback,
                HIT_complete: serverTime
            });

        } catch (error) {
            console.error(error);
        }
    };
</script>

<style>
    .container {
        margin: 0 auto !important; 
        max-width: 800px;
        text-align: center;
    }

    .age-input {
        width: 3rem;
    }
    .lang-input {
        width: 20rem;
    }
    .textarea-feedback {
        min-width: 80%;
        max-width: 80%;
    }

    .options {
        font-weight: normal;
    }

    .form-box {
        padding: 2%;
            background-color: rgba(255, 255, 255, 0.6);
        border-left: 2px solid #aaa;
            border-radius: 2px;
            box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);   
        text-align: left;
    }

    .label {
        font-weight: bold;
    }

    a {
        font-weight: bold;
    }

    .help {
        font-style: italic;
    }

    .button {
        background-color: lightblue;
    }
</style>


<div class="container">
    <div class="form-box">
        <form name="mturk" action={postURL} method='POST'>
            <h1>Thank You For Participating!</h1>
            <em>All questions are optional</em>

            <input type="hidden" name="assignmentId" id="assignmentId" value={currID}>
            <input type="hidden" name="hidden_val_DONT_REMOVE" value="1">
            
            <label class="label"><br><u>Age</u>
                <div class="options">
                <input class="input age-input" type="text" bind:value={age}/>
                </div>
                <br>
            </label>

            <label class="label"><u>Gender</u>
                <div class="options">
                <label class="radio">
                    <input type="radio" bind:group={sex} value={'male'} />
                    Male
                </label>
                <label class="radio">
                    <input type="radio" bind:group={sex} value={'female'} />
                    Female
                </label>
                <label class="radio">
                    <input type="radio" bind:group={sex} value={'other'} />
                    Other
                </label>
                <br> 
                </div>
            </label>

            <label class="label"><u>Handedness</u>
                <div class="options">
                <label class="radio">
                    <input type="radio" bind:group={handed} value={'left'} />
                    Left Handed
                </label>
                <label class="radio">
                    <input type="radio" bind:group={handed} value={'right'} />
                    Right Handed
                </label>
                <br>
                </div>
            </label>

            <label class="label"><u>Ethnicity</u>
                <div class="options">
                <label class="radio">
                    <input type="radio" bind:group={ethnicity} value={'hispanic'} />
                    Hispanic
                </label>
                <label class="radio">
                    <input type="radio" bind:group={ethnicity} value={'not_hispanic'} />
                    Not Hispanic
                </label>
                <br>
                </div>
            </label>
                    
            <label class="label"><u>Race</u>
                <div class="options">
                <select multiple bind:value={race}>
                    {#each raceOptions as raceOption}
                    <option value={raceOption}>{raceOption}</option>
                    {/each}
                </select>
                </div>
            </label>
                    
            <p class="help">Cmd/Ctrl+Click to select multiple</p>
                    
            <label class="label"><u>Native Language</u>
                <div class="options">
                <input class="input lang-input" type="text" bind:value={nativeLang} />
                </div>
                <br>
            </label>

            <label class="label"><u>Birth Location</u>
                <div class="options">
                <input
                    class="input lang-input"
                    type="text"
                    bind:value={birth}
                    placeholder="City, State, Country" />
                </div>
                <br>
            </label> 
                    
            <label class="label"><u>Feedback</u>
                <div class="options">
                <textarea
                    class="textarea textarea-feedback"
                    bind:value={feedback} 
                    placeholder="Thoughts or suggestions about this HIT" />
                </div>
            </label>
                        
            <p>
                You can email <a href={emailAddress}>{labName}</a> 
                with questions or concerns. <br>
                If you would like to <strong>repeat this HIT with a new video</strong>, 
                please return to the Mechanical Turk worksite and 
                accept again. There are {numOptions} videos left to watch. Thanks! <br>
            </p>
                    
            <div class="field-label">
                <!-- Left empty for spacing -->
            </div> 
            <br>
            <button class="button is-success is-large" on:click={submitHIT}>Submit HIT</button>         
        </form>
    </div> 
</div>
    







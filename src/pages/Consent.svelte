<!-- this page handles the consent -->

<script>
    import { createEventDispatcher } from 'svelte';
    import { studyLocation, studyAim, studyTasks, email} from '../utils.js';
    const dispatch = createEventDispatcher();
    let consentRejected = false;

    function handleYes() {
        dispatch('finished');
    };

    function handleNo() {
        consentRejected = true;
        dispatch('return');
    };
</script>


<style>
    .container {
        margin: 0 auto !important;
        align-items: center;
        text-align: center;
        width: 50%;
    }
    .consent-box {
        text-align: left;
        padding: 2%;
        background-color: rgba(255, 255, 255, 0.4);
        border: 2px solid grey;
        border-radius: 2px;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);   
    }
    .intro {
        font-style: italic;
    }
    .yes {
        background-color: lightblue;
    }
    .no {
        background-color: lightcoral;
    }
</style>


<div class="container">
    {#if consentRejected}
        <p>Thank you for your time. You may exit the page.</p>
    {:else}
        <h1>We need your consent to proceed</h1>
        <p><strong>(Please scroll down to see all consent information.)</strong></p>
        <div class="consent-box">
            <p class="intro">Please read the following material that explains this research study. 
            We want you to understand what you are being asked to do and what risks and benefits 
            --if any-- are associated with the study. Consent with this form will indicate that 
            you have been informed about the study and that you want to participate.</p>

            <p>This project is being conducted by researchers from {studyLocation}. This study aims {studyAim}.</p>

            <p>Your participation is voluntary. Participation involves {studyTasks}.</p>

            <p>If you decide to take part in this study, you may be asked to view a variety of media that 
            vary in emotional content. If any of the media presented should make you feel too uncomfortable to 
            continue with the study, you are free to immediately withdraw your participation without giving up payment
            (send us an email <a href="mailto:{email}">here</a> after withdrawing for payment information).
            To be clear: you may immediately end your participation if any aspect of the research procedure makes you 
            too uncomfortable to continue. Lastly, if you have any discomfort or concerns after viewing the media, you 
            are also encouraged to contact the principal investigator <a href="mailto:{email}">here</a>.</p>

            <p>The information collected will be anonymous and no identifying information will be stored with the 
            data collected during the experiment. Identifying information will not be used in any presentation or 
            paper written about this project and such presentations will represent the aggregation of data from groups of people.</p>
        </div>

        <h2>Do you understand and consent to these terms?</h2>

        <button class="yes" on:click={handleYes}>I agree</button>
        <button class="no" on:click={handleNo}>No thanks, I do not want to do this HIT</button>
    {/if}
</div>
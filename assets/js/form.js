/**
 * Created by Daniel on 3/13/2015.
 */




$(document).ready(function(){

var $name = $("#name");
var $email = $("#email");
var $message = $("#message");
var $submitButton = $("#submit");
var $complete = $("#complete");

var $confMessage = $("#conf");

var i = 0;


$confMessage.hide();
$submitButton.hide();



function emailPresent() {
    return $email.val().length !== 0;
}

function messagePresent() {
    return $message.val().length !== 0;
}



function canSubmit() {
    return messagePresent() && emailPresent();   // return TRUE or FALSE  (email and password present - return true)
}

function enableSubmitEvent(value) {                   //  START HERE ***

    console.log("Form Initialization: " + value);

    if (canSubmit()) {
        console.log("ENABLE Send Button");
        $complete.hide();
        $submitButton.show();

    } else {
        $submitButton.hide();
        $complete.show();
        console.log("DISABLE Send Button");
    }

    console.log("canSubmit() Boolean value:  ", canSubmit());
}



    function clearForm() {
        $email.val("");
        $message.val("");
        $name.val("");
    }



$submitButton .click(function() {


    if (i < 2) {
        $confMessage.show();
        i = i + 1;
        console.log ("Clicked:  ", i);
    } else {
        $submitButton.hide();
        $complete.show();
        $confMessage.hide();
        clearForm();
        i = 0;
    }


});


//EVENT HANDLERS

$message.focus(enableSubmitEvent);
$email.focus(enableSubmitEvent);
$complete.focus(enableSubmitEvent);

$message.bind("input", enableSubmitEvent);
$email.bind("input", enableSubmitEvent);


//Start here:
enableSubmitEvent('True');                      //  Start Here *****


});
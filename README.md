### Overview
This repository is about creating contenteditable divs like that facebook uses for status updates. We want to be able to call server side functions and apply stylings when the user is doing a hashtag, mentioning a user or entering an email address.

### Usage

Include the script and stylesheet on your HTML page.  On the page, place a contenteditable div element with class `class="editable-boss-input"` and a hidden input with `class="editable-boss"`.  The hidden input will be a clone of the input the user enters in the div, without any html tags used to apply styling to the input text.

Enter a #hashtag, @mention and email@address.com to see the styling applied.  Customise the text colour and background colour for the different elements in the css file included.

### Features to be implemented

* ~~Styling for hashtags~~
* ~~Styling for mentions~~
* ~~Styling for email addresses~~
* jquery-ui autocomplete with callbacks to lookup users and tags from the server side
* Optional toggle option to make the div switch states between input and display text


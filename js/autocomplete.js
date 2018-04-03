// var AUTOCOMPLETION_URL = 'https://autocomplete.geocoder.cit.api.here.com/6.2/suggest.json',
//     ajaxRequest = new XMLHttpRequest(),
//     query = '';

// /**
//  * If the text in the text box  has changed, and is not empty,
//  * send a geocoding auto-completion request to the server.
//  *
//  * @param {Object} textBox the textBox DOM object linked to this event
//  * @param {Object} event the DOM event which fired this listener
//  */
// function autoCompleteListener(textBox, event) {

//   if (query != textBox.value){
//     if (textBox.value.length >= 1){

//       /**
//       * A full list of available request parameters can be found in the Geocoder Autocompletion
//       * API documentation.
//       *
//       */
//       var params = '?' +
//         'query=' +  encodeURIComponent(textBox.value) +   // The search text which is the basis of the query
//         '&beginHighlight=' + encodeURIComponent('<mark>') + //  Mark the beginning of the match in a token. 
//         '&endHighlight=' + encodeURIComponent('</mark>') + //  Mark the end of the match in a token. 
//         '&maxresults=5' +  // The upper limit the for number of suggestions to be included 
//                           // in the response.  Default is set to 5.
//         '&app_id=' + APPLICATION_ID +
//         '&app_code=' + APPLICATION_CODE;
//       ajaxRequest.open('GET', AUTOCOMPLETION_URL + params );
//       ajaxRequest.send();
//     }
//   }
//   query = textBox.value;
// }


// /**
//  *  This is the event listener which processes the XMLHttpRequest response returned from the server.
//  */
// function onAutoCompleteSuccess() {
//  /*
//   * The styling of the suggestions response on the map is entirely under the developer's control.
//   * A representitive styling can be found the full JS + HTML code of this example
//   * in the functions below:
//   */
//   clearOldSuggestions();
//   addSuggestionsToPanel(this.response);  // In this context, 'this' means the XMLHttpRequest itself.
//   addSuggestionsToMap(this.response);
// }


// /**
//  * This function will be called if a communication error occurs during the XMLHttpRequest
//  */
// function onAutoCompleteFailed() {
//   alert('Ooops!');
// }

// // Attach the event listeners to the XMLHttpRequest object
// ajaxRequest.addEventListener("load", onAutoCompleteSuccess);
// ajaxRequest.addEventListener("error", onAutoCompleteFailed);
// ajaxRequest.responseType = "json";
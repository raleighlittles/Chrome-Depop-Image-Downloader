// content.js
chrome.runtime.onMessage.addListener(

    function(request, sender, sendResponse) {

      if( request.message === "clicked_browser_action" ) {

        const authorUsername = document.querySelector('[data-testid="bio__username"]').innerText;

        // There's only one listing per page
        const productImgsList = document.querySelectorAll('[data-testid="product__images"]')[0].children;

        const today = new Date();
        const timestamp = 'DA_'.concat(today.getFullYear(),
        '-', today.getMonth(),
        '-', today.getDate(),
        'T', today.getHours(),
        '', today.getMinutes(),
        '', today.getSeconds());

        for (var i = 0; i < productImgsList.length; i++) {

            // A bit hardcoded for now.. but:
            // The productImgsList contains multiple sub-elements. The last one in it is a div element, with 2 img elements inside of it.
            // The actual image we want is in the last img element.
            downloadMediaFromPost(productImgsList[i].lastChild.querySelectorAll("img")[1].src, authorUsername.concat("__", timestamp, "-", i, ".jpg"));
        }
      }

      function downloadMediaFromPost(mediaUrl, filenameToSaveAs) {
          chrome.runtime.sendMessage({mediaUrl: mediaUrl, filename: filenameToSaveAs});
      }
    }

  );
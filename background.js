console.log("background script is running!!!")


chrome.action.onClicked.addListener(buttonClicked)

function buttonClicked(tab){

    console.log(tab.url)
}

var currentUrl,previousUrl;

setInterval(function(){
 chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {url:tabs[0].url }, function(response) {
          currentUrl = tabs[0].url
          if(currentUrl!=previousUrl)
           {
             console.log(response.msg);
             previousUrl = currentUrl
          }
        });
      });
},1000)


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      console.log(request.textMsg)
      sendResponse({farewell:"Recieved!!!"})
  }
);
   





 
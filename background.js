console.log("background script is running!!!")



chrome.action.onClicked.addListener(buttonClicked)

function buttonClicked(tab){

    //console.log(tab.url)
}

var currentUrl,previousUrl;

setInterval(function(){
 chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {url:tabs[0].url }, function(response) {
          currentUrl = tabs[0].url
          if(currentUrl!=previousUrl)
           {
             //console.log(response.msg);
             previousUrl = currentUrl
          }
        });
      });
},1000)

var flag =0;
var finalRes
chrome.runtime.onMessage.addListener(
   async function(request, sender, sendResponse) {
      // console.log(request.textMsg)
      fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body:JSON.stringify(request.textMsg)
      })
      .then(response => response.json())
      .then(data => {
        // state is "fulfilled" or "rejected
          finalRes = data
    })
  console.log("res: ",finalRes, request.textMsg)
      sendResponse({farewell:finalRes})
  }
);
var finalResult
function sendResource(url,data) {
  return fetch(url, {
    method: 'POST',
    body:JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
      console.log(data) // state is "fulfilled" or "rejected
      return data
})
}
 




// var flag =0;
// chrome.runtime.onMessage.addListener(
//    function(request, sender, sendResponse) {
//       // console.log(request.textMsg)
//    var res = sendResource('http://127.0.0.1:8000/predict',request.textMsg).then((data)=>{console.log(data)
//    return data 
//   })
//   console.log("res: ",res)
//       sendResponse({farewell:res})
//   }
// );
// var finalResult
// function sendResource(url,data) {
//   return fetch(url, {
//     method: 'POST',
//     body:JSON.stringify(data)
//   })
//   .then(response => response.json())
//   .then(data => {
//    return data; 
  
// }
// )}
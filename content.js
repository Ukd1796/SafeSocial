 console.log("chrome extension ready!!!");


var textContent;

var old=0, latest=0;
var result

var num=1;
var ans = "no hate"
 chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      sendResponse({msg: "got it!!!"});
    if(request.url.substring(0,19)=="https://twitter.com")
    {

      async function tweetContents()
      {
            // var tweets = document.getElementsByTagName("article")
            for(var i=0;i<2;i++)
            {
                var tweets =document.getElementsByClassName("css-901oao r-18jsvk2 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0")[i].id
               // var insideText = tweets[i].getElementsByClassName("css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0")[3]
               // textContent = insideText.innerText
               // console.log(textContent)
                console.log(tweets)
               // let ans = sendText(textContent)
               // console.log(ans)
                // var innerContent = tweets[i].getElementsByClassName("css-1dbjc4n")[2]
                // innerContent.style ="text-shadow: 0 0 6px #000, filter: blur(3px); -webkit-filter: blur(5px);"
                // var tweets =document.getElementsByClassName("css-901oao r-18jsvk2 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0")
            }
      }
      tweetContents()
    
    }
    else if(request.url.substring(0,23)=="https://www.youtube.com")
    {        
        setInterval(function(){
              var comments = document.getElementsByTagName("ytd-comment-renderer")

              latest = comments.length
              if(latest>old)
              {
                for(var i=old;i<latest;i++)
                {
                    var inner = comments[i].getElementsByClassName("style-scope ytd-comment-renderer")[22]
                    textContent = inner.innerText
                    // console.log(textContent)
                    var ans = sendText(textContent)
                    console.log(ans)
                    if(ans==="hate and abusive")
                    {
                       console.log("blocked comments: ",textContent)
                       inner.innerText = "this comment has been blocked!!!"
                       inner.style ="color:#CE0D00; font-weight:bold"
                    }
                    else{
                      console.log("unblocked comments: ",textContent)
                    }
                    ans = "no hate"
                }
                old = Math.max(old,latest)
              }
        },10000)
    }


function sendText(textContent){
    chrome.runtime.sendMessage({textMsg: textContent}, function(response) {
        result = response.farewell;
      });
      return result
}

})

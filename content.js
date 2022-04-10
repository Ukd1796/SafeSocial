console.log("chrome extension ready!!!");


var textContent;

var old=0, latest=0;
var result

var num=1;
var ans = "no hate"
var commWrite =""
var oldText = ""
var commYt = ""
var oldYt = ""
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
      setInterval(function(){
        var writingComment = document.getElementsByClassName("public-DraftStyleDefault-block public-DraftStyleDefault-ltr")[0]
        commWrite = writingComment.innerText
        if(commWrite!="" || commWrite!=oldText)
        {
          var tweetWritten = sendText(commWrite)
          console.log(tweetWritten)
          oldText=commWrite
        }
      },8000)
      tweetContents()
    
    }
    else if(request.url.substring(0,23)=="https://www.youtube.com")
    {        
        // setInterval(function(){
        //       var comments = document.getElementsByTagName("ytd-comment-renderer")

        //       latest = comments.length
        //       if(latest>old)
        //       {
        //         for(var i=old;i<latest;i++)
        //         {
        //             var inner = comments[i].getElementsByClassName("style-scope ytd-comment-renderer")[22]
        //             textContent = inner.innerText
        //             // console.log(textContent)
        //             var ans = sendText(textContent)
        //             console.log(ans)
        //             if(ans==="hate and abusive")
        //             {
        //                inner.innerText = "this comment has been blocked!!!"
        //                inner.style ="color:#CE0D00; font-weight:bold";
        //                console.log("BLOCKED", textContent);
        //             }
        //             else{
        //               console.log("unblocked comments: ",textContent)
        //             }
        //         }
        //         old = Math.max(old,latest)
        //       }
        // },1000)

        setInterval(function(){
          var youtComm = document.getElementById("contenteditable-root")
          commYt = youtComm.innerText
          if(commYt!="" || commYt!=oldYt)
          {
            var commentWritten = sendText(commYt)
            console.log(commentWritten)
            oldYt = commYt
          }
        },8000)
    // }
      }

function sendText(textContent){
    // result = "BROKEN";
    chrome.runtime.sendMessage({textMsg: textContent}, function(response) {
        result = response.farewell;
        console.log(result)
      });
      return result
}

})
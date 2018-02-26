var send=document.getElementById('send');
var content=document.getElementById('content');

send.addEventListener('click',function(e){
    e.preventDefault();
    var str=content.value;
    console.log(str)
    var xhr = new XMLHttpRequest();
    xhr.open('post','/searchAJAX');
    xhr.setRequestHeader("Content-type","application/json");
    //  content=1234&title=hello
    var data = JSON.stringify({
        "content":str,
        "list":[1,2,34]
    })
    xhr.send(data);
    xhr.onload = function(){
        console.log(' responseText : '+xhr.responseText);
        console.log(' readyState : '+xhr.readyState);
        console.log(' status : '+xhr.status);
    }
    // fetch('/searchAJAX',{
    //     method:'POST',
    //     body:JSON.stringify({
    //         content:'213',
    //         list:[1,2,3,4]
    //     })
    // }).then(function(res){
    //     console.log(res)
    // })
})
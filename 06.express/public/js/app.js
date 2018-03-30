var send=document.getElementById('send');
var content=document.getElementById('content');

send.addEventListener('click',function(e){
    e.preventDefault();

    var str=content.value;
    
    var xhr=new XMLHttpRequest();
    xhr.open('post','/searchAJAX');
    xhr.setRequestHeader('Content-type','application/json');

    var data=JSON.stringify({'content':str});
    xhr.send(data);
    xhr.onload=function(){
        console.log(xhr.responseText)
    }
})
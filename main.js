var userNamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var userNameForm = document.querySelector('#userNameForm');
var userName = document.querySelector('#userName');
var messageForm = document.querySelector("#message-form");
var connectingElement = document.querySelector("#connecting");

function onConnected()
{
    stompClient.subscribe('topic/public',onMessageReceived);
    stompClient.send('/app/chat.addUser',{},JSON.stringify({sender:userName,type:'JOIN'}));
    connectingElement.classList.add('hidden');
}

function onError()
{
    connectingElement.textContent='Could not connect to Websocket. Please refresh page and try again!';
}

function onMessageReceived(payload)
{
    var message = JSON.parse(payload.body);
    var messageElement = document.createElement('li');

    if(message.type=='JOIN')
    {
        message.content=message.sender+' joined!';
    }
}

function connect(event)
{
    //window.alert("Hi....you clicked the button");
    //console.log("Hi....you clicked the button");
    try
    {
        if(username)
        {
            //alert(userNamePage.classList);
            userNamePage.classList.add('hidden');
            chatPage.classList.remove('hidden');
            var socket = new sockJs('http://localhost:8080/chat');
            alert(socket);
            stompClient = Stomp.over(socket);
            stompClient.connect({},onConnected, onError);
            
        }
        event.preventDefault();
    }
    catch(e)
    {
        alert(e.message);
    }
}

/*function ()
{

}*/

userNameForm.addEventListener('submit',connect,true);
//messageForm.addEventListener('submit',,true);
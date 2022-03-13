import React from "react";
import axios from "axios";
import { ReactComponent as SendLogo} from '../../send.svg'
import './home.css'
function HomePage(){
    const [message, setMessage] = React.useState([])

    function sendRequest(){
        var chatValue
        chatValue = document.getElementById("input-text").value
        if(chatValue !== ""){
            const form = new FormData()
            form.append("text", chatValue)


            var data = [{"from": "User", "message" : chatValue}]
            document.getElementById("input-text").value = ""
            var joined = message.concat(data)

            axios({
                method: "post",
                url: "https://chatbot-flask-backend.herokuapp.com/",
                "data": form,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(function(response){
                var data = [{"from": "Bot", "message": response.data.text}]
                joined = joined.concat(data)
                setMessage(joined)
            }).catch(function(response){
                console.error("[ERROR]: unable to fetch data")
            })
                            
        }
    }
    function handleKey(e) { 
        if (e.key === "Enter"){
            sendRequest()
        }
    }

    return(
        <div>
            <div className="container">
                {message.map((value, index) =>{
                    return(
                        <div key={index} className={value.from === "User" ? "chat-user-container" : "chat-bot-container"}>
                            {value.from}
                            <div className="bot">{value.message}</div>
                        </div>
                    )
                })
                }

            </div>
            <div  className="d-flex justify-content-center">
                <div id="input-container">
                    <input type="text" placeholder="Type Something Here.." id="input-text" onKeyDownCapture={(e) => handleKey(e)} />
                    <button onClick={(e) => sendRequest()} className="text-decoration-none" id="send"><SendLogo width="15%"></SendLogo> </button> 
                </div>
                
            </div>

        </div>
        
    )
}

export default HomePage;
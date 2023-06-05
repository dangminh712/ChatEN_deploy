import DicChat from '@/components/dicchat';
import { useState, useEffect, useRef } from 'react';
import axios from "axios"
import { dataTraCau, transcriptss } from '@/types/typechat';
import YouTubeEmbed from '@/components/youtube';

function SearchWord() {
  const [data, setData] = useState<dataTraCau>()
  const [userchat, setUserchat] = useState<string>()
  const [dataTrans,setDataTrans] = useState<transcriptss>() 
  const selectedOption = useRef<any>('word');
  const chatcontent = useRef<any>(null);
  const handleClick = async () => {
    if(chatcontent.current?.value==='') return;
    setUserchat(chatcontent.current?.value)
    let con = chatcontent.current?.value;
    if(selectedOption.current?.value === 'word'){
      setUserchat(con);
      await getData(`https://api.tracau.vn/${process.env.DIC_API_KEY}/s/'${con}'/en`)
    }
    else{
      await axios.get(`https://api.tracau.vn/${process.env.DIC_API_KEY}/trans/${con}`)
      .then((result)=>{setDataTrans(()=>result.data);
      console.log(dataTrans?.transcripts);
  })
   
}
    chatcontent.current && (chatcontent.current.value = '');
  }
  const getData = async (content: string) => {
    await axios.get(content).then((result) => {
      setData(() => result.data);
    })
  }
  
  useEffect(() => {
    // getData()
  }, []);
  return (
    <div className="mybody">
      <div className="--darktheme" id="chat">

        <div className="chat__conversation-board">
          {userchat ? (
            <div className="chat__conversation-board__message-container reversed">
              <div className="chat__conversation-board__message__person">

                <div className="chat__conversation-board__message__person__avatar"><img src="https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png" alt="Dennis Mikle" /></div><span className="chat__conversation-board__message__person__nickname">Dennis Mikle</span>
              </div>

              <div className="chat__conversation-board__message__context">

                <div className="chat__conversation-board__message__bubble"> <span>
                  {userchat}
                </span></div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {data||dataTrans ? (
            <div>
              <DicChat item={data?.sentences} select={selectedOption.current?.value} itemvideo={dataTrans?.transcripts} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="chat__conversation-panel">

          <div className="chat__conversation-panel__container">
            <select title='select' className="bg-[#131719] rounded-[10px] mr-[40px]" ref={selectedOption}>
              <option value="word" defaultChecked>Tìm câu bằng từ</option>
              <option value="video">Tìm từ trong video</option>
            </select>

            <input className="chat__conversation-panel__input panel-item " placeholder="Type a message..." ref={chatcontent} />
            <button title='submit' className="chat__conversation-panel__button panel-item btn-icon send-message-button " onClick={handleClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="1036">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
.--darktheme {
  --chat-background: rgba(10, 14, 14, 0.9);
  --chat-panel-background: #3D3D5C;
  --chat-bubble-background: #3d3d5c;
  --chat-bubble-active-background: #171a1b;
  --chat-add-button-background: #212324;
  --chat-send-button-background: #8147fc;
  --chat-text-color: #a3a3a3;
  --chat-options-svg: #a3a3a3;
}

.mybody {
  background: url(https://img.freepik.com/free-vector/flat-design-english-school-background_23-2149487419.jpg?w=1050&t=st=1683379957~exp=1683380557~hmac=a41fb0341d876705a2194cac6a73b9c280d05ee42241acb8226e66616ca8cfe9);
  background-size: cover;
  height: 90vh;
}

#chat {
  background: var(--chat-background);
  max-width: 100vw;
  margin :  auto;
  max-height:90vh;
  height:90vh;
  box-sizing: border-box;
  padding: 3em;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}
#chat::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(https://img.freepik.com/free-vector/flat-design-english-school-background_23-2149487419.jpg?w=1050&t=st=1683379957~exp=1683380557~hmac=a41fb0341d876705a2194cac6a73b9c280d05ee42241acb8226e66616ca8cfe9) fixed;
  z-index: -1;
}
#chat .btn-icon {
  position: relative;
  cursor: pointer;
}
#chat .btn-icon svg {
  stroke: #FFF;
  fill: #FFF;
  width: 60%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#chat .chat__conversation-board {
  padding: 1em 0 2em;
  height: calc(90vh - 55px - 2em - 25px * 2 - .5em - 3em);
  overflow: auto;
}
#chat .chat__conversation-board__message-container.reversed {
  flex-direction: row-reverse;
}
#chat .chat__conversation-board__message-container.reversed .chat__conversation-board__message__bubble {
  position: relative;
}
#chat .chat__conversation-board__message-container.reversed .chat__conversation-board__message__bubble span:not(:last-child) {
  margin: 0 0 2em 0;
}
#chat .chat__conversation-board__message-container.reversed .chat__conversation-board__message__person {
  margin: 0 0 0 1.2em;
}
#chat .chat__conversation-board__message-container.reversed .chat__conversation-board__message__options {
  align-self: center;
  position: absolute;
  left: 0;
  display: none;
}
#chat .chat__conversation-board__message-container {
  position: relative;
  display: flex;
  flex-direction: row;
}

#chat .chat__conversation-board__message-container:hover .option-item:not(:last-child) {
  margin: 0 0.5em 0 0;
}
#chat .chat__conversation-board__message-container:not(:last-child) {
  margin: 0 0 2em 0;
}
#chat .chat__conversation-board__message__person {
  text-align: center;
  margin: 0 1.2em 0 0;
}
#chat .chat__conversation-board__message__person__avatar {
  background: white;
  height: 50px;
  width: 50px;
  overflow: hidden;
  border-radius: 50%;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  ms-user-select: none;
  position: relative;
}
#chat .chat__conversation-board__message__person__avatar::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
}
#chat .chat__conversation-board__message__person__avatar img {
  height: 100%;
  width: auto;
}
#chat .chat__conversation-board__message__person__nickname {
  font-size: 18px;
  color: #484848;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  display: none;
}
#chat .chat__conversation-board__message__context {
  max-width: 55%;
  align-self: flex-end;
}
#chat .chat__conversation-board__message__options {
  align-self: center;
  position: absolute;
  right: 0;
  display: none;
}
#chat .chat__conversation-board__message__options .option-item {
  border: 0;
  background: 0;
  padding: 0;
  margin: 0;
  height: 16px;
  width: 16px;
  outline: none;
}
#chat .chat__conversation-board__message__options .emoji-button svg {
  stroke: var(--chat-options-svg);
  fill: transparent;
  width: 100%;
}
#chat .chat__conversation-board__message__options .more-button svg {
  stroke: var(--chat-options-svg);
  fill: transparent;
  width: 100%;
}
#chat .chat__conversation-board__message__bubble span {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  display: inline-table;
  word-wrap: break-word;
  background: var(--chat-bubble-background);
  font-size: 18px;
  color: var(--chat-text-color);
  padding: 0.5em 0.8em;
  line-height: 1.5;
  border-radius: 6px;
  font-family: "Lato", sans-serif;
}
#chat .chat__conversation-board__message__bubble:not(:last-child) {
  margin: 0 0 0.3em;
}
#chat .chat__conversation-board__message__bubble:active {
  background: var(--chat-bubble-active-background);
}
#chat .chat__conversation-panel {
  background: var(--chat-panel-background);
  border-radius: 12px;
  padding: 0 1em;
  height: 60px;
  margin: 0.5em 0 0;
}
#chat .chat__conversation-panel__container {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
}
#chat .chat__conversation-panel__container .panel-item:not(:last-child) {
  margin: 0 1em 0 0;
}
#chat .chat__conversation-panel__button {
  background: grey;
  height: 20px;
  width: 30px;
  border: 0;
  padding: 0;
  outline: none;
  cursor: pointer;
}
#chat .chat__conversation-panel .add-file-button {
  height: 23px;
  min-width: 23px;
  width: 23px;
  background: var(--chat-add-button-background);
  border-radius: 50%;
}
#chat .chat__conversation-panel .add-file-button svg {
  width: 70%;
  stroke: #54575c;
}
#chat .chat__conversation-panel .emoji-button {
  min-width: 23px;
  width: 23px;
  height: 23px;
  background: transparent;
  border-radius: 50%;
}
#chat .chat__conversation-panel .emoji-button svg {
  width: 100%;
  fill: transparent;
  stroke: #54575c;
}
#chat .chat__conversation-panel .send-message-button {
  background: var(--chat-send-button-background);
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
}

#chat .chat__conversation-panel .send-message-button:active {
  transform: scale(0.9);
}
#chat .chat__conversation-panel .send-message-button svg {
  margin: 1px -2px;
}
#chat .chat__conversation-panel__input {
  width: 100%;
  height: 100%;
  outline: none;
  position: relative;
  color: var(--chat-text-color);
  font-size: 18px;
  background: transparent;
  border: 0;
  font-family: "Lato", sans-serif;
  resize: none;
}

@media only screen and (max-width: 600px) {
  #chat {
    margin: 0;
    border-radius: 0;
  }
  #chat .chat__conversation-board {
    height: calc(90vh - 55px - 2em - .5em - 3em);
  }
  #chat .chat__conversation-board__message__options {
    display: none !important;
  }
}
`}

      </style>
    </div>

  );
}
export default SearchWord;
import React, { useRef, useEffect, useState } from "react";
import { BsFillMicFill, BsFillSendFill } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { datachat } from "../types/typechat";
import RowChat from "../components/chat";
import axios from "axios";
import { ChatCompletionRequestMessage } from 'openai'
import MicrophoneButton from "@/components/voice";

function VoiceChat() {
  
  
  const apiURL = process.env.URL_APP;
  const [chatData, setChatData] = useState<datachat[]>([]);
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])
  const [isListening, setIsListening] = useState<any>(false);
  const [recognizedText, setRecognizedText] = useState<any>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState<any>(false)
  useEffect(() => {
    getData();
    let recognition = new window.webkitSpeechRecognition();
    const initializeRecognition = () => {
      recognition.continuous = true;
      recognition.interimResults = true; // Cho phép nhận dạng tạm thời
      recognition.lang = 'en-US'; // Thiết lập ngôn ngữ cho nhận dạng giọng nói
      recognition.onresult = handleRecognitionResult;
    };
    const startRecognition = () => {
      recognition.start();
    };
    const stopRecognition = () => {
      recognition.stop();
    };

    if (isListening) {
      initializeRecognition();
      startRecognition();
    } else {
      stopRecognition();
    }

    return () => {
      stopRecognition();
    };
  }, [isListening,apiURL]);
  const handleRecognitionResult = (event: SpeechRecognitionEvent) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
      } else {
        interimTranscript += transcript;
      }
    }
    setRecognizedText(finalTranscript + interimTranscript);
  };


  const handleStart = () => {
    setIsListening(true);
  };

  const handleStop = () => {
    handleClick()
    setIsListening(false);
  };
  const handleClickVoice = () => {
    
    let login = sessionStorage.getItem('Login')
    if(login ===undefined||login==='false'||login===null) {
      window.location.href='/login'
    };
    if (isListening === true) {
      handleStop();
    }
    else {
      handleStart();
    }
  }
  const getData = async () => {
    await axios.get(`${apiURL}ChatBot?user=${sessionStorage?.getItem("Login")}`)
      .then((response) => {
        console.clear()
        setChatData(response.data)
        console.log(response.data);
      }).then(json => console.log(json))
  }
  const postData = async (Uchat: string, Bchat: string) => {
    const cont: datachat = {
      inde: 1,
      userchat: Uchat,
      botchat: Bchat,
      own:sessionStorage.getItem('Login')||''
    }
    let urlpost = `${apiURL}chatbot`;
    
    await axios.post(urlpost,cont)
      .then((response) => {
        console.log(response.data);
        const newc: datachat = {
          inde: 1,
          userchat: Uchat,
          botchat: Bchat,
          own:sessionStorage.getItem('Login')||''
        }
        const newdata = [...chatData, newc]
        setChatData(newdata);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error(error);
      });
    await  textToSpeech(Bchat);
  }
  const sendMessage = async (messages: ChatCompletionRequestMessage[]) => {
    try {
      const response = await fetch('/api/createMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      })
      return await response.json()
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleClick = () => {
    
    const rep = recognizedText || '';
    let newc: datachat = {
      inde: 1,
      userchat: rep,
      botchat: 'Loading .............',
      own:sessionStorage.getItem('Login')||''
    }
   
    let reply = addMessage(rep);
    reply.then(result => {
      postData(rep, result.content)
    })
    setRecognizedText(()=>'')
    textareaRef.current && (textareaRef.current.value='')
  }
  const handleDelete = async () => {
    let urlpost = `${apiURL}ChatBot?user=${sessionStorage.getItem('Login')}`;
    console.log(urlpost)
    await axios.delete(urlpost)
    const trash: datachat[] = []
    setChatData(trash);
  }
  const addMessage = async (content: string) => {
    setIsLoadingAnswer(true)
    try {
      const newMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content,
      }
      const newMessages = [...messages, newMessage]

      // Add the user message to the state so we can see it immediately
      setMessages(newMessages)

      const { data } = await sendMessage(newMessages)
      const reply = data.choices[0].message
      console.log(reply)
      // Add the assistant message to the state
      setMessages([...newMessages, reply])
      return reply;
    } catch (error) {
      // Show error when something goes wrong

    } finally {
      setIsLoadingAnswer(false)
    }
  }
  const textToSpeech = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    const voice = voices.find((voice) => voice.lang === "en-US");
    utterance.voice = voice || null;
    synth.speak(utterance);
  };
  


  return (
    <div className=" bg-[#444654] min-h-[90vh]">
      <div>
      </div>
      <div className="bg-[#444654] ">
      {chatData && Array.isArray(chatData) && (
       <div>
         {chatData?.map((item, index) => {
          return <RowChat item={item} key={index} />;
        })}
       </div>
      )}
      </div>
      <div className=" h-[80px] bg-[#343541] w-screen ">

        <div className="flex justify-center w-screen w-1/1 fixed bottom-0">
          <div className="bg-[#444654]  w-2/3  flex relative justify-end items-center rounded-[20px] border-white border-[2px]">
            <button title='submit' className="flex justify-center items-center w-[30px] h-[30px] hover:bg-slate-900 rounded mx-[10px]" onClick={handleDelete}><AiOutlineDelete className="text-[30px]" /></button>
            <textarea title='submit'
              className="bg-[#444654] w-full border-[2px] rounded-[5px]"
              name="chatcontent"
              id="chatcontent"
              value={recognizedText}
              ref={textareaRef}
              readOnly
              disabled
              style={{ resize: 'none' }}
    
            />
            <button  title='submit' className="mx-[10px]" onClick={handleClickVoice} >
              <div className="inset-0 flex items-center justify-center">
              <BsFillMicFill className={` h-[30px] w-[30px] ${isListening?'animate-pulse text-[red]':'text-[#bab4b4]'}`}/> 
              </div>
            </button>


          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceChat;

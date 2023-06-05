import { useState, useEffect, useRef } from 'react';
import { BiSkipNextCircle, BiSkipPreviousCircle, BiReset, BiPlayCircle } from 'react-icons/bi'
import { AiFillSound, AiFillStar } from 'react-icons/ai'
import axios from 'axios';
import { dataTraCau, favourite, vocabulary } from '@/types/typechat';

function SpeechToText(this: any) {
  const urlApi = process.env.URL_APP
  const [isActive, SetIsActive] = useState<boolean>(true);
  const [reset, setRest] = useState<boolean>(false);
  const [indexWord, setIndexWord] = useState<number>(0);
  const [data, getData] = useState<vocabulary[]>([])
  const [valueSelect, setValueSelect] = useState<string>('10')
  const [traCauValue, setTraCauValue] = useState<dataTraCau>({} as dataTraCau);
  const [favourite, setFavourite] = useState<favourite[]>([])
  const updateActive = async () => {
    await meanWord(indexWord);
    SetIsActive(!isActive)
  }
  const getFavourite = async() =>{
    await axios.get(`${urlApi}Quizz?ID=${sessionStorage.getItem('Login')}`).then((result) => {
      setFavourite(() => result.data)
    })
  }
  const deleteFavourite = async () => {
    await axios.post(`${urlApi}Vocabulary/DeleteInFavorite?own=${sessionStorage.getItem('Login')}&wordid=${data?.[indexWord]?.Wordid}`).then(()=>{getFavourite()})
  }
  const addFavourite = async () => {
    await axios.post(`${urlApi}Vocabulary/AddInFavorite?own=${sessionStorage.getItem('Login')}&wordid=${data?.[indexWord]?.Wordid}`).then(()=>{getFavourite()})
  }
  const meanWord = async (index: number) => {
    await axios.get(`https://api.tracau.vn/${process.env.DIC_API_KEY}/s/'${data[index]?.Word}'/en`).then((result) => {
      setTraCauValue(() => result.data)
    })
  }
  const handlePlay = () => {
    textToSpeech(data?.[indexWord]?.Word)
  };
  const handleNext = async () => {
    if (indexWord === data.length-1) return;
    setIndexWord(indexWord + 1)
    SetIsActive(true);
  };

  const handlePrev = async () => {
    if (indexWord != 0) {

      setIndexWord(indexWord - 1)
    }
    SetIsActive(true);
  };

  const handleStar = async () => {
    let login = sessionStorage.getItem('Login')
    if(login ===undefined||login==='false'||login===null) {
      window.location.href='/login'
    };
    await favourite.some(item => item.wordID === data?.[indexWord]?.Wordid) ? deleteFavourite() : addFavourite()
  
    setValueSelect(()=>valueSelect)
  }
  const textToSpeech = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    const voice = voices.find((voice) => voice.lang === "en-US");
    utterance.voice = voice || null;
    synth.speak(utterance);
  };
  const handleFavo = (value:string)=>{
    let login = sessionStorage.getItem('Login')
    if((login ===undefined||login==='false'||login===null)&&value==='favourite') {
      window.location.href='/login'
    };
    setValueSelect(() => value)
  }
  useEffect(() => {
    const getWord = async () => {
      if (valueSelect != 'favourite') {
        await axios.get(`${urlApi}Vocabulary?amount=${valueSelect}`).then((result) => {
          getData(() => result.data)
        })
      }
      else{
        await axios.get(`${urlApi}Vocabulary/Favourite?own=${sessionStorage.getItem("Login")}`).then((result) => {
          getData(() => result.data)
        })
      }

      await axios.get(`${urlApi}Quizz?ID=${sessionStorage.getItem('Login')}`).then((result) => {
        setFavourite(() => result.data)
      })
    }
    getWord()
  }, [valueSelect])
  return (
    <div className='h-[90vh] w-[100vw] bg-white'>
      <div className='flex justify-end pt-[30px]'>
        <select title='select'className=" bg-[#182025] rounded-[10px] mr-[40px]" onChange={e => handleFavo(e.target.value)}>
          <option value="10" defaultChecked>10 từ vựng</option>
          <option value="20">20 từ vựng</option>
          <option value="30">30 từ vựng</option>
          <option value="favourite">Danh sách yêu thích</option>
        </select>
      </div>
      <div className='relative flex justify-center h-[60vh] items-center'>
        <button title='submit' className='absolute top-[13%] ml-[500px]'
          onClick={handleStar}
        ><AiFillStar className={`h-[30px] w-[30px] ${favourite?.some(item => item.wordID === data?.[indexWord]?.Wordid) ? "text-[#fcfc3a]" : "hover:text-[#aeae40]"}`} />
        </button>
        <button title='submit' onClick={updateActive} className='h-[50vh] w-[80vh] rounded-[30px]'>
          <div key={data?.[indexWord]?.Wordid} className={`transition duration-1000 h-[50vh] w-[80vh] rounded-[30px] ${isActive ? 'bg-[#6b6be0]' : 'bg-[gray]'}`}>
            {
              isActive === true ? (
                <div className=' flex h-[50vh] justify-center items-center '>
                  <b> {data?.[indexWord]?.Word}</b>
                </div>
              ) :
                (
                  <div className=' flex h-[50vh] justify-center items-center '>
                    <div>
                      <b> {data?.[indexWord]?.mean}</b>
                      <div>
                        Example :
                      </div>
                      <div className='max-w-[70vh]'>
                        <div className=''>
                          <div className='flex justify-start'>
                            <div>1. </div>
                            <div dangerouslySetInnerHTML={{ __html: traCauValue?.sentences?.[0]?.fields.en }}></div>
                            <p>  : {traCauValue?.sentences?.[0]?.fields.vi}</p>
                          </div>
                        </div>
                        <div className=''>
                          <div className='flex justify-start'>
                            <div>2. </div>
                            <div dangerouslySetInnerHTML={{ __html: traCauValue?.sentences?.[1]?.fields.en }}></div>
                            <p>  : {traCauValue?.sentences?.[1]?.fields.vi}</p>
                          </div>
                        </div>
                        <div className=''>
                          <div className='flex justify-start'>
                            <div>3. </div>
                            <div dangerouslySetInnerHTML={{ __html: traCauValue?.sentences?.[2]?.fields.en }}></div>
                            <p>  : {traCauValue?.sentences?.[2]?.fields.vi}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            }
          </div>
        </button>
      </div>
      <div className='flex justify-between w-[80vh] m-auto '>
        <button title='voice' onClick={handlePrev}><BiSkipPreviousCircle className='mt-[10px] text-[40px] text-[gray] ml-[20px]' /></button>
        <button title='voice2' onClick={handlePlay}><AiFillSound className='text-[35px] mt-[15px] text-[gray]' /></button>
        <button title='voice3' onClick={handleNext}><BiSkipNextCircle className='mt-[10px] text-[40px] text-[gray] mr-[20px]' /></button>
      </div>
    </div>
  );

}

export default SpeechToText;
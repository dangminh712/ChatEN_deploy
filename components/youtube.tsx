import { transcripts } from '@/types/typechat';
import React, {useState } from 'react';
import { BiSkipNextCircle, BiSkipPreviousCircle, BiReset } from 'react-icons/bi'

type Props = {
    item: transcripts | null | undefined;
}
const YouTubeEmbed = (props: Props) => {
    const [reset, setRest] = useState<boolean>(true);
    const [indexVideo, setIndexVideo] = useState<number>(0);
    const startValue = props.item?.[indexVideo]?.fields.start;
    const roundedStart = startValue !== undefined ? Math.floor(parseFloat(startValue)) : undefined;
    const handlePlay = () => {
        setRest(()=>!reset);
    };
    const handleNext = () => {
        // Xử lý logic chuyển đến video tiếp theo
        setIndexVideo(() => (indexVideo + 1))
    };

    const handlePrev = () => {
        if (indexVideo != 0) {
            setIndexVideo(() => (indexVideo - 1))
        }

    };

    return (
        <div className="video-container">
            <div>
                <iframe 
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${props.item?.[indexVideo]?.fields.youtube_id}?start=${roundedStart}&autoplay=1&${reset?'':'a'}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div >
            <div className='w-[560px] flex justify-around  '>
                <button onClick={handlePrev}><BiSkipPreviousCircle className='mt-[20px] text-[40px]' /></button>
                <button onClick={handlePlay}><BiReset className='text-[35px] mt-[15px]' /></button>
                <button onClick={handleNext}><BiSkipNextCircle className='mt-[20px] text-[40px]' /></button>
            </div>
            <div className='mt-[20px]' >
                <b className='w-fit bg-[#3D3D5C] py-[5px] px-[10px] rounded-[5px]' dangerouslySetInnerHTML={{ __html: props.item?.[indexVideo].fields.en || '' }}>
                </b>
            </div>
        </div>

    )
};

export default YouTubeEmbed;
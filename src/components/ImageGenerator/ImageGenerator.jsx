import React, { useRef, useState } from 'react'
import image from "../assets/image.svg"
function ImageGenerator() {
    const [img_url, setImgUrl] = useState('/')
    let inputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const imggenerator = async()=>{
        if(inputRef.current.value === ""){
            return 0;
        }
        setLoading(true)
        const response = await fetch('https://api.openai.com/v1/images/generations', 
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                `Bearer ${import.meta.env.VITE_API_KEY}`,
                "User-Agent":"Chrome"
            },
            body:JSON.stringify({
                prompt:`${inputRef.current.value}`,
                n:1,
                size:"512x512",
            }),
        }
        );
        let data = await response.json();
        let data_array = data.data;
        setImgUrl(data_array[0].url);
        setLoading(false)
    }
  return (
    <React.Fragment>
    <div className='flex flex-col items-center space-y-8 bg-[#0f1b21] text-white h-screen overflow-hidden'>
        <div className="text-5xl font-medium pb-7">
            AI Image <span className='text-pink-700 font-semibold'>Generator</span>
        </div>
        <div className="flex flex-col">
            <div className="image">
                <img src={img_url==="/"?image:img_url} alt="" />
            </div>
            <div className={`flex flex-col ${loading ? 'w-72 h-0.5 bg-pink-600 transition-all duration-10000 ease-linear' : 'w-0 h-0.5 bg-pink-600'}`}></div>
            <div className={loading?'text-sm':'hidden'}>Loading...</div>
        </div>
        <div className='flex w-full md:w-3/4 lg:w-1/2 xl:w-2/4 justify-between items-center rounded-full bg-[#1F3540]'>
            <input className='w-5/6 h-16 bg-transparent border-none outline-none text-white pl-9 mr-9' type="text" ref = {inputRef} placeholder='Describe the image you want to generate' 
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  imggenerator();
                }
            }}
            />
            <div className='h-14 flex items-center justify-center w-2/4 cursor-pointer text-xl rounded-full bg-[#DE1B89]' onClick={()=>{imggenerator()}}>Generate</div>
        </div>
    </div>
  </React.Fragment>
  )
}

export default ImageGenerator

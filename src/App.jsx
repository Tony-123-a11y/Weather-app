import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { GiEarthAsiaOceania } from "react-icons/gi";
import { MdWaterDrop } from "react-icons/md";
import { FaMoon, FaPlus, FaTemperatureLow } from "react-icons/fa6";
import { GiCompass } from "react-icons/gi";
import { GiSunrise } from "react-icons/gi";
import { VscRepoPull } from "react-icons/vsc";
import './App.css'
import { FaSearch } from 'react-icons/fa';
import { motion } from 'motion/react';


function App() {
  const [data, setdata] = useState('')
  const [dark, setdark] = useState(false)
  const [allData, setallData] = useState({extra:[]});
  const [loader, setloader] = useState(true);
 async function weather(city='lucknow'){
    try {
      setloader(true)
      let res= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c66061a0aaa9d23b0bca3b2358db1065`)
      let data= await res.json()
      setloader(false)
      const date= new Date(data.sys.sunrise*1000)
      setallData({name:data.name,
        realTemp:Math.ceil(data.main.temp - 273),
        minTemp:Math.ceil(data.main.temp_min-273),
        maxTemp:Math.ceil(data.main.temp_max-273),
        weather: data.weather[0].description,
        icon:data.weather[0].icon,
        extra:[
             {
              title:'sea level',
              value:data.main.sea_level + ' M',
              icon:<GiEarthAsiaOceania />
             },
             {
              title:'humidity',
              value:data.main.humidity + '%',
              icon:<MdWaterDrop />
             },
             {
              title:'real feel',
              value:Math.ceil(data.main.feels_like-273) + ' deg',
              icon:<FaTemperatureLow />
             },
             {
              title:'wind speed',
              value:Math.round(data.wind.speed*3.6) + ' km/h',
              icon:<GiCompass />
             },
             {
              title:'sunrise',
              value: `${date.getHours()<10 ?'0' :''}${date.getHours()}:${date.getMinutes()}`,
              icon:<GiSunrise />
             },
             {
              title:'pressure',
              value:data.main.pressure + ' mbar',
              icon:<VscRepoPull/>
             },
        ]
      })
     
      setdata(data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(allData)
  useEffect(() => {
    
    weather()
    
  }, [])
  
  const [show, setshow] = useState(false);
  const inputRef=useRef()
  return (
    <>
    <div className={`min-h-screen relative  bg-gradient-to-b from-sky-100 to-sky-50 ${(dark && 'dark')}`}>
      <div style={{opacity: (dark && 0) }} className={`absolute w-full h-full bg-[rgb(52,69,121)] transition duration-500`}></div>
      <div className='container px-3 py-8 font-[inter]  transition-all relative z-10 duration-500 text-white dark:text-black min-h-screen flex flex-col items-center justify-center mx-auto xl:max-w-7xl'>
        {loader ? <span className='loader'></span> : 
        <div className='w-full flex flex-col justify-start min-h-screen  h-full'>
        <div className='flex items-center justify-end gap-2'>
        <button onClick={()=>setdark(!dark)} className='text-xl min-w-14 h-10  bg-black/40  rounded-lg flex items-center justify-center'><FaMoon/></button>
          {
            (show && <motion.input
              initial={{
                scaleX:0
              }}
              animate={{
                scaleX:1
              }}
              transition={{
                
              }}
              ref={inputRef} type="text" className='bg-black/40 px-4 origin-right placeholder:text-sm text-gray-400 py-2 rounded-lg outline-none w-full' placeholder='Enter city name'/>)
          }
        <div className='text-xl min-w-14 h-10  bg-black/40  rounded-lg'>
         {show ? <button className=' w-full h-full text-center flex items-center cursor-pointer justify-center' onClick={()=>{
            (inputRef.current.value && weather(inputRef.current.value))
            setshow(false)
            }}><FaSearch/></button> : <button className=' w-full h-full cursor-pointer text-center flex items-center justify-center' onClick={()=>setshow(true)}><FaPlus/></button>}
        </div>
        </div>
        
       
          <img src={`https://openweathermap.org/img/wn/${allData.icon}@4x.png`} alt="" className='w-40 ml-auto' />
        <h4 className='text-2xl font-semibold'>{allData.name}</h4>
        <h1 className='text-9xl font-semibold mt-4'>{allData.realTemp}&#176;</h1>
        <div className='capitalize flex items-center justify-start gap-2 font-medium mt-4 md:mt-10'><span className='md:text-xl'>{allData.weather}</span><span className=' px-3 py-1 rounded-2xl bg-black/50 dark:bg-black/20'>{allData.minTemp}&#176;/{allData.maxTemp}&#176;</span></div>
        <div className="grid grid-cols-2 grid-rows-3 gap-2 mt-10 md:gap-6 md:mt-20">
          {
                      
           allData.extra.map((ele,i)=>{

             return <motion.div key={i} 
              initial={{
                scale:0
              }}
              
              animate={{
                scale:1
              }}
              transition={{
                stiffness:100,
                type:'spring',
                delay: 0.1*i,
                duration:.5
              }}
             className='p-4 bg-black/15 dark:bg-white  rounded-xl md:p-6 '>
                <h6 className='capitalize text-lg font-semibold  md:text-2xl'>{ele.title}</h6>
                <h4 className='text-gray-100 dark:text-gray-600 transition-all duration-500  md:text-lg '>{ele.value}</h4>
                <div className=' flex items-center justify-end text-5xl text-gray-100 dark:text-gray-700  transition-all duration-500 md:text-7xl '>{ele.icon}</div>
             </motion.div>
           })
          
          }
        </div>
        </div>
}
      </div>
      </div>
        
    </>
  )
}

export default App

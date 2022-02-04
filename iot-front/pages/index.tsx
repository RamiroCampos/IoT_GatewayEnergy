import { useContext, useEffect } from 'react';
import type { NextPage } from 'next';
import {ReactQueryContext} from '../contexts/ReactQueryContext';
import EnergyInfo from '../components/EnergyInfo';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';

import postAwsData from '../config/aws';

const Home: NextPage = () => {
  const {infoData, potenciaData} = useContext(ReactQueryContext);

  useEffect(() => {
    async function sendDataOnDay(){
      const data = new Date(Date.now()).getDate()
      if(data === 25){
        await awsRequest()
      }
    }
    sendDataOnDay();
  }, [])


  const getMaxValue = () => {
    const values = infoData?.feeds.map(e => Number(e.field1));
    if(values){
      return Math.max(...values);
    }
  }

  const getMinValue = () => {
    const values = infoData?.feeds.map(e => Number(e.field1));
    if(values){
      return Math.min(...values);
    }
  }

  const awsRequest = async() => {
    try{
      await postAwsData();
    }catch(err){
      console.error(err);
    }
  }

  return (
    <>
      <div className='w-full h-screen flex flex-col py-8 px-48 bg-gradient-to-t from-gray-700 via-gray-900 to-black'>
        <h1 className='text-5xl text-center text-gray-50 font-bold pb-5 mb-5'>Gateway Energy</h1>
        <div className='flex flex-row gap-x-5'>
          <div className='w-3/5 flex flex-col gap-y-5'>
            <BarChart potenciaInfo={potenciaData} />  
            {potenciaData && <LineChart potenciaInfo={potenciaData}/>} 
          </div>  
          <div className='w-2/5 flex flex-col gap-y-5'>
            {infoData && <EnergyInfo energyInfo={infoData}/>} 
            <div className='flex flex-col p-8 bg-green-700 rounded-md'>
              <span className='text-lg text-slate-400'>Min</span>
              <span className='text-4xl text-slate-200 font-bold'>{getMinValue()} Watt</span>
            </div> 

            <div className='flex flex-col p-8 bg-red-700 rounded-md'>
              <span className='text-lg text-slate-400'>Max</span>
              <span className='text-4xl text-slate-200 font-bold'>{getMaxValue()} Watt</span>
            </div> 
            
            <button 
              className={`
                p-5 w-1/2 self-center
                bg-transparent
              text-white 
              hover:text-red-500
              border-whit-200
                ease-in-out duration-200 hover:border-red-500
                border-2
                border-dashed
                rounded
                font-bold
                ` 
              }
              onClick={awsRequest} 
            >
              Relatório
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
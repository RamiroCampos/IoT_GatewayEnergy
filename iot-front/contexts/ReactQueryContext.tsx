import { createContext, useState } from 'react';
import { useQuery } from 'react-query';
import thingSpeakApi from '../config/axios';
import { LineChartProps } from '../types/channelTypes';


type Props =  {
    potenciaData?: LineChartProps;
    infoData?: LineChartProps;
}

export const ReactQueryContext = createContext<Props>({} as Props);

const ReactQueryContextProvider = ({children}: any) => {
    
    const { isError: potError , isLoading: potLoading, data: potenciaData } = useQuery<LineChartProps>('potencia', async () => {
        const { data } = await thingSpeakApi.get('/fields/1.json?results=8000');
        return data;
    },{
        refetchInterval: 5000,
    });

    const {isError: infoError,isLoading: infoLoading, data: infoData} = useQuery<LineChartProps>('info', async () => {
        const {data} = await thingSpeakApi.get('/fields/1.json?results=60');
        return data;
    },{
        refetchInterval: 10000,
    })

    if(potLoading || infoLoading){
        return <h1>Loading...</h1>
    }

    if(potError || infoError){
        return <h1>Error...</h1>
    }

    return(
        <ReactQueryContext.Provider value={{potenciaData,infoData}}>
            {children}
        </ReactQueryContext.Provider>
    ) 

}

export default ReactQueryContextProvider;
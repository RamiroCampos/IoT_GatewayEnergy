import { ChannelProps } from '../types/channelTypes';

interface LineChartProps {
  channel: ChannelProps;
  feeds: Feed[]
}

interface Feed {
  created_at: string;
  entry_id: number;
  field1: string;
}

const calcConsumo = (potenciaMedia: number) => {
  const khw = potenciaMedia/1000 * 24;
  const consumo = (khw * (0.20104 + 0.36433 + 0.46955)).toFixed(2);
  return Number(consumo);
}

export default function EnergyInfo({energyInfo}: any){
    const handleConsumo = (dataEnergy: LineChartProps, type: 'day' | 'month' = 'day') => {
      const potenciaMedia = dataEnergy.feeds.reduce((count, values) => count += Number(values.field1) ,0)/dataEnergy.feeds.length;
      let value = calcConsumo(potenciaMedia);
      
      if(type === 'month'){
        value = Number((value * 30).toFixed(2));
      }
      return value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    }

    return(
      <div className='p-2 flex flex-col items-center gap-4 border-2 border-yellow-200 rounded-lg'>
        <h1 className='text-center text-3xl text-yellow-200'>Energy Information</h1>
        
        <div className='flex flex-col justify-center items-center'>
          <span className='text-3xl text-yellow-400 font-bold'>{handleConsumo(energyInfo)}</span>
          <span className='text text-yellow-300 '>Consumo por hora</span>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <span className='text-3xl text-yellow-400 font-bold'>{handleConsumo(energyInfo, 'month')}</span>
          <span className='text text-yellow-300 '>Consumo por mês</span>
        </div>
      </div>
    )
}
import { Chart } from "react-google-charts";
import moment from "moment";
import { useState } from "react";

const options = { 
	chart: {
    title: "Potência Máx e Min",
    subtitle: "Max e Min por dia em Watt",
  },
  bars: 'horizontal',
  height: 300
};

const groupByDate  = (array: any[]) => {
	const groups = array.reduce((groups, obj) => {
		const date = obj.created_at.split('T')[0];
		if (!groups[date]) {
				groups[date] = [];
		}
		groups[date].push(obj);
		return groups;
	}, {});

	const groupArrays = Object.keys(groups).map((date) => {
		return {
			date,
			potencias: groups[date]
		};
	});

	return groupArrays;
}

export default function BarChart({potenciaInfo}: any){
    const [showConsumo, setShowConsumo] = useState(false);

    const calcConsumo = (value: number) => {
     const calculatedValue = ((value/1000 * 24) * (0.20104 + 0.36433 + 0.46955)).toFixed(2);
     return Number(calculatedValue);
    }
    
    const calcValues = (consumo: boolean = false) => {
			const groupArray = groupByDate(potenciaInfo.feeds);
			const newValues = groupArray.map(obj => {
				const aux = obj.potencias.map((obj: any) => Number(obj.field1));
				const max = Math.max(...aux);
				const min = Math.min(...aux);
      
				return [
					moment(obj.date,'YYYY-MM-DD').utc().format('DD/MM'),
					consumo ? calcConsumo(max):max,
					consumo ? calcConsumo(min):min
				]
			})
			newValues.unshift(['Day','Max','Min']);
			return newValues;
		}

    return(
      <div className="flex flex-col gap-y-2 relative" style={{position: 'relative'}}>
        <button style={{
          alignSelf: 'flex-end',
          backgroundColor: '#FF9333',
          padding: '5px',
          borderRadius: '3px',
          marginBottom: '2px',
          color: 'white',
          position: 'absolute',
          top: '3px',
          right: '3px',
          zIndex: '1'
        }} onClick={() => setShowConsumo(old => !old)}>
          consumo
        </button>
        <Chart
          chartType="Bar"
          width="100%"
          height="300px"
          data={potenciaInfo ? calcValues(showConsumo): []}
          options={options}
        />
      </div>
    )
}
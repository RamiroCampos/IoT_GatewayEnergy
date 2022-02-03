import moment from 'moment';
import { Chart } from "react-google-charts";
import { Feed } from "../types/channelTypes";



export const options = {
    title: 'Potência',
    hAxis: {
        title: "minuto",
    },
    vAxis: {
    title: "Watts",
    },
    series: {
    0: { curveType: "function", color: '#4682B4' },
    },
    legend: "none",
    animation: {
        startup: true,
        easing: "linear",
        duration: 1500,
      },
};

export default function LineChart({potenciaInfo}: any){


    const analysisData = (feeds: Feed[]) => {
        const newData =  feeds.map(feed => {
            return [moment(feed.created_at).format('hh:mm'),Number(feed.field1)]
        })
        
        newData.unshift(['data','watt'])
        return newData;
    }

    return(
        <Chart
            chartType="LineChart"
            width="100%"
            height="300px"
            data={potenciaInfo ? analysisData(potenciaInfo?.feeds): []}
            options={options}
        />
    )
}
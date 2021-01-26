import React, { useState, useEffect } from 'react';
import {Line, Bar} from 'react-chartjs-2';
import { fetchDailyData } from '../../API/';

import styles from './Chart.module.css'

const Chart = ({ data:{ confirmed, recovered, deaths }, country }) => {
		const [dailyData, setDailyData] = useState({});

    useEffect(()=>{
        const fetchAPI = async () =>{
            const initialDailyData = await fetchDailyData()

            setDailyData(initialDailyData)
        }
		fetchAPI();
    }, []);



    const lineChart = (
        dailyData[0] 
        ? (<Line
            data={{
                labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                datasets: [{
									data: dailyData.map(({ confirmed }) => confirmed),
									label: 'infected',
                                    borderColor: '#3333ff',
                                    backgroundColor: 'rgba(0, 255, 0, 0.25)',
									fill: true,
								}, {
									data: dailyData.map(({ deaths }) => deaths),
									label: 'Deaths',
									borderColor: 'red',
									backgroundColor: 'rgba(255, 0, 0, 0.75)',
									fill: true,
								},{
									data: dailyData.map(({ recovered }) => recovered),
									label: 'Recovered',
									borderColor: 'green',
									backgroundColor: 'rgba(0, 255, 0, 0.5)',
									fill: true,

								}]
            }}
        />) : null
		);
		
	console.log(confirmed, recovered, deaths)	
    const barChart = (
        confirmed
        ? (
            <Bar 
                data={{
                  labels: ['Infected', 'Recovered', 'Deaths'],
                  datasets: [{
                    label: 'people',
                    backgroundColor:  ['rgba(0, 0, 255, 0.5)', 
                      'rgba(255, 0, 0, 1)', 
                      'rgba(0, 255, 0, 0.75)']
                  }],
                  data: [confirmed.value, recovered.value, deaths.value]
                }}
                options = {{
                  legend: { display: false },
                  title: { display: true, text: `Current state in ${country}`},
                }}
            />
        ): null
    )
    return(
        <div className={styles.container}>
					{ country ? barChart : lineChart }
				</div>
    )
}

export default Chart;

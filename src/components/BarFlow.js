import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

// Redux
import { useSelector } from 'react-redux';
class CustomizedLabel extends React.Component {
    render() {
        const { x, y, fill, value } = this.props;
        return (
            <text
                x={x}
                y={y}
                dy={-4}
                fontSize="10"
                fontFamily="sans-serif"
                fill={fill}
                textAnchor="middle"
            >
                {value}
            </text>
        );
    }
}

const BarFlow = () => {
    const useStyles = makeStyles((theme) => ({
        chartDiv: {
            display: 'flex',
            width: "400px",
            maxWidth: "100%",
        },
    }));
    const classes = useStyles();
    const { temp, single_weather } = useSelector(state => state);
    // console.log(temp)
    // console.log(weather);
    function formatAMPM(date) {
        // console.log(new Date(date).getHours());
        var hours = new Date(date).getHours();
        var minutes = new Date(date).getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + '' + ampm;
        // console.log(strTime);
        return strTime;
    }
    let barData = []
    for (let index = 0; index < single_weather.weather.length; index++) {
        const element = single_weather.weather[index];
        // console.log(element);
        barData.push({
            temp: temp === 'C' ? Math.floor(element.main.temp - 273.15) : Math.floor((element.main.temp - 273.15) * 9 / 5 + 32),
            // projectedProfit: Math.floor(element.main.temp - 273.15),
            time: formatAMPM(`${new Date(+`${element.dt}000`)}`),
            color: "#015677"
        })
    }
    return (
        <div>
            {/* <BarChart
                width={600}
                height={400}
                data={barData}
                margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
            >
                <XAxis dataKey="Text" fontFamily="sans-serif" tickSize dy="25" />
                <YAxis hide />
                <Bar
                    dataKey="projectedProfit"
                    barSize={170}
                    fontFamily="sans-serif"
                    label={<CustomizedLabel />}
                >
                    {barData.map((entry, index) => (
                        <Cell fill={barData[index].color} />
                    ))}
                </Bar>
            </BarChart> */}
            <Paper container="true">
                <Chart
                    className={classes.chartDiv}
                    data={barData}
                >
                    <ArgumentAxis />
                    <ValueAxis max={7} />

                    <BarSeries
                        valueField="temp"
                        argumentField="time"
                    />
                    <Title text="Weather" />
                    <Animation />
                </Chart>
            </Paper>
        </div>
    )
};

export default BarFlow;
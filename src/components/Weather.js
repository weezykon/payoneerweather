/* eslint-disable react/require-render-return */
import React, { useEffect } from 'react'
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import CatalogMagic from './CatalogMagic'
import BarFlow from './BarFlow'

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { next, prev, fah, cel, setPages, setGroupReports, setSelectedReports, setWeather, setLoading, setError } from './../actions';

const Weather = () => {
    // redux
    const { temp, page, pages, conditions, reports, single_weather, loading, errorMessage } = useSelector(state => state);
    const dispatch = useDispatch();

    // others
    const DATA_PER_PAGE = 3;

    // classes
    const useStyles = makeStyles((theme) => ({
        paper: {
            padding: theme.spacing(1),
            textAlign: "center",
            color: theme.palette.text.secondary
        },
        root: {
            minWidth: 275,
        },
        cardContent: {
            display: 'flex',
            height: '30vh',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        content: {
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            margin: "auto",
            alignItems: "center",
            gridGap: "30px",
            width: "70%",
            paddingTop: "50px"
        },
        buttonDiv: {
            display: 'flex',
            justifyContent: 'start',
            width: "100%",
            alignItems: 'center',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        radioSection: {
            display: 'flex',
            justifyContent: 'start',
            width: "100%",
            alignItems: 'center',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        weatherCards: {
            gridGap: "30px",
        }
    }));

    const barFlow = (weatherData) => {
        // console.log(weatherData);
        dispatch(setWeather(weatherData))
    }

    const classes = useStyles();

    useEffect(() => {
        getWeather();
    }, []);

    const getWeather = () => {
        const LINK = 'https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40';
        axios.get(LINK)
            .then(res => {
                const response = res.data.list;
                // console.log(response);
                const dataGrouped = response.reduce((r, a) => {
                    r[`${new Date(+`${a.dt}000`).getFullYear()}/${new Date(+`${a.dt}000`).getMonth()}/${new Date(+`${a.dt}000`).getDate()}`] = [...r[`${new Date(+`${a.dt}000`).getFullYear()}/${new Date(+`${a.dt}000`).getMonth()}/${new Date(+`${a.dt}000`).getDate()}`] || [], a];
                    return r;
                }, {});
                var results = Object.keys(dataGrouped).map(key => {
                    return dataGrouped[key];
                })
                dispatch(setGroupReports(results))
                convertPages(results.length);
                startPaging(results);
                dispatch(setLoading(false));
            })
            .catch((error) => {
                dispatch(setError('City not found, Try again'));
                dispatch(setLoading(false));
            })
    }

    const convertPages = (count) => {
        const pagesCount = count % DATA_PER_PAGE > 0 ? Math.floor(count / DATA_PER_PAGE) + 1 : Math.floor(count / DATA_PER_PAGE);
        // console.log(pagesCount);
        dispatch(setPages(pagesCount));
    }

    const startPaging = (data) => {
        const startIndex = (page - 1) * DATA_PER_PAGE;
        const weatherReports = data.slice(startIndex, startIndex + DATA_PER_PAGE);
        // console.log(weatherReports)
        dispatch(setSelectedReports(weatherReports));
    }

    const prevPaging = () => {
        const data = conditions;
        const newPage = page - 1;
        dispatch(prev());
        const startIndex = (newPage - 1) * DATA_PER_PAGE;
        const weatherReports = data.slice(startIndex, startIndex + DATA_PER_PAGE);
        // console.log(weatherReports)
        dispatch(setSelectedReports(weatherReports));
    }

    const nextPaging = () => {
        // console.log('here')
        const data = conditions;
        const newPage = page + 1;
        const startIndex = (newPage - 1) * DATA_PER_PAGE;
        const weatherReports = data.slice(startIndex, startIndex + DATA_PER_PAGE);
        dispatch(next());
        dispatch(setSelectedReports(weatherReports));
        // console.log(select)
    }
    return (
        <div
            container className={classes.content}>
            {loading && !errorMessage.active ? (
                <>
                    <CatalogMagic />
                </>
            ) : errorMessage.active ? (
                <div className="alert alert-danger" role="alert">
                    {errorMessage.message}
                </div>
            ) : (
                <>
                    <div className={classes.radioSection}>
                        <ButtonGroup variant="text" color="secondary" aria-label="text primary button group">
                            <Button onClick={() => { dispatch(cel()) }} disabled={temp === 'C'}>Celcius</Button>
                            <Button onClick={() => { dispatch(fah()) }} disabled={temp === 'F'}>Fahrenheit</Button>
                        </ButtonGroup>
                    </div>
                    <div className={classes.buttonDiv}>
                        <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                            <Button onClick={() => prevPaging()} disabled={page <= 1}>Prev</Button>
                            <Button onClick={() => nextPaging()} disabled={page === pages}>Next</Button>
                        </ButtonGroup>
                    </div>
                    <Grid container className={classes.weatherCards}>
                        {
                            reports.map((weatherItem, index) => (
                                <Card className={classes.root} variant="outlined">
                                    <CardContent className={classes.cardContent} onClick={() => barFlow(weatherItem)}>
                                        <Typography variant="h3" component="h1" gutterBottom>
                                            {temp === 'C' ? `${Math.floor(weatherItem[0].main.temp - 273.15)}°C` : `${Math.floor((weatherItem[0].main.temp - 273.15) * 9 / 5 + 32)}°F`}
                                        </Typography>
                                        <Typography>
                                            <b>Weather:</b> {weatherItem[0].weather[0].main}
                                        </Typography>
                                        <Typography>
                                            <b>Date:</b> {new Date(+`${weatherItem[0].dt}000`).toDateString()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </Grid>
                    {single_weather.active ? (
                        <BarFlow />) : ('')
                    }
                </>
            )}

        </div>
    )
}

export default Weather;

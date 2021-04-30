/* eslint-disable react/require-render-return */
import React, { useState, useEffect } from 'react'
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

const Weather = () => {
    const USERS_PER_PAGE = 3;
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [tempType, setTempType] = useState('C');
    const [groupReports, setGroupReports] = useState({});
    const [selectedReports, setSelectedReports] = useState({});
    const [activeWeather, setActiveWeather] = useState({});
    const [activeBar, setActiveBar] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

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

    const barFlow = (weather) => {
        setActiveBar(true)
        setActiveWeather(weather)
    }

    const classes = useStyles();

    useEffect(() => {
        getWeather();
    }, []);

    const getWeather = () => {
        axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40')
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
                setGroupReports(results)
                convertPages(results.length);
                startPaging(results);
                setLoading(false);
            })
    }

    const convertPages = (count) => {
        const pagesCount = count % USERS_PER_PAGE > 0 ? Math.floor(count / USERS_PER_PAGE) + 1 : Math.floor(count / USERS_PER_PAGE);
        // console.log(pagesCount);
        setPages(pagesCount);
    }

    const startPaging = (data) => {
        const startIndex = (page - 1) * USERS_PER_PAGE;
        const weatherReports = data.slice(startIndex, startIndex + USERS_PER_PAGE);
        // console.log(weatherReports)
        setSelectedReports(weatherReports);
    }

    const prevPaging = () => {
        const data = groupReports;
        const newPage = page - 1;
        setPage(newPage);
        const startIndex = (newPage - 1) * USERS_PER_PAGE;
        const weatherReports = data.slice(startIndex, startIndex + USERS_PER_PAGE);
        // console.log(weatherReports, newPage);
        setSelectedReports(weatherReports);
    }

    const nextPaging = () => {
        const data = groupReports;
        const newPage = page + 1;
        setPage(newPage);
        const startIndex = (newPage - 1) * USERS_PER_PAGE;
        const weatherReports = data.slice(startIndex, startIndex + USERS_PER_PAGE);
        // console.log(weatherReports, newPage, pages);
        setSelectedReports(weatherReports);
    }
    return (
        <div
            container className={classes.content}>
            {loading && !errorMessage ? (
                <>
                    <CatalogMagic />
                </>
            ) : errorMessage ? (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            ) : (
                <>
                    <div className={classes.radioSection}>
                        <ButtonGroup variant="text" color="secondary" aria-label="text primary button group">
                            <Button onClick={() => { setTempType('C') }} disabled={tempType === 'C'}>Celcius</Button>
                            <Button onClick={() => { setTempType('F') }} disabled={tempType === 'F'}>Fahrenheit</Button>
                        </ButtonGroup>
                    </div>
                    <div className={classes.buttonDiv}>
                        <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                            <Button onClick={prevPaging} disabled={page <= 1}>Prev</Button>
                            <Button onClick={nextPaging} disabled={page === pages}>Next</Button>
                        </ButtonGroup>
                    </div>
                    <Grid container className={classes.weatherCards}>
                        {
                            selectedReports.map((weather, index) => (
                                <Card className={classes.root} variant="outlined">
                                    <CardContent className={classes.cardContent} onClick={() => barFlow(weather)}>
                                        <Typography variant="h3" component="h1" gutterBottom>
                                            {tempType === 'C' ? `${Math.floor(weather[0].main.temp - 273.15)}°C` : `${Math.floor((weather[0].main.temp - 273.15) * 9 / 5 + 32)}°F`}
                                        </Typography>
                                        <Typography>
                                            <b>Weather:</b> {weather[0].weather[0].main}
                                        </Typography>
                                        <Typography>
                                            <b>Date:</b> {new Date(+`${weather[0].dt}000`).toDateString()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </Grid>
                    {activeBar ? (
                        <BarFlow weather={activeWeather} temp={tempType} />) : ('')
                    }
                </>
            )}

        </div>
    )
}

export default Weather;

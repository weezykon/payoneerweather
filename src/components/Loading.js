import React from 'react'
import rain from './../assets/images/rain-cloud.svg';
import snow from './../assets/images/snow-cloud.svg';
import thunder from './../assets/images/thunder.svg';
import sun from './../assets/images/sun.svg';
import Grid from '@material-ui/core/Grid';

const Loading = () => {
    return (
        <Grid
            container
            maxWidth="lg"
            direction="row"
            spacing={10}
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}>
            <img src={rain} className="" alt="Rain Svg" />
            <img src={snow} className="" alt="Snow Svg" />
            <img src={thunder} className="" alt="Thunder svg" />
            <img src={sun} className="" alt="Sun Svg" />
        </Grid>
    )
}

export default Loading;

const axios = require('axios');

export const formatDate = (date) => {
    if (date) {
        return `${new Date(+`${date}000`).getFullYear()}/${new Date(+`${date}000`).getMonth()}/${new Date(+`${date}000`).getDate()}`;
    }
    return '';
};

export const fetchData = async () => {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40');
    return response.data.list;
};

export const fetchFailedData = async () => {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Lagos,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40');
    return response;
};

export const groupData = async (data) => {
    const dataGrouped = data.reduce((r, a) => {
        r[`${new Date(+`${a.dt}000`).getFullYear()}/${new Date(+`${a.dt}000`).getMonth()}/${new Date(+`${a.dt}000`).getDate()}`] = [...r[`${new Date(+`${a.dt}000`).getFullYear()}/${new Date(+`${a.dt}000`).getMonth()}/${new Date(+`${a.dt}000`).getDate()}`] || [], a];
        return r;
    }, {});
    // console.log(dataGrouped);
    var results = Object.keys(dataGrouped).map(key => {
        return dataGrouped[key];
    })
    return results;
}
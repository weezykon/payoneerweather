export const next = () => {
    return {
        type: 'NEXT'
    };
};

export const prev = () => {
    return {
        type: 'PREV'
    };
};

export const fah = () => {
    return {
        type: 'FAH'
    };
};

export const cel = () => {
    return {
        type: 'CEL'
    };
};

export const setPages = (num) => {
    return {
        type: 'PAGECOUNTER',
        num
    };
};

export const setGroupReports = (data) => {
    return {
        type: 'conditions',
        data
    };
};

export const setSelectedReports = (data) => {
    return {
        type: 'selected',
        data
    };
};

export const setWeather = (data) => {
    console.log('here');
    return {
        type: 'dayWeather',
        data
    };
};
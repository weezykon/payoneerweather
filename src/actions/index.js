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
    return {
        type: 'dayWeather',
        data
    };
};

export const setError = (data) => {
    return {
        type: 'ERROR',
        data
    };
};

export const setLoading = (data) => {
    return {
        type: 'loadingData',
        data
    };
};

export const setPreloader = (data) => {
    return {
        type: 'PRELOADER',
        data
    };
};
const weatherReducer = (state = { active: false }, action) => {
    switch (action.type) {
        case 'dayWeather':
            state = {
                active: true,
                weather: action.data,
            };
            break;
        default:
            break;
    }
    return state;
}

export default weatherReducer;
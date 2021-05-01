const weatherReducer = (state = { active: false }, action) => {
    switch (action.type) {
        case 'dayWeather':
            state = {
                active: true,
                weather: action.data,
            };
        default:
            break;
    }
    // console.log(state)
    return state;
}

export default weatherReducer;
const loadingReducer = (state = true, action) => {
    switch (action.type) {
        case 'loadingData':
            state = action.data;
            break;
        default:
            break;
    }
    return state;
}

export default loadingReducer;
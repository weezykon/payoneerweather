const preloadingReducer = (state = true, action) => {
    switch (action.type) {
        case 'PRELOADER':
            state = action.data;
            break;
        default:
            break;
    }
    return state;
}

export default preloadingReducer;
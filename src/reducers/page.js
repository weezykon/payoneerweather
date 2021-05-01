const pageReducer = (state = 1, action) => {
    switch (action.type) {
        case 'NEXT':
            return state + 1;
        case 'PREV':
            return state - 1;
        default:
            return state;
    }
}

export default pageReducer;
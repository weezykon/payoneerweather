const reportsReducer = (state = [], action) => {
    switch (action.type) {
        case 'selected':
            state = action.data;
            break;
        default:
            break;
    }
    return state;
}

export default reportsReducer;
const reportsReducer = (state = [], action) => {
    switch (action.type) {
        case 'selected':
            state = action.data;
        default:
            break;
    }
    return state;
}

export default reportsReducer;
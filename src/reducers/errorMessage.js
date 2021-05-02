const errorReducer = (state = { active: false }, action) => {
    switch (action.type) {
        case 'ERROR':
            state = {
                active: true,
                message: action.data,
            };
            break;
        default:
            break;
    }
    return state;
}

export default errorReducer;
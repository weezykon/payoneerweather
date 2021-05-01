const pagesReducer = (state = 1, action) => {
    switch (action.type) {
        case 'PAGECOUNTER':
            return action.num;
        default:
            return state;
    }
}

export default pagesReducer;
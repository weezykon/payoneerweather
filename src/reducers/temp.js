const pageReducer = (state = 'C', action) => {
    switch (action.type) {
        case 'FAH':
            return 'F';
        case 'CEL':
            return 'C';
        default:
            return state;
    }
}

export default pageReducer;
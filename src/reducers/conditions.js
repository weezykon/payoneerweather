const conditionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'conditions':
            return action.data;
        default:
            return state;
    }
}

export default conditionsReducer;
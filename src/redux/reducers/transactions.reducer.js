const transactions = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_TRANSACTIONS':
            return action.payload;
        default:
            return state;
    }
}

export default transactions;
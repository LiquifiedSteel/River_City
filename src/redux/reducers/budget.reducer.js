const budget = (state = [{type: "Budget", amount: 0}, {type: "Tithing", amount: 0}], action) => {
    switch (action.type) {
        case 'FETCH_BUDGET':
            return [...state];
        case 'FETCH_NEW_BUDGET':
            return action.payload;
        default:
            return state;
    }
}

export default budget;
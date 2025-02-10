const remaining = (state = 0, action) => {
    switch (action.type) {
        case 'FETCH_REMAINING':
            return action.payload;
        default:
            return state;
    }
}

export default remaining;
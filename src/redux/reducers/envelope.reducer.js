const envelope = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ENVELOPES':
          return action.payload;
        default:
          return state;
      }
}

export default envelope;
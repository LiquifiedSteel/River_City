const envSwitch = (state = false, action) => {
    switch (action.type) {
        case 'SWITCH':
          return !state;
        default:
          return state;
      }
}

export default envSwitch;
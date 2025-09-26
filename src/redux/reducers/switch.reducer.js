const envSwitch = (state = {login: false, envelope: false, admin: false}, action) => {
    switch (action.type) {
        case 'SWITCH_LOGIN':
          return {login: true, envelope: false, admin: false};
        case 'SWITCH_ENVELOPE':
          return {login: false, envelope: true, admin: false};
        case 'SWITCH_ADMIN':
          return {login: false, envelope: false, admin: true};
        case 'RESET':
          return {login: false, envelope: false, admin: false};
        default:
          return state;
      }
}

export default envSwitch;
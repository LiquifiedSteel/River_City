const userList = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_USER_LIST':
          return action.payload;
        default:
          return state;
      }
}

export default userList;
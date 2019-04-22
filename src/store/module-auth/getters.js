const loggedUser      = state => state.logged
const isLogged        = state => Boolean(Object.keys(state.logged).length)
const registeredUsers = state => state.users


export {
  isLogged, registeredUsers, loggedUser,
}

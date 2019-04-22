const REGISTER = (state, new_user) => state.users.push(new_user)

const LOGIN = (state, user) => state.logged = user

const LOGOUT = state => state.logged = {}

export {
  REGISTER, LOGIN, LOGOUT,
}

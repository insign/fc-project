const register = ({ commit, getters }, new_user) => {
  return new Promise((resolve, reject) => {
    const exists = Boolean(getters.registeredUsers.find(rU => rU.email == new_user.email))
    if (exists) {
      return reject({ message: 'Sorry, that e-mail is already registered.' })
    }
    commit('REGISTER', new_user)
    return resolve({
                     message: 'Created, please login now',
                     new_user,
                   })
  })
}

const login = ({ commit, getters }, user) => {
  return new Promise((resolve, reject) => {
    const valid_user = getters.registeredUsers.find(rU => rU.email == user.email && rU.password == user.password)
    if (!Boolean(valid_user)) {
      return reject({ message: 'Please, verify your e-mail/password' })
    }
    commit('LOGIN', valid_user)
    resolve({ user: valid_user })
    return
  })
}

const logout = ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit('LOGOUT')
    resolve({ message: 'You have logged out successfully.' })
    return
  })
}

export { register, login, logout }

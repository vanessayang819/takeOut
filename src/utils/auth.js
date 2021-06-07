import vue from 'vue'

const userInfo = 'to-username'

export function getInfo() {
  return vue.$cookies.get(userInfo)
}

export function setInfo(username) {
  return vue.$cookies.set(userInfo, username)
}

export function removeInfo() {
  return vue.$cookies.remove(userInfo)
}
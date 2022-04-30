const email = (email) => {
  const includesAt = email.split('').includes('@')
  const includesDot = email.split('').includes('.')
  if (!includesAt || !includesDot) {
    return false
  }
  const arrAt = email.split('@')
  const validAt = arrAt.length === 2 ? true : false
  const validDot = arrAt[1].split('.').length === 2 ? true : false
  return validAt && validDot

}
const passwords = (password1, password2) => {
  return password1 === password2 ? true : false
}
export default {
  email,
  passwords
}
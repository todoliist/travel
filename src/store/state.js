let defaultCity = 'Vancouver'
// try catch incase browser closed localstorage function
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) { }

export default {
  city: defaultCity
}
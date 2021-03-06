const getEnv = () => {
  if (process.env.NODE_ENV === 'development') return ''
  return `__${process.env.NODE_ENV.toUpperCase()}`
}

module.exports = getEnv

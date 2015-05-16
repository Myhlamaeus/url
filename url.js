import query from 'query.js'

const encode = function (str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (chr) {
    return '%' + chr.charCodeAt(0).toString(16)
  })
}
const Url = Object.freeze(Object.assign(function Url (parts) {
  Object.assign(this, Url.defaults)
  Object.assign(this, parts)

  if (!this.hostname) {
    throw new Error('Url: Hostname has to be specified')
  }
}, {
    defaults: {
      schema: 'http:',
      username: undefined,
      password: undefined,
      hostname: undefined,
      port: 80,
      pathname: '/',
      query: undefined,
      fragment: undefined
    }
  }))

Object.seal(Url.defaults)

Object.freeze(Object.assign(Url.prototype, {
  toString: function () {
    var url = ''

    if (this.schema) {
      url += this.schema
    }

    url += '//'

    if (this.username) {
      url += this.username

      if (this.password) {
        url += ':' + this.password
      }

      url += '@'
    }

    url += this.hostname

    if (this.pathname) {
      url += encode(this.pathname).replace(new RegExp('%' + '/'.charCodeAt(0).toString(16), 'g'), '/')
    } else {
      url += '/'
    }

    if (this.query) {
      let queryString = ''

      if (typeof this.query === 'object') {
        url += '?'
        queryString = query.stringify(this.query)
      } else {
        queryString = String(this.query)

        if (queryString.charAt(0) !== '?') {
          url += '?'
        }
      }

      if (queryString) {
        url += queryString
      }
    }

    if (this.fragment) {
      url += '#' + this.fragment
    }

    return url
  }
}))

export default Url

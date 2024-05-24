const jwt = require('jsonwebtoken')
const { APIError } = require('../../utils/apiError.js')
const { JWT_KEY } = require('../../../../../config')
const { StatusCodes } = require('http-status-codes')
const { createToken } = require('../../utils/createTokens.js')

const refresh = (req, res) => {
  const { refresh } = req.cookies

  if (!refresh)
    throw new APIError(StatusCodes.FORBIDDEN, 'You are not logged in.')

  jwt.verify(refresh, JWT_KEY, (err, decoded) => {
    if (err) {
      res.clearCookie('refresh')
      return res.status(428).json({
        success: false,
        message: "you're session expired please login again.",
      })
    }

    const { _id, role, name } = decoded
    const user = { _id, role, name }

    const { accessToken } = createToken(user)

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'session refreshed.',
      data: { role, name, token: accessToken },
    })
  })
}

const logout = (req, res) => {
  const { refresh } = req.cookies

  if (!refresh)
    throw new APIError(StatusCodes.UNAUTHORIZED, 'You are not logged in.')

  res.clearCookie('refresh', {
    httpOnly: true, // Cookie is accessible only through the HTTP protocol, not JavaScript
    secure: true, // Cookie is only sent over HTTPS
    sameSite: 'none', // Cookie is sent only for same-site requests by default
  })

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'You are Logged Out.',
    data: {},
  })
}

module.exports = { refresh, logout }

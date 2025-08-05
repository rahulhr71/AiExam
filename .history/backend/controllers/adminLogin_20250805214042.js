const { LoginSchema } = require('../validations/validateUser')
const jwt = require('jsonwebtoken')


const adminLogin = (req, res) => {
    const { err, value } = LoginSchema.validate(req.body)
    if (value.email !== process.env.ADMIN_EMAIL || value.password !== process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ email: value.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 24 * 60 * 60 * 1000
        })
        return res.status(400).json({ message: "invalid credentials" })
    }

    if (err) return res.status(400).json({ message: "validation error" })
    return res.status(200).json({ message: "successfull login to teacher panel" })
}
module.exports = adminLogin
const { createContext } = require('react')
const { create } = require('../../../models/teacherSchema')

const router=require('express').Router()

router.post('/createTeacher',createController)
module.exports = router
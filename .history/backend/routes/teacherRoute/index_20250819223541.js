const { route } = require('../dashboardRoute.route');
const User=require('../../models/registerUser')

const router = require('express').Router();
router.get('/allStudents',(req,res)=>{

    User.find({role:"student"})
        .then((students)=>{
            res.status(200).json({
                message:"All Students",
                students:students
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message:"Error fetching students",
                error:err.message
            })
        })
});
module.exports = router;
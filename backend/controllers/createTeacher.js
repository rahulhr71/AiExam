const createController=(req,res)=>{
    // Logic to create a teacher
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    return res.status(201).json({ message: "Teacher created successfully", teacher: { name, email } });

}
module.exports = createController;
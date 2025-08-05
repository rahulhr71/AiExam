const createController=(req,res)=>{
    // Logic to create a teacher
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Here you would typically save the teacher to the database
    // For demonstration, we will just return a success message
    return res.status(201).json({ message: "Teacher created successfully", teacher: { name, email } });

}
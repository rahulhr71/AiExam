const userLogin = (req, res) => {
  return res.status(200).json({ message: "success login" });
};

module.exports = { userLogin }; // ✅ Export as object


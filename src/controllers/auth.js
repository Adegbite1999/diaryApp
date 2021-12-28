const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../configurations/config');
const { register, login } = require('../middlewares/validation')
const jwtGenerator = require('../utils/jwtGenerator')
// Register and Login Route


// Register || SignUp
const signup = async (req, res) => {
    try {
        // 1. Destructure request body
        const { firstname, lastname, email, password } = req.body;
        // 2. validate inputs
        const validateInputs = await register(firstname, lastname, email, password);
        if (validateInputs.message) {
            return res.status(400).json({ message: validateInputs.message });
        }
        // 3. Check if email already exist
        const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExist.rows.length !== 0) {
            return res.status(401).json({ message: 'user already exist' });
        }
        // 4. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *", [firstname, lastname, email, hashPassword]);

        // 5.Jwt sign
        const token = await jwtGenerator(newUser.rows[0].id);
        return res.status(201).json({ status: 'success', data: { token: token, message: 'User created successfully' } });


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }


}

const signin = async (req, res) => {
try {
     // 1. Destructure
     const {email, password} = req.body;

     // 2. validate inputs
    const validateInputs = await login(email, password);
    if(validateInputs.message){
        return res.status(400).json({ message: validateInputs.message });
    }
    // 3. check if user doesn't exist
    const user = await pool.query("SELECT * FROM users WHERE email =$1", [email]);
    if(user.rows === 0){
        return res.status(401).json({ message: "Password or Email is incorrect"});
    }
     // 3. compare password
 const validPassword = await bcrypt.compare(password, user.rows[0].password);

 if(!validPassword){
     return res.status(401).json({ message: "Password or Email is incorrect"});
 }

     // jwt.sign
     const token = await jwtGenerator(user.rows[0].id);
     return res.status(201).json({ status: 'success', data: { token: token} });
} catch (error) {
    console.error(error)
}
}

module.exports = { signup, signin }

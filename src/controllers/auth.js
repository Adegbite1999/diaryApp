const bcrypt = require('bcrypt');
const pool = require('../configurations/config');
const { register, login } = require('../middlewares/validation');
const jwtGenerator = require('../utils/jwtGenerator');
// Register and Login Route


// Register || SignUp
const signup = async (req, res) => {
    try {
        // 1. Destructure request body
        const { firstname, lastname, email, password } = req.body;
        // 2. validate there is no empty field
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: 'Missing Credentials!' })
        }
        // 3. validate inputs
        const validateInputs = await register(firstname, lastname, email, password);
        if (validateInputs.message) {
            return res.status(400).json({ message: validateInputs.message });
        }
        // 4. Check if email already exist
        const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExist.rows.length !== 0) {
            return res.status(401).json({ message: 'user already exist' });
        }
        // 5. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *", [firstname, lastname, email, hashPassword]);

        // 6.Jwt sign
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
        const { email, password } = req.body;
        //  2. validate there's no empty fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing Credentials!' })
        }
        // 3. validate inputs
        const validateInputs = await login(email, password);
        if (validateInputs.message) {
            return res.status(400).json({ message: validateInputs.message });
        }
        // 4. check if user doesn't exist
        const user = await pool.query("SELECT * FROM users WHERE email =$1", [email]);
        if (user.rows === 0) {
            return res.status(401).json({ message: "Password or Email is incorrect" });
        }
        // 5. compare password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).json({ message: "Password or Email is incorrect" });
        }

        // 6.jwt.sign
        const token = await jwtGenerator(user.rows[0].id);
        return res.status(200).json({ status: 'success', data: { token: token } });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

// const isVerified =  async (req, res) => {
//     try {
//         res.json({ message: "Welcome to my dashboard!" })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({message: 'Server error'})
//     }
// }


// user dashboard

// Fetch user dashboard information

const dashboard = async (req, res) => {
    try {
        const Query = "SELECT * FROM users WHERE id =$1"
        const value = [req.user]
        const data = await pool.query(Query, value);
        if (!data) {
            return res.status(403).json({ message: 'unauthorized !' })
        }
        return res.status(200).json({ message: data.rows[0] })
    } catch (error) {
        return res.status(403).json({ message: 'unauthorized!' })
    }
}
// 
const updateProfile = async (req, res) => {
const findQuery = `SELECT * FROM users WHERE id= $1`
        const id = req.params.id;
        try {
            const formerProfile = await pool.query(findQuery, [id])
            if(!formerProfile.rows.length){
                return res.status(404).json({message:'User not found'})
            }

            const formerProfileToUpdate = formerProfile.rows[0];
            const salt = await bcrypt.genSalt(10);
            const firstname = req.body.firstname || formerProfileToUpdate.firstname;
            const email = req.body.email || formerProfileToUpdate.email;
            const lastname = req.body.lastname || formerProfileToUpdate.lastname;
            const password = await bcrypt.hash(req.body.password, salt) || formerProfileToUpdate.password;
            const updatequery = `UPDATE users SET firstname = $1, lastname = $2, email = $3, password = $4 WHERE id= $5 RETURNING *`
            const values = [firstname,lastname, email, password, id]
            const newProfile = await pool.query(updatequery,values)
            return res.status(200).json({data:newProfile.rows, message:"Profile Successfully updated"})
        } catch (error) {
            console.log(error)
            return res.status(404).json({message: error})
        }
}

module.exports = { signup, signin, dashboard, updateProfile }

const pool = require('../configurations/config')



// Diary Logic
// GET all database entry
const getAllEntry = async (req, res) => {
    try {
        const Query = "SELECT * FROM diary WHERE user_id = $1"
        const value = [req.user]
        const data = await pool.query(Query, value);
        if (data.rows.length === 0) {
            return res.status(401).json({ message: "No entry found" })
        }
        res.status(200).json({ status: 'success', data: data.rows })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

// GET entry by id
const getOneEntry = async (req, res) => {
    try {
        const Query = "SELECT * FROM diary WHERE id = $1 AND user_id = $2"
        const value = [req.params.id, req.user]
        const data = await pool.query(Query, value)
        if (!data.rows[0]) {
            return res.status(404).json({ message: "No entry found" })
        }
        return res.status(200).json({ status: 'success', data: data.rows[0] })
    } catch (error) {

        return res.status(500).json({ message: error })
    }
}

// POST new diary entry

const addNewEntry = async (req, res) => {
    try {
        const Query = "INSERT INTO diary (title, description, user_id) VALUES($1, $2, $3) RETURNING *"
        const value = [req.body.title, req.body.description, req.user]
        const data = await pool.query(Query, value);
        return res.status(201).json({ status: 'success', data: { id: data.rows[0].id, message: "entry successfully created", title: data.rows[0].title, description: data.rows[0].description } })
    } catch (error) {

        return res.status(500).json({ message: error })
    }
}


// PUT => modify/ Update entry by id
const updateEntry = async (req, res) => {
    try {
        const Query = "SELECT * FROM diary WHERE id = $1 AND user_id = $2"
        const value = [req.params.id, req.user]
        const updateQuery = "UPDATE diary SET title = $1, description =$2 WHERE id = $3 AND user_id = $4 RETURNING *"
        const updateValue = [req.body.title, req.body.description, req.params.id, req.user]
        const { rows } = await pool.query(Query, value);
        if (!rows[0]) {
            return res.status(400).res.json({ message: "Entry not found" })
        }
        const data = await pool.query(updateQuery, updateValue);
        return res.status(201).json({ status: 'success', data: { message: 'entry successfully edited', id: data.rows[0].id, title: data.rows[0].title, description: data.rows[0].description } })
    } catch (error) {

        return res.status(500).json({ message: error })
    }
}
// DELETE => delete entry by id

const deleteEntry = async (req, res) => {
    try {
        const deleteQuery = "DELETE FROM diary WHERE id = $1 AND user_id = $2 RETURNING *"
        const deleteValue = [req.params.id, req.user]
        const { rows } = await pool.query(deleteQuery, deleteValue);
        if (!rows[0]) {
            return res.status(400).res.json({ message: "Entry not found" })
        }
        return res.status(201).json({ status: 'success', data: { message: 'entry successfully deleted' } })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


module.exports = { addNewEntry, getAllEntry, getOneEntry, updateEntry, deleteEntry, }
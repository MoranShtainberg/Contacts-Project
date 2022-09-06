const router = require("express").Router();
const { myQuery } =require("../db")

//   '/api/delete_user'

router.delete('/', async (req, res)=> {
    try {
        const { id } = req.body;
        await myQuery(`DELETE FROM users WHERE id = ${id}`);
        res.status(200).send();

    } catch (error) {
       res.status(500).send(error);
    }
});

module.exports = router;
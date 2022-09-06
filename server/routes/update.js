const router = require("express").Router();
const { myQuery } =require("../db")

//   '/api/update'

router.post('/', async (req, res)=> {
    try {
        const { fullName, phone, title, id, pic } = req.body;

        await myQuery(`UPDATE users 
                       SET fullName = "${fullName}", phone = "${phone}", title = "${title}", concat = "${fullName +" " + phone}", pic = "${pic}" WHERE id = ${id}`);
        res.status(201).send();

    } catch (error) {
       console.log(error);
       res.status(500).send(error);
    }
});

module.exports = router;
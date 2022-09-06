const router = require("express").Router();
const { myQuery } =require("../db")

//  '/api/create'

router.post('/', async (req, res)=> {
    try {
        const { fullName, phone, title, pic } = req.body;

        await myQuery(`INSERT INTO users (fullName,phone,title,concat,pic) VALUES ("${fullName}", "${phone}", "${title}", "${fullName +" " + phone}","${pic}")`);
        res.status(201).send();

    } catch (error) {
       console.log(error);
       res.status(500).send(error);
    }
});

module.exports = router;
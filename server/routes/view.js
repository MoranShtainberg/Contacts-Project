const router = require("express").Router();
const { myQuery } =require("../db")

//  '/api/get_all'

router.get('/', async (req, res)=> {
    try {
        const get_all = await myQuery("SELECT * FROM onetest.users");
        //console.log(get_all)
        res.send(get_all);
    } catch (error) {
        console.log(error);
        res.status(500).send;
    }
});
// ----------------------------------------------
router.get('/:id', async (req, res)=> {
    try {
        const singleContactData = await myQuery(`SELECT * FROM onetest.users where id =${req.params.id}`);
        console.log(singleContactData)
        res.send(singleContactData);
    } catch (error) {
        console.log(error);
        res.status(500).send;
    }
});

module.exports = router;
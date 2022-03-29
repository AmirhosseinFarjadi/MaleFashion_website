const express = require('express');

const router = express.Router();

router.get("/",(req,res) => {
    res.render("./partials/contact");
})


module.exports = router;
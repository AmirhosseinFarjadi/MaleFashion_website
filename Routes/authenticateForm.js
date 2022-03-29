const express = require('express');

const router = express.Router();

router.get("/",(req,res) => {
    res.render("./partials/authenticateForm");
})


module.exports = router;
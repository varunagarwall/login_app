const express=require('express');
const passport = require('passport');

const router =express.Router();
const postAPi=require('../../../controllers/api/v1/posts_api');

router.get('/',postAPi.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),postAPi.destroy);

module.exports=router;   
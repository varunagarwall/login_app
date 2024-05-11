const express=require('express');

const router =express.Router();
const postAPi=require('../../../controllers/api/v1/posts_api');

router.get('/',postAPi.index);
router.delete('/:id',postAPi.destroy);

module.exports=router;   
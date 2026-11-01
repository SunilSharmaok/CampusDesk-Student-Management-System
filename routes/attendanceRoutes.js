const router=require('express').Router(); const c=require('../controllers/attendanceController');
router.get('/',c.list); router.post('/',c.save); router.delete('/:id',c.remove); module.exports=router;

const express = require('express');
const app = express();
const router = express.Router();
const path = "C:/Users/suraj/interviewBit/Assignment/TODO/views/"

let options = {
	root : path
}
router.get('/', (req,res) =>{
	res.sendFile('todo.html',options);
});
router.get('/drag',function(reg,res,next){
	res.sendFile('drag.html',options);
});
module.exports = router;
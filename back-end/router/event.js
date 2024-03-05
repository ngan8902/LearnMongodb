const router = require('express').Router();

const eventController = require('../controller/event.controller');

//ADD EVENT
router.post("/", eventController.addEvent);

//GET EVENT
router.get("/", eventController.getAllEvent);

//GET AN EVENT
router.get("/:id", eventController.getAnEvent);

//UPDATE EVENT
router.put("/:id", eventController.updateEvent);

//DELETE EVENT
router.delete("/:id", eventController.deletedEvent);


module.exports = router;
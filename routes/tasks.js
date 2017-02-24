var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://holly:holly@ds161179.mlab.com:61179/mytasklist_holly', ['tasks']);

//set router for home page
//get all tasks
router.get('/tasks', function(req, res, next){
  db.tasks.find(function(err, tasks){
    if(err){
      res.send(err);
    }
    res.json(tasks);
  });
});

//get single tasks
router.get('/tasks/:id', function(req, res, next){
  db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
    if(err){
      res.send(err);
    }
    res.json(task);
  });
});

//save tasks (handle post request)
router.post('/tasks', function(req, res, next){
  var task = req.body; //get task from form
  if(!task.title || !(task.isDone + '')){
      res.status(400);
      res.json({
        "error": "bad data"
      });
  } else {
    db.tasks.save(task, function(err, task){
      if(err){
        res.send(err);
      }
      res.json(task);
    });
  }
});

//delete a task
router.delete('/tasks/:id', function(req, res, next){
  db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
    if(err){
      res.send(err);
    }
    res.json(task);
  });
});

//update task
router.put('/tasks/:id', function(req, res, next){
  var task = req.body;
  var updTask = {};

  if(task.isDone){
    updTask.isDone = task.isDone;
  }

  if(task.title){
    updTask.title = task.title;
  }

  if(!updTask){
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  } else {
    db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task){
      if(err){
        res.send(err);
      }
      res.json(task);
    });

  }
});


module.exports = router ;

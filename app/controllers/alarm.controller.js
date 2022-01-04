'use strict';
const firebase = require('../config/db');

// create alarm 
const addAlarm = async (req, res, next) => {
  try {
    const data = req.body;

    if(!data.title){
      res.send({
        'status': false,
        'code': 422,
        'message': 'title field required',
      });
    }else if(!data.date){
      res.send({
        'status': false,
        'code': 422,
        'message': 'date field required',
      });
    }else if(!data.time){
      res.send({
        'status': false,
        'code': 422,
        'message': 'time field required',
      });
    }else if(!data.day){
      res.send({
        'status': false,
        'code': 422,
        'message': 'day field required',
      });
    }

    var dataArray = {
      'title': data.title,
      'date': data.date,
      'time': data.time,
      'day': data.day,
      'description': data.description,
      'active': (data.active !== undefined) ? data.active : 1,
    }

    var response = await firebase.collection('alarm').doc().set(dataArray);
    if (response) {
      var dataObj = {
        'status': true,
        'code': 200,
        'message': 'Success, Alarm has been created',
        'data': []
      };
    } else {
      var dataObj = {
        'status': false,
        'code': 202,
        'message': 'Sorry, Alarm has been not created',
        'data': []
      };
    }
  } catch (error) {
    var dataObj = {
      'status': false,
      'code': 500,
      'message': error.message || "Some error occurred while creating the Alarm.",
      'data': []
    };
  }
  res.send(dataObj);
};

const getAllAlarm = async (req, res, next) => {
  try {
    const alarms = await firebase.collection('alarm');
    const data = await alarms.get();
    // console.log('data',data);
    const alarmsArray = [];
    if (data.empty) {
      var dataObj = {
        'status': false,
        'code': 404,
        'message': 'Sorry,Alarm data not found',
        'data': alarmsArray
      };
    
    } else {
      data.forEach(doc => {
        const alarm = {
          'id': doc.id,
          'title': doc.data().title,
          'date': doc.data().date,
          'time': doc.data().time,
          'day': doc.data().day,
          'description': doc.data().description,
          'active': doc.data().active
        }
        alarmsArray.push(alarm);
      });

      var dataObj = {
        'status': true,
        'code': 200,
        'message': 'Success, Alarm listing',
        'data': alarmsArray
      };
    }
  } catch (error) {
    var dataObj = {
      'status': false,
      'code': 500,
      'message': error.message || "Some error occurred while retrieving alarm data.",
      'data': []
    };
  }
  res.send(dataObj);
}

const getAlarm = async (req, res, next) => {
  try {
    const id = req.params.alarmId;
    const alarm = await firebase.collection('alarm').doc(id);
    const data = await alarm.get();
    if (!data.exists) {
      var dataObj = {
        'status': false,
        'code': 404,
        'message': `Not found Alarm data with id ${req.params.alarmId}.`,
        'data': []
      };
      
    } else {
      var dataObj = {
        'status': true,
        'code': 200,
        'message': "Success,Alarm data",
        'data': data.data()
      };
      
    }
  } catch (error) {
    var dataObj = {
      'status': false,
      'code': 500,
      'message': error.message || "Some error occurred while retrieving alarm data.",
      'data': []
    };
  }
  res.send(dataObj);
}

const deleteAlarm = async (req, res, next) => {
  try {
    const id = req.params.alarmId;
    var response = await firebase.collection('alarm').doc(id).delete();
    if (response) {
      var dataObj = {
        'status': true,
        'code': 200,
        'message': "Success,Remove alarm data",
        'data': []
      };
    } else {
      var dataObj = {
        'status': false,
        'code': 404,
        'message': `Sorry,Not found Alarm with id ${req.params.alarmId}.`,
        'data': []
      };
    }

  } catch (error) {
    var dataObj = {
      'status': false,
      'code': 500,
      'message': error.message || "Some error occurred while creating the Alarm.",
      'data': []
    };
  }
  res.send(dataObj);
}

const deleteAllAlarm = async (req, res, next) => {
  try {
    var response = await firebase.collection('alarm');
    response.onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        response.doc(doc.id).delete()
      })
    })
    var dataObj = {
      'status': true,
      'code': 200,
      'message': "Success,Delete all alarm data",
      'data': []
    };
  } catch (error) {
    var dataObj = {
      'status': false,
      'code': 500,
      'message': error.message || "Some error occurred while removing all alarm.",
      'data': []
    };
  }
  res.send(dataObj);
}

const updateAlarm = async (req, res, next) => {
  try {
    const id = req.params.alarmId;
    const data = req.body;

    if(!data.title){
      res.send({
        'status': false,
        'code': 422,
        'message': 'title field required',
      });
    }else if(!data.date){
      res.send({
        'status': false,
        'code': 422,
        'message': 'date field required',
      });
    }else if(!data.time){
      res.send({
        'status': false,
        'code': 422,
        'message': 'time field required',
      });
    }else if(!data.day){
      res.send({
        'status': false,
        'code': 422,
        'message': 'day field required',
      });
    }

    var dataArray = {
      'title': data.title,
      'date': data.date,
      'time': data.time,
      'day': data.day,
      'description': data.description,
      'active': data.active ? data.active : 0,
    }

    const alarmData = await firebase.collection('alarm').doc(id);
    var response = await alarmData.update(dataArray);

    if (response) {
      var dataObj = {
        'status': true,
        'code': 200,
        'message': "Success,Update alarm data",
        'data': []
      };
    } else {
      var dataObj = {
        'status': false,
        'code': 500,
        'message': "Error updating Alarm with id " + req.params.alarmId,
        'data': []
      };
    }
  } catch (error) {
    var dataObj = {
      'status': false,
      'code': 500,
      'message': error.message || "Some error occurred while creating the Alarm.",
      'data': []
    };
  }
  res.send(dataObj);
}

module.exports = {
  addAlarm: addAlarm,
  getAllAlarm: getAllAlarm,
  getAlarm: getAlarm,
  deleteAlarm: deleteAlarm,
  deleteAllAlarm: deleteAllAlarm,
  updateAlarm: updateAlarm
}

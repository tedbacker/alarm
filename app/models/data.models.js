const sql = require("../config/db");

// constructor
const Alarm = function(alarm) {
  this.title = alarm.title;
  this.description = alarm.description;
  this.date = alarm.date;
  this.time = alarm.time;
  this.day = alarm.day;
  this.active = alarm.active ? alarm.active : 0;
};

Alarm.create = (newData, result) => {
  sql.query("INSERT INTO data SET ?", newData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created alarm data: ", { id: res.insertId, ...newData });
    result(null, { id: res.insertId, ...newData });
  });
};

Alarm.findById = (id, result) => {
  sql.query(`SELECT * FROM data WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found alarm data: ", res[0]);
      
      var data = {
        'status' : true,
        'code' : 200,
        'data' : res[0]
      };
      result(null, data);
      return;
    }

    // not found Alarm data with the id
    result({ kind: "not_found" }, null);
  });
};

Alarm.getAll = (result) => {
  let query = "SELECT * FROM data";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("alarm get all: ", res);
    result(null, res);
  });
};

Alarm.updateById = (id, data, result) => {
  sql.query(
    "UPDATE data SET title = ?, description = ?, date = ?, time = ?, day = ?, active = ? WHERE id = ?",
    [data.title, data.description, data.date, data.time, data.day, data.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Alarm with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated alarm: ", { id: id, ...data });
      result(null, { id: id, ...data });
    }
  );
};

Alarm.remove = (id, result) => {
  sql.query("DELETE FROM data WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Alarm data with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted alarm data with id: ", id);
    var data = {
        'status' : true,
        'code' : 200,
        'data' : [],
        'message' : 'Alarm was deleted successfully!'
    };
    result(null, data);
  });
};

Alarm.removeAll = result => {
  sql.query("DELETE FROM data", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} data`);
    var data = {
        'status' : true,
        'code' : 200,
        'data' : res,
        'message' : 'All Alarm data were deleted successfully!'
    };
    result(null, data);
  });
};

module.exports = Alarm;

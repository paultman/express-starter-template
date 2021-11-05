/**
 * @module task
 */

module.exports.init = async (config, logger, db) => {
  this.tasksCol = db.collection('tasks');
};

/**
 * @public
 * @function getTask
 * @name GET /tasks/:id
 * @description Takes a taskID from the path of the request and returns a task of the same ID
 * @param {Object} req Express request with :id in path
 * @param {Object} res Call json method on request to return requested task in JSON format
 * @returns {undefined}
 */
module.exports.get = (req, res) => {
  const taskID = parseInt(req.params.id, 10);
  this.tasksCol
    .findOne({ _id: taskID })
    .then((record) => {
      if (record) res.json(record);
      else res.json({});
    })
    .catch((err) => res.json(err));
};

/**
 * Get all tasks in database, regardless of state or ID
 * @name GET /tasks/all
 * @param {Object} req Express request
 * @param {Object} res Call json method on request to return all tasks in JSON format
 * @returns {undefined}
 */
module.exports.getAll = (req, res) => {
  this.tasksCol
    .find({})
    .toArray()
    .then((results) => res.json(results))
    .catch((err) => res.json(err));
};

/**
 * @public
 * @function create
 * @name POST /tasksget
 * @description Takes a JSON object and creates a new task
 * @param {Object} req Express request with a JSON body
 * @param {Object} res Return an empty object on success, else error message
 * @returns {undefined}
 */
module.exports.create = (req, res) => {
  const newTask = req.body;
  this.tasksCol
    .insertOne(newTask)
    .then((record) => {
      if (record) res.json(record);
      else res.json({ err: 'unable to create record' });
    })
    .catch((err) => res.json(err));
};

/**
 * @public
 * @function update
 * @name POST /tasks/:id
 * @description Takes a taskID from the path of the request and updates record passed on req body
 * @param {Object} req Express request with task to be updated and updated field
 * @param {Object} res Return an empty object on success, else error message
 * @returns {undefined}
 */
module.exports.update = (req, res) => {
  const taskID = parseInt(req.params.id, 10);
  this.tasksCol
    .updateOne({ _id: taskID }, { $set: { state: req.body.state } })
    .then((result) => {
      if (record) res.json(result);
      else res.json({});
    })
    .catch((err) => res.json(err));
};

/**
 * @public
 * @function delete
 * @name DELETE /tasks/:id
 * @description Takes a taskID from the path of the request and deletes that record
 * @param {Object} req Express request with :id in path
 * @param {Object} res Call json method on request to return requested task in JSON format
 * @returns {undefined}
 */
module.exports.delete = (req, res) => {
  const taskID = parseInt(req.params.id, 10);
  this.tasksCol
    .deleteOne({ _id: taskID })
    .then((result) => {
      res.json({ result: `${result.deletedCount} deleted` });
    })
    .catch((err) => res.json(err));
};

/**
 * @module task
 */

const tasks = {
  1: { descr: 'call Nick for upcoming birthday', state: 'open' },
  2: { descr: 'check travel requirements for Chile', state: 'open' },
  3: { descr: 'finish TPS report', state: 'done' },
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
module.exports.getTask = (req, res) => res.json(tasks[req.params.id]);

/**
 * Get all tasks in database, regardless of state or ID
 * @name GET /tasks/all
 * @param {Object} req Express request
 * @param {Object} res Call json method on request to return all tasks in JSON format
 * @returns {undefined}
 */
module.exports.getAllTasks = (req, res) => res.json(tasks);

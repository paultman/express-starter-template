/**
 * @module users
 */

const bcrypt = require('bcrypt');
const path = require('path');

module.exports.init = async (config, logger, db) => {
  this.userCol = db.collection('users');
};

/**
 * @public
 * @function enter
 * @name POST /enter
 * @description takes a form as input and either registeres a new user or saves user ref to session
 * @param {Object} req Express request with form elements in body of post
 * @param {Object} res return set cookie or error message
 * @returns {undefined}
 */

module.exports.enter = async (req, res) => {
  if (req.body.action === 'register') {
    const user = {
      email: req.body.email,
      passHash: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    };
    const ref = await this.userCol.insertOne(user);
    // if (!req.session) req.session = {};
    req.session.ref = ref.insertedId.toString();
    res.sendFile(path.join(req.app.locals.projDir, '/dist/tasks.html'));
  } else {
    const record = await this.userCol.findOne({ email: req.body.email });
    if (record === null) {
      res.status('401').json({ msg: `no record found with email ${req.body.email}` });
    } else if (!bcrypt.compareSync(req.body.password, record.passHash)) {
      res.status('403').json({ msg: 'wrong password' });
    } else {
      req.session.ref = record._id.toString();
      res.sendFile(path.join(req.app.locals.projDir, '/dist/tasks.html'));
    }
  }
};

/**
 * @public
 * @function logout
 * @name get /logout
 * @description this function simply clears a httponly cookie from the client by setting it to empty string
 * @param {Object} req Express request
 * @param {Object} res empty body but cookie middleware sets response header
 * @returns {undefined}
 */

module.exports.logout = async (req, res) => {
  req.session = null;
  res.sendFile(path.join(req.app.locals.projDir, '/dist/index.html'));
};

const router = require('express').Router();
const { getUsers, getUserById, postUsers, putUsersByID, patchUsersByID, deleteUserById } = require('../controllers/usersController');


/**
 * get single user by id or email
 * @method GET
 */
router.get('/:userID', getUserById);


/**
 * update users by id or email
 * @method PUT
 */
router.put('/:userID', putUsersByID);
/**
 * update single user by id or email
 * @method patch
 */
router.patch('/:userID', patchUsersByID);

/**
 * delete single user by id or email
 * @method delete
 */
router.delete('/:userID', deleteUserById);


/**
 * GET all users , including 
 *  - filter
 *  - sort
 *  - pagination
 *  - selected property
 *  @route /api/v1/users?sort=['by','name]
 *  @method GET
 *  @visibility private
 */
router.get('/', getUsers);

/**
 * create new user
 */
router.post('/', postUsers);

module.exports = router;
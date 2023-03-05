import expressPromise from 'express-promise-router';

import { userController } from '../controllers';

const router = expressPromise();

router.route('/').get(userController.getUsers);
router.route('/profile').get(userController.getUserProfile);
router.route('/logout').post(userController.logoutUser);

export const userRoutes = router;

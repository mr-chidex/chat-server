import expressPromise from 'express-promise-router';

import { userController } from '../controllers';
import { authMiddleware } from '../middlewares';

const router = expressPromise();

router.route('/').get(authMiddleware.auth, userController.getUsers);
router.route('/profile').get(authMiddleware.auth, userController.getUserProfile);
router.route('/logout').post(authMiddleware.auth, userController.logoutUser);

export const userRoutes = router;

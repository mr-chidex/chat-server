import expressPromise from 'express-promise-router';

import { chatController } from '../controllers';
import { authMiddleware } from '../middlewares';

const router = expressPromise();

router
  .route('/')
  .get(authMiddleware.auth, chatController.getAllChats)
  .post(authMiddleware.auth, chatController.postChat);

router
  .route('/:chatId')
  .patch(authMiddleware.auth, chatController.updateChat)
  .delete(authMiddleware.auth, chatController.deleteChat);

export const chatRoutes = router;

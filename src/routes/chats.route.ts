import expressPromise from 'express-promise-router';

import { chatController } from '../controllers';

const router = expressPromise();

router
  .route('/')
  .get(chatController.getAllChats)
  .post(chatController.postChat)
  .patch(chatController.updateChat)
  .delete(chatController.deleteChat);

export const chatRoutes = router;

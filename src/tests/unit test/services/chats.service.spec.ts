import { Chat } from '../../../entities/Chat';
import { chatService } from '../../../services';
import { mockChat, mockUser } from '../../mocks';
import io from '../../../socket';

describe('ChatService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('validateParams', () => {
    it('should throw error if details are not correct', async () => {
      expect(chatService.validateParams.bind(this, { message: '' })).toThrow();
    });

    it('should return undefined on successfully validating params', () => {
      const response = chatService.validateParams(mockChat);

      expect(response).toBeUndefined();
    });
  });

  describe('addChat', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should create chat', async () => {
      const save = jest.fn();
      Chat.create = jest.fn().mockReturnValue({ save });
      const emit = jest.fn();
      io.getIO = jest.fn().mockReturnValue({ emit });

      expect(save).not.toHaveBeenCalled();
      expect(Chat.create).not.toHaveBeenCalled();

      const response = await chatService.addChat(mockUser, mockChat);

      expect(save).toHaveBeenCalled();
      expect(Chat.create).toHaveBeenCalled();
      expect(response.success).toEqual(true);
    });
  });

  describe('getChats', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should return all chats', async () => {
      Chat.find = jest.fn().mockResolvedValue([mockChat]);

      const response = await chatService.getChats();

      expect(response.data).toEqual([mockChat]);
    });
  });

  describe('updateChat', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should throw error if chat is not found', async () => {
      chatService.validateParams = jest.fn().mockReturnValue(null);
      Chat.findOne = jest.fn().mockResolvedValue(null);

      expect(chatService.updateChat(mockUser, mockChat, '1')).rejects.toThrow('Chat not found: Cannot update');
    });

    it('should update chat', async () => {
      chatService.validateParams = jest.fn().mockReturnValue(null);
      const save = jest.fn();
      Chat.findOne = jest.fn().mockReturnValue({ ...mockChat, save });
      const emit = jest.fn();
      io.getIO = jest.fn().mockReturnValue({ emit });

      const response = await chatService.updateChat(mockUser, mockChat, '1');

      expect(response.success).toEqual(true);
      expect(save).toHaveBeenCalled();
    });
  });

  describe('removeChat', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should throw error if chat is not found', async () => {
      chatService.validateParams = jest.fn().mockReturnValue(null);
      Chat.findOne = jest.fn().mockResolvedValue(null);

      expect(chatService.removeChat(mockUser, '1')).rejects.toThrow('Chat not found: Cannot delete');
    });

    it('should update chat', async () => {
      chatService.validateParams = jest.fn().mockReturnValue(null);
      const remove = jest.fn();
      Chat.findOne = jest.fn().mockResolvedValue({ ...mockChat, remove });
      const emit = jest.fn();
      io.getIO = jest.fn().mockReturnValue({ emit });

      const response = await chatService.removeChat(mockUser, '1');

      expect(response.success).toEqual(true);
      expect(remove).toHaveBeenCalled();
    });
  });
});

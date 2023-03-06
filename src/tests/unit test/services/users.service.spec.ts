import { User } from '../../../entities/User';
import { userService } from '../../../services';
import { mockUser } from '../../mocks';

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('getProfile', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should return user details', async () => {
      User.findOne = jest.fn().mockResolvedValue(mockUser);

      const response = await userService.getProfile(mockUser);

      expect(response.success).toBe(true);
      expect(response.data).toEqual(mockUser);
    });
  });

  describe('getUsers', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should return all users', async () => {
      User.find = jest.fn().mockResolvedValue([mockUser]);

      const response = await userService.getUsers(mockUser);

      expect(response.success).toBe(true);
      expect(response.data).toEqual([mockUser]);
    });
  });

  describe('logout', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should throw error on invalid user', async () => {
      User.findOneBy = jest.fn().mockResolvedValue(null);

      expect(userService.logout(mockUser)).rejects.toThrow();
    });

    it('should logout user', async () => {
      const save = jest.fn();
      User.findOneBy = jest.fn().mockResolvedValue({ ...mockUser, save });

      expect(save).not.toHaveBeenCalled();

      const response = await userService.logout(mockUser);

      expect(response.message).toBe('logout successful');
      expect(save).toHaveBeenCalled();
    });
  });
});

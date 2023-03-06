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
    it('should return user details', async () => {
      User.findOne = jest.fn().mockResolvedValue(mockUser);

      const response = await userService.getProfile(mockUser);

      expect(response.success).toBe(true);
      expect(response.data).toEqual(mockUser);
    });
  });
});

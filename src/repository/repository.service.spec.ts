import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryModule } from './repository.module';
import { RepositoryService } from './repository.service';

describe('RepositoryService', () => {
  let service: RepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RepositoryModule],
    }).compile();

    service = module.get<RepositoryService>(RepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('given a admin user was created', () => {
    const adminUser = {
      name: 'John Doe',
      email: 'test@test.com',
      isAdmin: true,
    };

    it('should return the admin user', () => {
      const createdUser = service.createUser(adminUser);

      expect(createdUser).toHaveProperty('id');
      expect(createdUser.isAdmin).toBe(true);
    });
  });

  // TODO: Add more tests
});

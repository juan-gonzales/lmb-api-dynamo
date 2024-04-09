import PersonService from '../../src/services/PersonService';
import { IModel, IRepository } from '../../src/interfaces';

describe('PersonService', () => {
  let mockDynamoRepository: IRepository;
  let mockApiRepository: IRepository;
  let personService: PersonService;

  beforeEach(() => {
    mockDynamoRepository = {
      findData: jest.fn(),
      saveData: jest.fn(),
    };
    mockApiRepository = {
      findData: jest.fn(),
      saveData: jest.fn(),
    };
    personService = new PersonService(mockDynamoRepository, mockApiRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data by DNI', async () => {
    const mockDni = '123456789';
    const mockData: IModel = { firstName: 'John Doe', lastName: 'Doe', dni: '12345678' };

    (mockApiRepository.findData as jest.Mock).mockResolvedValue(mockData);
    (mockDynamoRepository.saveData as jest.Mock).mockResolvedValue(mockData);

    const result = await personService.fetchDataByDni(mockDni);

    expect(mockApiRepository.findData).toHaveBeenCalledWith({ dni: mockDni });
    expect(mockDynamoRepository.saveData).toHaveBeenCalledWith(mockData);
    expect(result).toEqual(mockData);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Repository } from 'typeorm';
import { UpsertProductDTO } from './dto/upsert-product.dto';
import { NotFoundException } from '@nestjs/common';

// coverage

describe('ProductsService - update', () => {
  let service: ProductsService;
  let repo: Repository<Product>;

  const mockRepository = {
    findOne: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
    jest.clearAllMocks();
  });

  it('deve atualizar um produto existente', async () => {
    // DTO completo com todos os campos do UpsertProductDTO
    const dto: UpsertProductDTO = {
      name: 'Camiseta Preta',
      description: 'Camiseta 100% algodão, tamanho único',
      price: 49.9,
      image_url: 'https://meusite.com/imagens/camiseta_preta.png',
      stock: 150,
    };

    const productFound = {
      id: 1,
      name: 'Camiseta Antiga',
      description: 'Descrição antiga',
      price: 39.9,
      image_url: 'https://meusite.com/imagens/camiseta_antiga.png',
      stock: 100,
    };

    // Mock: retorna produto encontrado
    mockRepository.findOne.mockResolvedValue(productFound);

    // Mock: simula a atualização
    mockRepository.update.mockResolvedValue({ affected: 1 });

    // Executa o método update
    const result = await service.update(1, dto);

    // Verificações
    expect(result).toEqual({ message: 'Produto Atualizado!' });
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockRepository.update).toHaveBeenCalledWith(1, dto);
  });

  it('deve lançar NotFoundException se produto não existir', async () => {
    const dto: UpsertProductDTO = {
      name: 'Camiseta Preta',
      description: 'Camiseta 100% algodão, tamanho único',
      price: 49.9,
      image_url: 'https://meusite.com/imagens/camiseta_preta.png',
      stock: 150,
    };

    // Mock: produto não encontrado
    mockRepository.findOne.mockResolvedValue(undefined);

    // Verifica que lança NotFoundException
    await expect(service.update(99, dto)).rejects.toThrow(NotFoundException);

    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 99 } });
    expect(mockRepository.update).not.toHaveBeenCalled();
  });
});

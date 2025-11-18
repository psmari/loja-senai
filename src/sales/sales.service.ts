import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { SaleProduct } from './entities/sale-product.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Product } from '../products/entities/products.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepo: Repository<Sale>,

    @InjectRepository(SaleProduct)
    private readonly saleProductRepo: Repository<SaleProduct>,

    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,

    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateSaleDto) {
    const customer = await this.customerRepo.findOneBy({ id: dto.customerId });
    const employee = await this.employeeRepo.findOneBy({ id: dto.employeeId });

    if (!customer) throw new NotFoundException('Customer not found');
    if (!employee) throw new NotFoundException('Employee not found');

    const sale = this.saleRepo.create({ customer, employee, total: 0 });
    const savedSale = await this.saleRepo.save(sale);

    let total = 0;

    // Criar itens
    for (const item of dto.items) {
      const product = await this.productRepo.findOneBy({ id: item.productId });
      if (!product) continue;

      const saleProduct = this.saleProductRepo.create({
        sale: savedSale,
        product,
        unitValue: item.unitValue,
        quantity: item.quantity,
      });

      total += item.unitValue * item.quantity;
      await this.saleProductRepo.save(saleProduct);
    }

    savedSale.total = total;
    return this.saleRepo.save(savedSale);
  }

  async findAll() {
    return this.saleRepo.find({
      relations: ['customer', 'employee', 'items', 'items.product'],
    });
  }

  async findOne(id: number) {
    const sale = await this.saleRepo.findOne({
      where: { id },
      relations: ['customer', 'employee', 'items', 'items.product'],
    });

    if (!sale) throw new NotFoundException(`Sale #${id} not found`);
    return sale;
  }

  async update(id: number, dto: UpdateSaleDto) {
    const sale = await this.findOne(id);
    Object.assign(sale, dto);
    return this.saleRepo.save(sale);
  }

  async remove(id: number) {
    const res = await this.saleRepo.delete(id);
    if (res.affected === 0)
      throw new NotFoundException(`Sale #${id} not found`);
  }
}

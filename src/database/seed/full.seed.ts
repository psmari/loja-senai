// src/database/seeds/full.seed.ts
import { DataSource } from "typeorm";

import { Customer } from "../../customers/entities/customer.entity";
import { Employee } from "../../employees/entities/employee.entity";
import { Product } from "../../products/entities/products.entity";
import { Sale } from "../../sales/entities/sale.entity";
import { SaleProduct } from "../../sales/entities/sale-product.entity";

export class FullSeed {
  private qty = 50;

  async run(dataSource: DataSource) {
    console.log("🌱 Iniciando seed completo...");

    const customerRepo = dataSource.getRepository(Customer);
    const employeeRepo = dataSource.getRepository(Employee);
    const productRepo = dataSource.getRepository(Product);
    const saleRepo = dataSource.getRepository(Sale);
    const saleProductRepo = dataSource.getRepository(SaleProduct);

    // -----------------------------------------
    // 1) Customers (50)
    // -----------------------------------------

    const customers: Partial<Customer>[] = [];

    for (let i = 1; i <= this.qty; i++) {
      customers.push({
        name: `Cliente ${i}`,
        cpf: String(10000000000 + i),
        email: `cliente${i}@example.com`,
        phone: `1190000${String(i).padStart(4, "0")}`,
      });
    }

    const savedCustomers = await customerRepo.save(customers);
    console.log("✔️ 50 Customers criados!");

    // -----------------------------------------
    // 2) Employees (50)
    // -----------------------------------------

    const employees: Partial<Employee>[] = [];

    for (let i = 1; i <= this.qty; i++) {
      employees.push({
        name: `Funcionário ${i}`,
        cpf: String(20000000000 + i),
        email: `funcionario${i}@example.com`,
        phone: `1191000${String(i).padStart(4, "0")}`,
        salary: 3000 + i * 10,
      });
    }

    const savedEmployees = await employeeRepo.save(employees);
    console.log("✔️ 50 Employees criados!");

    // -----------------------------------------
    // 3) Products (50)
    // -----------------------------------------

    const products: Partial<Product>[] = [];

    for (let i = 1; i <= this.qty; i++) {
      products.push({
        name: `Produto ${i}`,
        description: `Descrição do produto ${i}`,
        price: (10 + i) * 2.5,
        image_url: `https://example.com/produto${i}.jpg`,
        stock: 100 + i,
      });
    }

    const savedProducts = await productRepo.save(products);
    console.log("✔️ 50 Products criados!");

    // -----------------------------------------
    // 4) Sales (50)
    // -----------------------------------------

    const sales: Partial<Sale>[] = [];

    for (let i = 1; i <= this.qty; i++) {
      sales.push({
        customer: savedCustomers[i - 1],
        employee: savedEmployees[i - 1],
        total: 0, // será atualizado após gerar os itens
      });
    }

    const savedSales = await saleRepo.save(sales);
    console.log("✔️ 50 Sales criadas!");

    // -----------------------------------------
    // 5) SaleProduct (50)
    // -----------------------------------------

    const saleProducts: Partial<SaleProduct>[] = [];

    for (let i = 1; i <= this.qty; i++) {
      const product = savedProducts[Math.floor(Math.random() * savedProducts.length)];
      const quantity = Math.floor(Math.random() * 5) + 1;
      const unitValue = Number(product.price);

      saleProducts.push({
        product,
        sale: savedSales[i - 1],
        quantity,
        unitValue,
      });

      // Atualiza o total da venda
      savedSales[i - 1].total = unitValue * quantity;
    }

    await saleProductRepo.save(saleProducts);
    await saleRepo.save(savedSales);

    console.log("✔️ 50 SaleProducts criados!");
    console.log("🌱 Seed completo finalizado com sucesso!");
  }
}

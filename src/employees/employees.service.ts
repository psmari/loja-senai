import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeesRepository.create(createEmployeeDto);
    return await this.employeesRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeesRepository.find({
      relations: ['sales'],
    });
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeesRepository.findOne({
      where: { id },
      relations: ['sales'],
    });

    if (!employee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }

    return employee;
  }

  async findByEmail(email: string): Promise<Employee> {
    const employee = await this.employeesRepository.findOne({
      where: { email },
      relations: ['sales'],
    });

    if (!employee) {
      throw new NotFoundException(`Employee #${email} not found`);
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.findOne(id);

    const updated = Object.assign(employee, updateEmployeeDto);
    return await this.employeesRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.employeesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Employee #${id} not found`);
    }
  }
}

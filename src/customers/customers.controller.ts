import { Body, Controller, Get, Post } from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { UpsertDTO } from "./dto/upsert.dto"
// @ -> é um decorator
// Eles são uma 
// função (ou método) que modificam 
// o comportamento de outra função passada, 
// retornando uma nova função.
@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}
    
    @Get()
    showAll() {
        return {
            'customers': this.customersService.get()
        }
    }

    @Post()
    create(@Body() bodyCustomer: UpsertDTO) {
        return this.customersService.create(bodyCustomer);
    }
}
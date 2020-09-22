import { Controller, Body, Get, Param, Logger } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { MessagePattern } from "@nestjs/microservices"

@Controller('products')

export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @MessagePattern('add')
    async addProduct(
        name: string,
        price: number,
    ) {
        const prodId = await this.productsService.insertProduct(name, price);

        return {
            id: prodId
        };
    }
    @MessagePattern('all')
    async getAllProducts() {
        return await this.productsService.getProducts();
    }

    @MessagePattern('find')
    getProduct(
        name: string
    ) {
        return this.productsService.findProduct(name);
    }
    @MessagePattern('update')
    async updateProduct(
        id: string,
        name: string,
        price: number,
    ) {
        const prodId = await this.productsService.updateProduct(id, name, price);

        return {
            id: prodId
        };
    }
    @Get('delete')
    async DeleteProduct(
        id: string
    ) {
        const n = await this.productsService.deleteProduct(id);
        return {
            count: n
        };
    }
}

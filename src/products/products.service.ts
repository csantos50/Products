import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { count } from 'console';
import { Model } from 'mongoose'
import { Product } from './product.model';


@Injectable()
export class ProductsService {
  products: Product[] = [];

  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {

  }

  async insertProduct(name: string, price: number) {

    const newProduct = new this.productModel({ name, price });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map(prod => ({
      id: prod.id,
      name: prod.name,
      price: prod.price,
    }));
  }
  
  async findProduct(name: string){
    let product;
    try {
      product = await this.productModel.findOne({"name":name});
    } catch (error) {
      throw new NotFoundException('Product not find.');
    }
    if (!product) {
      throw new NotFoundException('Product not find.');
    }
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
  async findProductById(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Product not find.');
    }
    if (!product) {
      throw new NotFoundException('Product not find.');
    }
    return product;
  }
  async updateProduct(id: string, name: string, price: number) {
    const upProduct = await this.findProductById(id);
    if (name) {
      upProduct.name = name;
    }
    if (price) {
      upProduct.price = price;
    }
    upProduct.save();
  }
  async deleteProduct(id:string){
    const result = await this.productModel.deleteOne({_id:id}).exec();
    if(result.n===0){
      throw new NotFoundException('Product not find.');
    }
    return result.n
  }

}

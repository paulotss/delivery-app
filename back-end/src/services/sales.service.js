const { SaleProduct, User, Product } = require('../database/models');

class SalesService {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    const result = await this.model.findAll();
    return result;
  }

  async findById(id) {
    const result = await this.model.findOne({
      where: { id },
      include: [
      { model: User, as: 'idUser', attributes: ['name'] },
      { model: User, as: 'idSeller', attributes: ['name'] },
      { model: Product,
        as: 'products',
        through: { attributes: ['quantity'] },
        attributes: ['name', 'price'] },
      ],
   });
    return result;
  }

  async findByUserId(userId) {
    const result = await this.model.findAll({
    where: { userId },
  });
    return result;
  }

  async create({ sellerId, totalPrice, deliveryAddress, 
    deliveryNumber, status = 'Pendente', 
    products }, userId) {
    const { dataValues } = await this.model.create({ userId, 
      sellerId, 
      totalPrice, 
      deliveryAddress, 
      deliveryNumber, 
      status, 
      saleDate: new Date() });

    const auxProducts = products.map((item) => {
    const saleId = dataValues.id;
    const productId = item.id;
    const quantity = item.count;
    return { saleId, productId, quantity };
    });
    await SaleProduct.bulkCreate(auxProducts);

    // console.log(result)
    return dataValues;
  }

  async deleteById(id) {
    await this.model.destroy({ where: { id } });
  }
}

module.exports = SalesService;
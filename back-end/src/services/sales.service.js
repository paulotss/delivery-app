class SalesService {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    const result = await this.model.findAll();
    return result;
  }

  async findById(id) {
    const result = await this.model.findByPk(id);
    return result;
  }

  async create({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status ="pendente", products }) {
    console.log(userId, sellerId, totalPrice, deliveryAddress, deliveryNumber);
    const result = await this.model.create({ userId, sellerId, totalPrice, deliveryAddress,deliveryNumber, status, salesDate:new Date() });
    console.log(result)
    return result;
  }

  async deleteById(id) {
    await this.model.destroy({ where: { id } });
  }
}

module.exports = SalesService;
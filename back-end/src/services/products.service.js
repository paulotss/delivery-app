class ProductService {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    const result = await this.model.findAll();
    return result;
  }

  async findOne(id) {
    const result = await this.model.findByPk(id);
    return result;
  }

  async create({ name, price, urlImage }) {
    const { dataValues } = await this.model.create({ name, price, urlImage })
    return dataValues;
  }

  async deleteById(id) {
    await this.model.destroy({ where: { id }});
  }
}
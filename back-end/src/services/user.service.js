
class UserService {
    constructor(model) {
        this.model = model;
    };

    async findAll() {
        const result = await this.model.findAll({
            attributes: { exclude: ['password'] },
        });
        return result;
    };

    async create({ email, name, password, role }) {
        const { dataValues } = await this.model.create({ email, name, password, role })
        delete dataValues.password;
        return dataValues;
    };

    async findById(id) {
        const result = await this.model.findByPk(id, {
            attributes: { exclude: ['password'] }
        })
        return result;
    };

    async deleteById(id) {
        await this.model.destroy({ where: { id }});
    };

    
};

module.exports = UserService;
import { Model, DataTypes } from 'sequelize';
import sequelize from '~/lib/db';
import Product from './product';

class ProductVariant extends Model {
  public id!: string;
  public productId!: string;
  public skuVariant!: string;
  public name!: string;
  public unit!: string;
}

ProductVariant.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
    },
    skuVariant: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ProductVariant',
  }
);

ProductVariant.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(ProductVariant, { foreignKey: 'productId' });

export default ProductVariant;
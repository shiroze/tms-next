import { Model, DataTypes } from 'sequelize';
import sequelize from '~/lib/db';
import SalesOrder from './sales-order';
import ProductVariant from './product-variant';

class SalesOrderItem extends Model {
  public id!: string;
  public salesOrderId!: string;
  public productVariantId!: string;
  public quantity!: number;
  public price!: number;
  public total!: number;
}

SalesOrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    salesOrderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: SalesOrder,
        key: 'id',
      },
    },
    productVariantId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: ProductVariant,
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'SalesOrderItem',
  }
);

SalesOrderItem.belongsTo(SalesOrder, { foreignKey: 'salesOrderId' });
SalesOrderItem.belongsTo(ProductVariant, { foreignKey: 'productVariantId' });
SalesOrder.hasMany(SalesOrderItem, { foreignKey: 'salesOrderId' });

export default SalesOrderItem;
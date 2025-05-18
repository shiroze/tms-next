import { Model, DataTypes } from 'sequelize';
import sequelize from '~/lib/db';
import PurchaseOrder from './purchase-order';
import ProductVariant from './product-variant';

class PurchaseOrderItem extends Model {
  public id!: string;
  public purchaseOrderId!: string;
  public productVariantId!: string;
  public quantity!: number;
  public price!: number;
  public total!: number;
  public receivedQty!: number;
}

PurchaseOrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    purchaseOrderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: PurchaseOrder,
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
    receivedQty: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'PurchaseOrderItem',
  }
);

PurchaseOrderItem.belongsTo(PurchaseOrder, { foreignKey: 'purchaseOrderId' });
PurchaseOrderItem.belongsTo(ProductVariant, { foreignKey: 'productVariantId', as: 'productVariant' });
PurchaseOrder.hasMany(PurchaseOrderItem, { foreignKey: 'purchaseOrderId', as: 'items' });

export default PurchaseOrderItem;
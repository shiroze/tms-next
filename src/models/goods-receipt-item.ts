import { Model, DataTypes } from 'sequelize';
import sequelize from '~/lib/db';
import GoodsReceipt from './goods-receipt';
import ProductVariant from './product-variant';
import PurchaseOrderItem from './purchase-order-item';

class GoodsReceiptItem extends Model {
  public id!: string;
  public goodsReceiptId!: string;
  public purchaseOrderItemId!: string;
  public productVariantId!: string;
  public quantity!: number;
}

GoodsReceiptItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    goodsReceiptId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: GoodsReceipt,
        key: 'id',
      },
    },
    purchaseOrderItemId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: PurchaseOrderItem,
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
  },
  {
    sequelize,
    modelName: 'GoodsReceiptItem',
  }
);

GoodsReceiptItem.belongsTo(GoodsReceipt, { foreignKey: 'goodsReceiptId' });
GoodsReceiptItem.belongsTo(ProductVariant, { foreignKey: 'productVariantId', as: 'productVariant' });
GoodsReceiptItem.belongsTo(PurchaseOrderItem, { foreignKey: 'purchaseOrderItemId', as: 'purchaseOrderItem' });
GoodsReceipt.hasMany(GoodsReceiptItem, { foreignKey: 'goodsReceiptId', as: 'items' });

export default GoodsReceiptItem;
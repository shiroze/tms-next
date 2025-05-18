import { Model, DataTypes } from 'sequelize';
import sequelize from '~/lib/db';
import PurchaseInvoice from './purchase-invoice';
import ProductVariant from './product-variant';
import PurchaseOrderItem from './purchase-order-item';

class PurchaseInvoiceItem extends Model {
  public id!: string;
  public purchaseInvoiceId!: string;
  public purchaseOrderItemId!: string;
  public productVariantId!: string;
  public quantity!: number;
  public price!: number;
  public total!: number;
}

PurchaseInvoiceItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    purchaseInvoiceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: PurchaseInvoice,
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
    modelName: 'PurchaseInvoiceItem',
  }
);

PurchaseInvoiceItem.belongsTo(PurchaseInvoice, { foreignKey: 'purchaseInvoiceId' });
PurchaseInvoiceItem.belongsTo(ProductVariant, { foreignKey: 'productVariantId', as: 'productVariant' });
PurchaseInvoiceItem.belongsTo(PurchaseOrderItem, { foreignKey: 'purchaseOrderItemId', as: 'purchaseOrderItem' });
PurchaseInvoice.hasMany(PurchaseInvoiceItem, { foreignKey: 'purchaseInvoiceId', as: 'items' });

export default PurchaseInvoiceItem;
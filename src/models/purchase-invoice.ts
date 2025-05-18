import { Model, DataTypes } from 'sequelize';
import sequelize from '~/lib/db';
import PurchaseOrder from './purchase-order';
import User from './user';

class PurchaseInvoice extends Model {
  public id!: string;
  public invoiceNumber!: string;
  public date!: Date;
  public purchaseOrderId!: string;
  public userId!: string;
  public status!: 'draft' | 'confirmed' | 'paid' | 'cancelled';
  public dueDate!: Date;
  public total!: number;
  public notes?: string;
}

PurchaseInvoice.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    purchaseOrderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: PurchaseOrder,
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('draft', 'confirmed', 'paid', 'cancelled'),
      defaultValue: 'draft',
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'PurchaseInvoice',
  }
);

PurchaseInvoice.belongsTo(PurchaseOrder, { foreignKey: 'purchaseOrderId', as: 'purchaseOrder' });
PurchaseInvoice.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default PurchaseInvoice;
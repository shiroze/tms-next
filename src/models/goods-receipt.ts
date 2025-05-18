import { Model, DataTypes } from 'sequelize';
import sequelize from '~/lib/db';
import PurchaseOrder from './purchase-order';
import User from './user';

class GoodsReceipt extends Model {
  public id!: string;
  public grNumber!: string;
  public date!: Date;
  public purchaseOrderId!: string;
  public userId!: string;
  public status!: 'draft' | 'confirmed' | 'cancelled';
  public notes?: string;
}

GoodsReceipt.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    grNumber: {
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
      type: DataTypes.ENUM('draft', 'confirmed', 'cancelled'),
      defaultValue: 'draft',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'GoodsReceipt',
  }
);

GoodsReceipt.belongsTo(PurchaseOrder, { foreignKey: 'purchaseOrderId', as: 'purchaseOrder' });
GoodsReceipt.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default GoodsReceipt;
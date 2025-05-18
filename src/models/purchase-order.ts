import { Model, DataTypes } from 'sequelize';
import sequelize from '~/lib/db';
import BusinessPartner from './business-partner';
import User from './user';

class PurchaseOrder extends Model {
  public id!: string;
  public poNumber!: string;
  public date!: Date;
  public partnerId!: string;
  public userId!: string;
  public status!: 'draft' | 'confirmed' | 'received' | 'cancelled';
  public total!: number;
  public notes?: string;
}

PurchaseOrder.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    poNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    partnerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: BusinessPartner,
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
      type: DataTypes.ENUM('draft', 'confirmed', 'received', 'cancelled'),
      defaultValue: 'draft',
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
    modelName: 'PurchaseOrder',
  }
);

PurchaseOrder.belongsTo(BusinessPartner, { foreignKey: 'partnerId', as: 'partner' });
PurchaseOrder.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default PurchaseOrder;
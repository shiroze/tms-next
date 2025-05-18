import { Model, DataTypes } from 'sequelize';
import sequelize from '~/lib/db';
import BusinessPartner from './business-partner';
import User from './user';

class SalesOrder extends Model {
  public id!: string;
  public soNumber!: string;
  public date!: Date;
  public partnerId!: string;
  public userId!: string;
  public status!: 'draft' | 'confirmed' | 'delivered' | 'cancelled';
  public total!: number;
}

SalesOrder.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    soNumber: {
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
      type: DataTypes.ENUM('draft', 'confirmed', 'delivered', 'cancelled'),
      defaultValue: 'draft',
    },
    total: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'SalesOrder',
  }
);

SalesOrder.belongsTo(BusinessPartner, { foreignKey: 'partnerId' });
SalesOrder.belongsTo(User, { foreignKey: 'userId' });

export default SalesOrder;
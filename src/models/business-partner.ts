import { Model, DataTypes } from 'sequelize';
import sequelize from '~/lib/db';

class BusinessPartner extends Model {
  public id!: string;
  public name!: string;
  public code!: string;
  public bpType!: 'buyer' | 'seller' | 'both';
  public address!: string;
  public phone!: string;
  public email!: string;
  public isActive!: boolean;
}

BusinessPartner.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    bpType: {
      type: DataTypes.ENUM('buyer', 'seller', 'both'),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'BusinessPartner',
  }
);

export default BusinessPartner;
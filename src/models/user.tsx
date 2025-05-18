import { Model, DataTypes } from 'sequelize';
import db from '~/libs/db';

class user extends Model {}

user.init({
  UserId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  UserPass: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  UserEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  UserPhone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  RoleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  UserImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  LastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  CreatedBy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  CreatedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  UpdatedBy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  UpdatedDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: false,
  sequelize: db,
  tableName: "t_users"
})

export default user;
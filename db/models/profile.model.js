const { Model, DataTypes } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const PROFILE_TABLE = 'profiles';

const ProfileSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    field: 'user_id',
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    conDelete: 'SET NULL',
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  profilePic: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'profile_pic',
  },
  about: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  blog: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  github: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  linkedIn: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  twitter: {
    allowNull: true,
    type: DataTypes.STRING,
  }
}

class Profile extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as: 'user'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROFILE_TABLE,
      modelName: 'Profile',
      timestamps: false,
    }
  }
}

module.exports = { PROFILE_TABLE, ProfileSchema, Profile };

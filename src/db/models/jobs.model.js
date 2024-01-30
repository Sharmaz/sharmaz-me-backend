const { Model, DataTypes } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const JOB_TABLE = 'jobs';

const JobSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    allowNull: false,
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
  dateStarted: {
    allowNull: true,
    type: DataTypes.DATEONLY,
    field: 'date_started',
    defaultValue: DataTypes.NOW,
  },
  dateEnded: {
    allowNull: true,
    type: DataTypes.DATEONLY,
    field: 'date_ended',
    defaultValue: DataTypes.NOW,
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  role: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  details: {
    allowNull: true,
    type: DataTypes.JSON,
  },
}

class Job extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: JOB_TABLE,
      modelName: 'Job',
      timestamps: false,
    }
  }
}

module.exports = { JOB_TABLE, JobSchema, Job };

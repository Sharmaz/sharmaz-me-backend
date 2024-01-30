const { Model, DataTypes } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const PROJECT_TABLE = 'projects';

const ProjectSchema = {
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
  description: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  githubLink: {
    allowNull: true,
    field: 'github_link',
    type: DataTypes.STRING,
  },
  demoLink: {
    allowNull: true,
    field: 'demo_link',
    type: DataTypes.STRING,
  },
  imageLink: {
    allowNull: true,
    field: 'image_link',
    type: DataTypes.STRING,
  },
  tags: {
    allowNull: true,
    type: DataTypes.JSON,
  },
}

class Project extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROJECT_TABLE,
      modelName: 'Project',
      timestamps: false,
    }
  }
}

module.exports = { PROJECT_TABLE, ProjectSchema, Project };

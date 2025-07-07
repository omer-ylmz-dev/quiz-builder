import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface QuestionAttributes {
  id: number;
  quizId: number;
  type: 'boolean' | 'input' | 'checkbox';
  text: string;
  options?: string[];
}

interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id'> {}

export class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
  public id!: number;
  public quizId!: number;
  public type!: 'boolean' | 'input' | 'checkbox';
  public text!: string;
  public options?: string[];
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quizId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('boolean', 'input', 'checkbox'),
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    options: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Question',
  }
);

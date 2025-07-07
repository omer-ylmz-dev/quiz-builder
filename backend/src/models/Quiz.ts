import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface QuizAttributes {
  id: number;
  title: string;
}

interface QuizCreationAttributes extends Optional<QuizAttributes, 'id'> {}

export class Quiz extends Model<QuizAttributes, QuizCreationAttributes> implements QuizAttributes {
  public id!: number;
  public title!: string;
}

Quiz.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Quiz',
  }
);

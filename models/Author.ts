import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./index";

export interface AuthorAttributes {
  author_id: number;
  name: string;
  biography?: string;
  birth_date?: Date;
  death_date?: Date;
}

export interface AuthorCreationAttributes
  extends Optional<AuthorAttributes, "author_id"> {}

class Author
  extends Model<AuthorAttributes, AuthorCreationAttributes>
  implements AuthorAttributes
{
  public author_id!: number;
  public name!: string;
  public biography?: string;
  public birth_date?: Date;
  public death_date?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Author.init(
  {
    author_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    death_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Author",
  }
);

export default Author;

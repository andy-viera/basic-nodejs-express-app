import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./index";

export interface CategoryAttributes {
  category_id: number;
  name: string;
  description?: string;
}

export interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "category_id"> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public category_id!: number;
  public name!: string;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    category_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Category",
  }
);

export default Category;

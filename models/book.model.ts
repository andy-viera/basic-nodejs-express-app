import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./index";

export interface BookAttributes {
  book_id: number;
  title: string;
  author_id: number;
  category_id?: number;
  price: number;
  published_date?: Date;
  isbn?: string;
}

export interface BookCreationAttributes
  extends Optional<BookAttributes, "book_id"> {}

class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  public book_id!: number;
  public title!: string;
  public author_id!: number;
  public category_id?: number;
  public price!: number;
  public published_date?: Date;
  public isbn?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Book.init(
  {
    book_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    published_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    isbn: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "Book",
  }
);

export default Book;

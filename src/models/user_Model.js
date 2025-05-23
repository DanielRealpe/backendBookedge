import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { Roles } from "./Roles_Model.js";

export const Users = database.define(
  "Users",
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idRol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Roles, key: "idRol" },
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    eps: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    identificationType: {
      type: DataTypes.ENUM("CC", "CE"),
      allowNull: false,
    },
    identification: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    cellphone: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    refreshToken: { type: DataTypes.STRING, allowNull: true },
    resetToken : {type: DataTypes.STRING, allowNull:true},
    resetTokenExpires: { type: DataTypes.DATE, allowNull: true }, 
  },
  {
    tableName: "Users",
    timestamps: false,
  }
);

Users.belongsTo(Roles, { foreignKey: "idRol", as: "role" });
Roles.hasMany(Users, { foreignKey: "idRol", as: "users" });

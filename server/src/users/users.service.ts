// src/items/items.service.ts

/**
 * Data Model Interfaces
 */

import { BaseUser, User } from "./user.interface";
const fs = require("fs");
import { Users } from "./users.interface";
const path = require("path");

/**
 * In-Memory Store
 */

const users: Users = require("./data.json");

const getAccountData = () => {
  const jsonData = fs.readFileSync(path.join(__dirname, "/", "data.json"));
  var b = JSON.parse(jsonData);
  return b;
};

const saveAccountData = (data1: any) => {
  const stringifyData = JSON.stringify(data1);
  fs.writeFileSync(path.join(__dirname, "/", "data.json"), stringifyData);
};

/**
 * Service Methods
 */

export const findAll = async (): Promise<User[]> => Object.values(users);

export const find = async (id: number): Promise<User > => users[id];

export const create = async (newUser: BaseUser): Promise<User> => {
  const id = new Date().valueOf();
  var existAccounts = getAccountData();

  existAccounts[id] = {
    id,
    ...newUser,
  };

  saveAccountData(existAccounts);

  return existAccounts[id];
};

export const update = async (
  id: number,
  userUpdate: BaseUser
): Promise<User | null> => {
  const user = await find(id);
  if (!user) {
    return null;
  }
  var existAccounts = getAccountData();
  users[id] = { id, ...userUpdate };
  fs.readFile(
    path.join(__dirname, "/", "data.json"),
    "utf8",
    (err: any, data: any) => {
      existAccounts[id] = users[id];

      saveAccountData(existAccounts);
    },
    true
  );

  
  return users[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const user = await find(id);

  if (!user) {
    return null;
  }

  fs.readFile(
    path.join(__dirname, "/", "data.json"), 'utf8', (err:any, data:any) => {
    var existAccounts = getAccountData()

    const userId = id;

    delete existAccounts[userId];  
    saveAccountData(existAccounts);
    
  }, true);

  delete users[id];
};

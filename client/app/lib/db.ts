// import Dexie from "dexie";
import Dexie, { Table } from "dexie";
import { Post } from "../utils/types";

export class WhispersDB extends Dexie {
  posts!: Table<Post>;
  trending!: Table<Post>;

  constructor() {
    super("WhispersDB");

    this.version(1).stores({
      posts: "id, title, category",
      trending: "id, title",
    });
  }
}

export const db = new WhispersDB();

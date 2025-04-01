
import { serial, integer, pgTable,varchar,boolean} from "drizzle-orm/pg-core";

export const Points = pgTable("points", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(), 
    point: integer("point").notNull() 
});

export const giveaway = pgTable("giveaway", {
    name: varchar("name").notNull(),
});


export const admin = pgTable("admin", {
    id: serial("id").primaryKey(),
    link: varchar("link").notNull(),
    giveaway: boolean("giveaway").notNull()
}
);

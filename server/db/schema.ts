import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgTableCreator,
  serial,
  smallint,
  smallserial,
  text,
  time,
  timestamp,
  varchar,
  primaryKey,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `demo_${name}`);

export const user = createTable("user", {
  id: serial("id").primaryKey(),
  roleId: smallint("roleid")
    .notNull()
    .default(1)
    .references(() => role.id),
  Fname: varchar("Fname", { length: 256 }).notNull(),
  Lname: varchar("Lname", { length: 256 }).notNull(),
  gender: boolean("gender").notNull(),
  blocked: boolean("blocked").notNull().default(false),
  email: varchar("email", { length: 256 }).notNull().unique(),
  mobile: varchar("mobile", { length: 10 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  resetPasswordToken: varchar("resetPasswordToken", { length: 256 }).default(
    sql`NULL`,
  ),
  tokenCreatedAt: timestamp("tokenCreatedAt").default(sql`NULL`),
  verificationToken: varchar("verificationToken", { length: 256 }).default(
    sql`NULL`,
  ),
  verificationTokenCreationAt: timestamp("verificationTokenCreationAt").default(
    sql`NULL`,
  ),
  verificated: boolean("verificated").notNull().default(false),
});

export const userRelations = relations(user, ({ one, many }) => ({
  admin: one(admin, {
    fields: [user.id],
    references: [admin.userId],
  }),
  player: one(player, {
    fields: [user.id],
    references: [player.userId],
  }),
  role: one(role, {
    fields: [user.roleId],
    references: [role.id],
  }),
  userMedia: many(userMedia),
  post: many(post),
  comment: many(comment),
}));

export const admin = createTable("admin", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .notNull()
    .unique()
    .references(() => user.id),
  characterizationId: smallint("characterizationId")
    .notNull()
    .references(() => characterization.id),
  description: text("description"),
});

export const adminRelations = relations(admin, ({ one }) => ({
  characterization: one(characterization, {
    fields: [admin.characterizationId],
    references: [characterization.id],
  }),
}));

export const characterization = createTable("characterization", {
  id: smallserial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
});

export const characterizationRelations = relations(
  characterization,
  ({ many }) => ({
    characterization: many(admin),
  }),
);

export const player = createTable("player", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .notNull()
    .unique()
    .references(() => user.id),
  description: text("description").notNull(),
  number: smallint("number").notNull(),
  type: boolean("type").notNull(),
  positionId: smallint("positionId")
    .notNull()
    .references(() => position.id),
});

export const playerRelations = relations(player, ({ one }) => ({
  position: one(position, {
    fields: [player.positionId],
    references: [position.id],
  }),
}));

export const position = createTable("position", {
  id: smallserial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
});

export const positionRelations = relations(position, ({ many }) => ({
  position: many(player),
}));

export const role = createTable("role", {
  id: smallserial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
});

export const roleRelations = relations(role, ({ many }) => ({
  role: many(user),
}));

export const userMedia = createTable("userMedia", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => user.id),
  imagePath: varchar("imagePath", { length: 256 }).notNull(),
});

export const userMediaRelations = relations(userMedia, ({ one }) => ({
  userMedia: one(user, {
    fields: [userMedia.userId],
    references: [user.id],
  }),
}));

export const matchState = createTable("matchState", {
  id: smallserial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
});

export const matchStateRelations = relations(matchState, ({ many }) => ({
  eventOfMatch: many(eventOfMatch),
  match: many(match),
}));

export const team = createTable("team", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  logoPath: varchar("logoPath", { length: 256 }).notNull(),
});

export const teamRelations = relations(team, ({ many }) => ({
  team: many(match),
}));

export const court = createTable("court", {
  id: smallserial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  location: varchar("location", { length: 256 }).notNull(),
});

export const courtRelations = relations(court, ({ many }) => ({
  court: many(match),
}));

export const championship = createTable("championship", {
  id: smallserial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const championshipRelations = relations(championship, ({ many }) => ({
  championship: many(match),
}));

export const eventOfMatch = createTable("eventOfMatch", {
  id: smallserial("id").primaryKey(),
  matchId: integer("matchId")
    .notNull()
    .references(() => match.id),
  stateId: smallint("stateId")
    .notNull()
    .references(() => matchState.id),
  playerName1: varchar("playerName1", { length: 256 }).notNull(),
  NumOfPlayer1: smallint("NumOfPlayer1").notNull(),
  playerName2: varchar("playerName2", { length: 256 }).notNull(),
  NumOfPlayer2: smallint("NumOfPlayer2").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const eventOfMatchRelations = relations(eventOfMatch, ({ one }) => ({
  match: one(match, {
    fields: [eventOfMatch.matchId],
    references: [match.id],
  }),
  matchState: one(matchState, {
    fields: [eventOfMatch.stateId],
    references: [matchState.id],
  }),
}));

export const match = createTable("match", {
  id: serial("id").primaryKey(),
  championshipId: smallint("championshipId")
    .notNull()
    .references(() => championship.id),
  teamId: smallint("teamId")
    .notNull()
    .references(() => team.id),
  courtId: smallint("courtId")
    .notNull()
    .references(() => court.id),
  stateId: smallint("stateId")
    .notNull()
    .references(() => matchState.id),
  matchDate: date("matchDate"),
  matchTime: time("matchTime"),
  resultTeam1: varchar("resultTeam1", { length: 3 }),
  resultTeam2: varchar("resultTeam2", { length: 3 }),
});

export const matchRelations = relations(match, ({ one }) => ({
  team: one(team, {
    fields: [match.teamId],
    references: [team.id],
  }),
  court: one(court, {
    fields: [match.courtId],
    references: [court.id],
  }),
  championship: one(championship, {
    fields: [match.championshipId],
    references: [championship.id],
  }),
  matchState: one(matchState, {
    fields: [match.stateId],
    references: [matchState.id],
  }),
}));

export const post = createTable("post", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => user.id),
  content: text("content"),
  priority: smallint("priority"),
  postDate: date("postDate")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  postTime: time("postTime")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const postRelations = relations(post, ({ one, many }) => ({
  user: one(user, {
    fields: [post.userId],
    references: [user.id],
  }),
  comment: many(comment),
  media: many(postMedia),
}));

export const comment = createTable("comment", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => user.id),
  postId: integer("postId")
    .notNull()
    .references(() => post.id),
  content: text("content"),
  commentDate: date("postDate")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  commentTime: time("postTime")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const commentRelations = relations(comment, ({ one, many }) => ({
  user: one(user, {
    fields: [comment.userId],
    references: [user.id],
  }),
  post: one(post, {
    fields: [comment.postId],
    references: [post.id],
  }),
  media: many(commentMedia),
}));

export const postMedia = createTable("postMedia", {
  id: serial("id").primaryKey(),
  postId: integer("postId")
    .notNull()
    .references(() => post.id),
  imagePath: varchar("imagePath", { length: 256 }).notNull(),
});

export const postMediaRelations = relations(postMedia, ({ one }) => ({
  post: one(post, {
    fields: [postMedia.postId],
    references: [post.id],
  }),
}));

export const commentMedia = createTable("commentMedia", {
  id: serial("id").primaryKey(),
  commentId: integer("commentId")
    .notNull()
    .references(() => comment.id),
  imagePath: varchar("imagePath", { length: 256 }).notNull(),
});

export const commentMediaRelations = relations(commentMedia, ({ one }) => ({
  comment: one(comment, {
    fields: [commentMedia.commentId],
    references: [comment.id],
  }),
}));

export const classification = createTable("classification", {
  id: smallserial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const classificationRelations = relations(
  classification,
  ({ many }) => ({
    productClassification: many(productClassification),
  }),
);

export const size = createTable("size", {
  id: smallserial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const sizeRelations = relations(size, ({ many }) => ({
  productClassification: many(productClassification),
}));

export const product = createTable("product", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  price: varchar("price", { length: 50 }).notNull(),
  quantity: integer("quantity"),
  description: text("description"),
});

export const productRelations = relations(product, ({ many }) => ({
  productClassification: many(productClassification),
  productMedia: many(productMedia),
}));

export const productMedia = createTable("productMedia", {
  id: serial("id").primaryKey(),
  productId: integer("productId")
    .notNull()
    .references(() => product.id),
  imagePath: varchar("imagePath", { length: 256 }).notNull(),
});

export const productMediaRelations = relations(productMedia, ({ one }) => ({
  product: one(product, {
    fields: [productMedia.productId],
    references: [product.id],
  }),
}));

export const productClassification = createTable("productClassification", {
  id: serial("id").primaryKey(),
  productId: integer("productId")
    .notNull()
    .references(() => product.id),
  classificationId: smallint("classificationId")
    .notNull()
    .references(() => classification.id),
  sizeId: smallint("sizeId")
    .notNull()
    .references(() => size.id),
});

export const productClassificationRelations = relations(
  productClassification,
  ({ one }) => ({
    product: one(product, {
      fields: [productClassification.productId],
      references: [product.id],
    }),
    classification: one(classification, {
      fields: [productClassification.classificationId],
      references: [classification.id],
    }),
    size: one(size, {
      fields: [productClassification.sizeId],
      references: [size.id],
    }),
  }),
);

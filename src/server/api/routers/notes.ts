import { eq, inArray } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { notes } from "~/server/db/schema";

export const notesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        contents: z.string(),
        root_contents: z.string(),
        tag_id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(notes).values({
        title: input.title,
        contents: input.contents,
        tagID: input.tag_id,
        root_contents: input.root_contents,
        createdById: ctx.session.user.id,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        contents: z.string(),
        root_contents: z.string(),
        tag_id: z.number(),
        note_id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(notes)
        .set({
          title: input.title,
          contents: input.contents,
          tagID: input.tag_id,
          root_contents: input.root_contents,
        })
        .where(eq(notes.id, input.note_id));
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const note = await ctx.db.query.posts.findFirst({
      orderBy: (notes, { desc }) => [desc(notes.createdAt)],
    });

    return note ?? null;
  }),

  getAllNotes: publicProcedure.query(async ({ ctx }) => {
    const result = {};
    const notes = await ctx.db.query.notes.findMany({
      // Filter by userId
      where: (note) => eq(note.createdById, ctx.session?.user.id),
      // Order by createdAt descending
      orderBy: (notes, { desc }) => [desc(notes.createdAt)],
      
    });

      // Step 2: Extract the unique tag IDs from notes
    const tagIds = notes.map((note) => note.tagID);

    // Step 3: Fetch tags that correspond to those tag IDs
    const tagsData = await ctx.db.query.tags.findMany({
      where: (tag) => inArray(tag.id, tagIds),
    });

    // Step 4: Combine notes and tags
    const notesWithTags = notes.map((note) => ({
      ...note,
      tag: tagsData.find((tag) => tag.id === note.tagID) ?? null,
    }));

    return notesWithTags;
  }),
  deleteNote: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(notes).where(eq(notes.id, input.id));
    }),
});

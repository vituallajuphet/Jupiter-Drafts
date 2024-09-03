import { eq } from "drizzle-orm";
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

    if (notes.length) {
      const tags = await ctx.db.query.tags.findFirst({
        where: (tag) => eq(tag.id, notes[0]?.tagID),
      });

      return notes.map((note) => {
        return {
          ...note,
          tag: tags,
        };
      });
    }

    return notes;
  }),
  deleteNote: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(notes).where(eq(notes.id, input.id));
    }),
});

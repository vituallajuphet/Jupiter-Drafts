import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { notes } from "~/server/db/schema";

export const notesRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({ title: z.string(), contents: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(notes).values({
        title: input.title,
        contents: input.contents,
        createdById: ctx.session.user.id,
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const note = await ctx.db.query.posts.findFirst({
      orderBy: (notes, { desc }) => [desc(notes.createdAt)],
    });

    return note ?? null;
  }),

  getallNotes : publicProcedure.query(async ({ ctx }) => {
    const notes = await ctx.db.query.notes.findMany();
    return notes;
  } ),

});

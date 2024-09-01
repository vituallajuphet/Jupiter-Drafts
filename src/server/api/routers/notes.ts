import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { notes, noteTags, tags } from "~/server/db/schema";

export const notesRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({ title: z.string(), contents: z.string(), root_contents: z.string(), tag_id: z.number().optional() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db.insert(notes).values({
        title: input.title,
        contents: input.contents,
        root_contents: input.root_contents,
        createdById: ctx.session.user.id,
      });
      
      const noteId= res[0].insertId;

      if(input.tag_id && noteId){
        await ctx.db.insert(noteTags).values({
          note_id: noteId,
          tag_id: input.tag_id,
        });
      }


    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const note = await ctx.db.query.posts.findFirst({
      orderBy: (notes, { desc }) => [desc(notes.createdAt)],
    });

    return note ?? null;
  }),

  getallNotes: publicProcedure.query(async ({ ctx }) => {
    const notes = await ctx.db.query.notes.findMany({ // Filter by userId
      where:(note) => eq(note.createdById, ctx.session?.user.id), //Order by createdAt descending
      with:{
        tags:true
      }
    })
  
 
    return notes;
  }),
  deleteNote : publicProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ ctx, input }) => {
    await ctx.db.delete(notes).where(eq(notes.id, input.id));
  }),
});

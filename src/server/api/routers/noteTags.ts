import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { noteTags } from "~/server/db/schema";

export const noteTagsRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({ note_id: z.number(), tag_id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(noteTags).values({
         note_id: input.note_id,
         tag_id: input.tag_id,
      });
    }),

  // getLatest: publicProcedure.query(async ({ ctx }) => {
  //   const note = await ctx.db.query.posts.findFirst({
  //     orderBy: (notes, { desc }) => [desc(notes.createdAt)],
  //   });

  //   return note ?? null;
  // }),

//   getAllTags: publicProcedure.query(async ({ ctx }) => {
//     const tag = await ctx.db.query.tags.findMany({ // Filter by userId
//       orderBy: (tags, { desc }) => [desc(tags.createdAt)],  
//     })
//     if(ctx.session?.user.id === undefined){
//       return [];
//     }
//     return tag;
//   }),

});

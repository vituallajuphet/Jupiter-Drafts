import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { tags } from "~/server/db/schema";

export const tagsRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(tags).values({
        name: input.name,
      });
    }),

  // getLatest: publicProcedure.query(async ({ ctx }) => {
  //   const note = await ctx.db.query.posts.findFirst({
  //     orderBy: (notes, { desc }) => [desc(notes.createdAt)],
  //   });

  //   return note ?? null;
  // }),

  getAllTags: publicProcedure.query(async ({ ctx }) => {
    const tag = await ctx.db.query.tags.findMany({ // Filter by userId
      orderBy: (tags, { desc }) => [desc(tags.createdAt)],  
    })
    if(ctx.session?.user.id === undefined){
      return [];
    }
    return tag;
  }),

});

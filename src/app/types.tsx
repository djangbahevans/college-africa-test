import { z } from "zod";

export const AlbumSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
});

export type Album = z.infer<typeof AlbumSchema>;

export const PhotoSchema = z.object({
  albumId: z.number(),
  id: z.number(),
  title: z.string(),
  url: z.string(),
  thumbnailUrl: z.string(),
});

export type Photo = z.infer<typeof PhotoSchema>;

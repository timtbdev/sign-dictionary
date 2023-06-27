import { wordSchema } from "@/lib/validators/word";
import supabase from "@/utils/supabase-server";
import * as z from "zod";

export async function DELETE(
  req: Request,
  context: z.infer<typeof wordSchema>
) {
  try {
    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Validate the route params.
    const { params } = wordSchema.parse(context);

    // Remove the word.
    const { error } = await supabase
      .from("saved")
      .delete()
      .eq("id", params.wordId);

    if (error) {
      return new Response(error.message, { status: 400 });
    }

    // Deleted
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    return new Response(null, { status: 500 });
  }
}

export async function POST(req: Request, context: z.infer<typeof wordSchema>) {
  try {
    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Validate route params.
    const { params } = wordSchema.parse(context);

    // Save the word.
    const { data, error } = await supabase
      .from("saved")
      .upsert({ id: params.wordId, user_id: session.user.id })
      .select();

    if (error) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

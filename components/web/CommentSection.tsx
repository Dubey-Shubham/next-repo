"use client"

import { Controller, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Loader2, MessageSquare } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/app/schemas/comments";
import { FieldError, Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Preloaded, useMutation, usePreloadedQuery, useQuery } from "convex/react";
import z from "zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function CommentSection(props: {
    preloadedComments: Preloaded<typeof api.comments.getCommentByPostId>
}) {
    const params = useParams<{ postId: Id<"posts"> }>()

    const createComment = useMutation(api.comments.createComment)

    const [isPending, startTransition] = useTransition()

    const data = usePreloadedQuery(props.preloadedComments)

    const form = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            body: "",
            postId: params.postId,
        },
    })

    async function onSubmit(data: z.infer<typeof commentSchema>) {
        startTransition(async () => {
            try {
                await createComment(data)

                form.reset()

                toast.success("Comment created")
            } catch (error) {
                toast.error("Failed to create comment")
            }
        })
    }

    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardHeader className="border-b px-6 py-5">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                        <MessageSquare className="size-5" />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">
                            Comments
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            {data?.length ?? 0} comments
                        </p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-8 p-6">
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <Controller
                        control={form.control}
                        name="body"
                        render={({ field, fieldState }) => (
                            <Field className="space-y-2">
                                <FieldLabel className="text-sm font-medium">
                                    Write a Comment
                                </FieldLabel>

                                <Input
                                    {...field}
                                    placeholder="Share your thoughts..."
                                    aria-invalid={fieldState.invalid}
                                    className="h-12 rounded-xl border-gray-300 px-4"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="h-11 rounded-xl px-6"
                    >
                        {isPending ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="size-4 animate-spin" />
                                <span>Posting...</span>
                            </div>
                        ) : (
                            <span>Post Comment</span>
                        )}
                    </Button>
                </form>

                <section className="space-y-6">
                    {data?.length === 0 && (
                        <div className="rounded-xl border border-dashed p-8 text-center">
                            <p className="text-sm text-muted-foreground">
                                No comments yet. Be the first one to comment.
                            </p>
                        </div>
                    )}

                    {data?.map((comment) => (
                        <div
                            key={comment._id}
                            className="flex gap-4 rounded-2xl border p-5 transition hover:bg-muted/40"
                        >
                            <Avatar className="size-12 border">
                                <AvatarImage
                                    src={`https://avatar.vercel.sh/${comment.authorName}`}
                                    alt={comment.authorName}
                                />

                                <AvatarFallback>
                                    {comment.authorName
                                        .slice(0, 2)
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h3 className="font-semibold">
                                        {comment.authorName}
                                    </h3>

                                    <p className="text-xs text-muted-foreground">
                                        {new Date(
                                            comment._creationTime
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>

                                <p className="leading-7 text-gray-400">
                                    {comment.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>
            </CardContent>
        </Card>
    )
}
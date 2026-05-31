"use client"

import { Controller, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "../ui/card";
import { MessageSquare } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/app/schemas/comments";
import { FieldError, Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

export function CommentSection() {

    const params = useParams<{postId: Id<"posts">}>()
    const createComment = useMutation(api.comments.createComment)   // server action
    const form = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            body: "",
            postId: params.postId,
        },
    })

    async function onSubmit(){
        try {
            
        } catch (error) {
            
        }
    }

    return (
        <Card>
            <CardHeader>
                <MessageSquare />
                <h2>5 Comment</h2>
            </CardHeader>
            <CardContent>
                <form>
                    <Controller
                        control={form.control}
                        name="body"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel className="text-base">
                                    Full Name
                                </FieldLabel>

                                <Input
                                    {...field}
                                    placeholder="Share Your Thoughts"
                                    aria-invalid={fieldState.invalid}
                                    className="h-11"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Button>Submit</Button>
                </form>
            </CardContent>
        </Card>
    )
}
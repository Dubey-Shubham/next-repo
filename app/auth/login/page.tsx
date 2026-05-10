"use client";

import { loginSchema, signUpSchema } from "@/app/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        startTransition(async () => {
            await authClient.signIn.email({
                email: data.email,
                password: data.password,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Logout In successfully")
                        router.push("/")
                    },
                    onError: (error) => {
                        toast.success(error.error.message)
                    }
                }
            })
        })
    };

    return (
        <Card className="px-2">
            <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Sign-Up</CardTitle>
                <CardDescription >
                    Login
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >

                    <Controller
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel className="text-lg">Email</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="Enter your Email" type="email" {...field} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="password"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel className="text-lg">Password</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="Enter your Password" type="password" {...field} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Button type="submit" disabled={isPending} className="w-full text-lg py-5">
                        {isPending ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                <span>
                                    Loading...
                                </span>
                            </>
                        ) : (
                            <span>Login</span>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
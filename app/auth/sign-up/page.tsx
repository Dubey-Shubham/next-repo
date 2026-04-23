"use client";

import { signUpSchema } from "@/app/schemas/auth";
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

export default function SignUpPage() {
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        console.log("Form Data:", data);
        await authClient.signUp.email({
            email: data.email,
            name: data.name,
            password: data.password
        })
    };

    return (
        <Card className="px-2">
            <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Sign-Up</CardTitle>
                <CardDescription >
                    Create an account to get started
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <Controller
                        control={form.control}
                        name="name"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel className="text-lg">Name</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="Enter your name" {...field} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

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

                    <Button type="submit" className="w-full text-lg py-5">
                        Sign Up
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
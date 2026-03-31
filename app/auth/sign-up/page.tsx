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

export default function SignUpPage() {
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
        },
    });

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign-Up</CardTitle>
                <CardDescription>
                    Create an account to get started
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <Controller
                        control={form.control}
                        name="name"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Name</FieldLabel>
                                <Input placeholder="Enter your name" {...field} />
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
                                <FieldLabel>Email</FieldLabel>
                                <Input placeholder="Enter your Email" type="email" {...field} />
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
                                <FieldLabel>Email</FieldLabel>
                                <Input placeholder="Enter your Password" type="password" {...field} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
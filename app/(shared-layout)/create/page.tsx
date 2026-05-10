"use client"

import { postSchema } from "@/app/schemas/blog"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function CreateRoute() {
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  })

  const onSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <div className="min-h-screen bg-muted/40 py-10 px-4">
      <div className="mx-auto max-w-3xl space-y-6">
        
        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Create Post
          </h1>

          <p className="text-muted-foreground text-lg">
            Create your own blog article and share your thoughts.
          </p>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg border">
          <CardHeader>
            <CardTitle className="text-2xl">
              Create Blog Article
            </CardTitle>

            <CardDescription>
              Fill in the details below to publish a new article.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FieldGroup className="space-y-6">
                
                {/* Title Field */}
                <Controller
                  control={form.control}
                  name="title"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel className="text-base">
                        Blog Title
                      </FieldLabel>

                      <Input
                        {...field}
                        placeholder="Enter blog title"
                        aria-invalid={fieldState.invalid}
                        className="h-11"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Content Field */}
                <Controller
                  control={form.control}
                  name="content"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel className="text-base">
                        Blog Content
                      </FieldLabel>

                      <Textarea
                        {...field}
                        placeholder="Write your article content here..."
                        aria-invalid={fieldState.invalid}
                        className="min-h-[220px] resize-none"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-11 text-base"
                >
                  Publish Article
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
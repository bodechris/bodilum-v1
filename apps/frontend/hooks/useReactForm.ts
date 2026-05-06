"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  type DefaultValues,
  type FieldValues,
  type Resolver,
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from "react-hook-form";

type ResolverSchema = Parameters<typeof zodResolver>[0];

type UseReactFormOptions<TValues extends FieldValues> = Omit<
  UseFormProps<TValues>,
  "resolver" | "defaultValues"
> & {
  defaultValues?: DefaultValues<TValues>;
  schema: ResolverSchema;
};

export default function useReactForm<TValues extends FieldValues>(
  options: UseReactFormOptions<TValues>,
): UseFormReturn<TValues, unknown, TValues> {
  const { schema, defaultValues, ...rest } = options;

  return useForm<TValues, unknown, TValues>({
    ...rest,
    defaultValues,
    resolver: zodResolver(schema) as Resolver<TValues, unknown, TValues>,
  });
}

export type ReactFormValues = FieldValues;
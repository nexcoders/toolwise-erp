
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";

interface FormFieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "textarea" | "select" | "date";
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: any;
}

interface FormComponentProps {
  title: string;
  description?: string;
  fields: FormFieldConfig[];
  onSubmit: (data: any) => void;
  defaultValues?: Record<string, any>;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
}

const FormComponent: React.FC<FormComponentProps> = ({
  title,
  description,
  fields,
  onSubmit,
  defaultValues = {},
  submitLabel = "Salvar",
  cancelLabel = "Cancelar",
  onCancel,
}) => {
  // Dynamically create schema based on fields
  const formSchema = z.object(
    fields.reduce<Record<string, z.ZodTypeAny>>((acc, field) => {
      let validator;
      
      if (field.type === "number") {
        validator = z.number();
        if (typeof field.min === "number") validator = validator.min(field.min);
        if (typeof field.max === "number") validator = validator.max(field.max);
      } else if (field.type === "email") {
        validator = z.string().email();
      } else if (field.type === "select") {
        validator = z.string();
      } else {
        validator = z.string();
        if (field.required) validator = validator.min(1, { message: "Campo obrigatório" });
      }
      
      if (!field.required) {
        validator = validator.optional();
      }
      
      return { ...acc, [field.name]: validator };
    }, {})
  );

  // Set up the form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  // Handle form submission
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
  };

  return (
    <div className="space-y-6">
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      {description && <p className="text-muted-foreground">{description}</p>}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            {fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      {field.type === "textarea" ? (
                        <Textarea
                          placeholder={field.placeholder}
                          {...formField}
                        />
                      ) : field.type === "select" ? (
                        <Select
                          defaultValue={formField.value}
                          onValueChange={formField.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          type={field.type}
                          placeholder={field.placeholder}
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          {...formField}
                          value={
                            field.type === "number" 
                              ? formField.value === undefined ? "" : formField.value 
                              : formField.value
                          }
                          onChange={e => {
                            if (field.type === "number") {
                              const value = e.target.value === "" ? undefined : Number(e.target.value);
                              formField.onChange(value);
                            } else {
                              formField.onChange(e);
                            }
                          }}
                        />
                      )}
                    </FormControl>
                    {field.description && (
                      <FormDescription>{field.description}</FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          
          <div className="flex justify-end gap-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                {cancelLabel}
              </Button>
            )}
            <Button type="submit">{submitLabel}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormComponent;

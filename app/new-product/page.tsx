"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Wrapper from "@/components/Wapper";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { readCategories } from "../actions/category.actions";
import { createProduct } from "../actions/product.actions";
import { ProductFormValues, productSchema } from "../type";
import ProductImage from "@/components/ProductImage";
import { FileImage } from "lucide-react";

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const email = user?.primaryEmailAddress?.emailAddress as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      unit: "",
      // imageUrl: "",
    },
  });

  async function handleSubmit(values: ProductFormValues) {
    if (!file) {
      toast.error("Veuillez sélectionner une image");
      return;
    }

    try {
      const imageData = new FormData();
      imageData.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: imageData,
      });
      const data = await response.json();

      if (data.success) {
        const productData = { ...values, imageUrl: data.path };
        await createProduct(productData, email);
        toast.success("Produit créé avec succès");
        router.push("/products");
      } else {
        toast.error("Erreur lors de l'upload de l'image");
      }
    } catch (error) {
      toast.error("Erreur lors de la création du produit");
      console.error(error);
    }
  }

  useEffect(
    function () {
      async function fetchCategories(email: string) {
        try {
          if (email) {
            const data = await readCategories(email);
            if (data) setCategories(data);
          }
        } catch (error) {
          console.error(error);
        }
      }

      fetchCategories(email);
    },
    [email],
  );

  console.log("form errors", form.formState.errors);

  return (
    <Wrapper>
      <div className="flex items-center justify-start">
        <div>
          <h1 className="my-4 text-xl font-bold md:text-2xl">
            Nouveau produit
          </h1>

          <section className="my-10 flex flex-col gap-8 md:flex-row">
            <div className="md:w-[400px]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="flex max-w-[450px] flex-col justify-center gap-3"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Price"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? ""
                                  : Number(e.target.value),
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catégorie</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full py-5">
                              <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {categories.map((category) => (
                                  <SelectItem
                                    key={category.id}
                                    value={category.id}
                                  >
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unite</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full py-5">
                              <SelectValue placeholder="Sélectionner une unité" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="gramme">Gramme</SelectItem>
                                <SelectItem value="kilogramme">
                                  Kilogramme
                                </SelectItem>
                                <SelectItem value="litre">Litre</SelectItem>
                                <SelectItem value="metre">Mètre</SelectItem>
                                <SelectItem value="centimetre">
                                  Centimètre
                                </SelectItem>
                                <SelectItem value="heure">Heure</SelectItem>
                                <SelectItem value="pieces">Pièces</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        className="flex h-12 w-full items-center justify-center pt-2.5 text-center"
                        style={{ fontSize: "1.1rem" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFile(file);
                            setPreviewUrl(URL.createObjectURL(file));
                          } else {
                            setFile(null);
                            setPreviewUrl(null);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <Button className="w-full" type="submit">
                    Créer le produit
                  </Button>
                </form>
              </Form>
            </div>

            <div className="border-primary mt-8 flex items-center justify-center rounded-3xl border-2 p-5 md:mt-0 md:h-[300px] md:w-[300px]">
              {previewUrl && previewUrl !== "" ? (
                <div className="mt-4 flex items-center justify-center">
                  <ProductImage
                    src={previewUrl}
                    alt="Aperçu de l'image"
                    heihtClass="h-60"
                    widthClass="w-60"
                  />
                </div>
              ) : (
                <div className="wiggle-animation">
                  <FileImage className="h-24 w-24" />
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </Wrapper>
  );
}

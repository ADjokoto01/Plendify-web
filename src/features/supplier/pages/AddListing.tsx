import { DoubleButton, Input, Text } from "@/components";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Icon } from "@/lib";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import currencies from "@/data/Common.currency.json";
import { useFindSubCategories, useGetCategories } from "@/features/website";
import { useAddListing, useUploadListingImage } from "../hooks/listing";
import { toast } from "react-toastify";
import { useGetShop } from "../hooks";
import { useGetVisitorsIP, useGetLocationFromIP } from "@/features/website";
import { ROUTES } from "@/utils";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../components";
const schema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  category_id: z.string().min(1, { message: "Category is required" }),
  sub_category_ids: z.string().min(1, { message: "Sub category is required" }),
  youtube_video_url: z.string().optional(),
  description: z.string().min(1, { message: "Description is required" }),
  product_details: z.string().min(1, { message: "Item details are required" }),
  product_instructions: z.string().optional(),
  stock_quantity: z.string().min(1, { message: "Quantity is required" }),
  currency: z.string().min(1, { message: "Currency is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  sku: z.string().optional(),
  weight: z.string().min(1, { message: "Weight is required" }),
  dimensions: z.object({
    width: z.string().min(1, { message: "Width is required" }),
    height: z.string().min(1, { message: "Height is required" }),
    length: z.string().min(1, { message: "Length is required" }),
  }),
});

type ImageFile = {
  file: File;
  preview: string;
  id: string;
};

export const AddListing = () => {
  const navigate = useNavigate();
  const [images, setImages] = React.useState<ImageFile[]>([]);
  const { data: ipAddressData } = useGetVisitorsIP();
  const { data: locationData } = useGetLocationFromIP(
    ipAddressData?.data?.ip || ""
  );

  const fileInputRef = useRef(null);
  const [step, setStep] = React.useState(1);
  const { AddListing, isPending } = useAddListing();
  const { mutateAsync, isPending: isUploadListingImagePending } =
    useUploadListingImage();
  const { data: categories } = useGetCategories();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      currency: locationData?.data?.currency || "USD",
    },
  });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);

  React.useEffect(() => {
    setValue("currency", locationData?.data?.currency || "USD");
  }, [locationData?.data?.currency]);

  const { data: subCategories } = useFindSubCategories(watch("category_id"));
  const { data: shop } = useGetShop();

  const onSubmit = async (data: any) => {
    try {
      if (images.length === 0) {
        toast.error("Please add at least one image");
        return;
      }

      const {
        category_id,
        sub_category_ids,
        currency,
        stock_quantity,
        price,
        dimensions,
        weight,
        ...rest
      } = data;
      AddListing(
        {
          ...rest,
          shop_id: shop?.shop?.id,
          category_id,
          sub_category_ids: [sub_category_ids],
          // image_urls: responseFromFiles.map((image: any) => image.key),
          currency: currencies[currency as keyof typeof currencies].code,
          stock_quantity: parseInt(stock_quantity),
          price: parseFloat(price),
          weight_unit: "kg",
          weight: parseFloat(weight),
          dimensions: {
            width: parseFloat(dimensions.width),
            height: parseFloat(dimensions.height),
            length: parseFloat(dimensions.length),
            unit: "cm",
          },
        },
        {
          onSuccess: async (response) => {
            const filesUploaded = await Promise.all(
              images.map((file: any) => {
                const formData = new FormData();
                formData.append("files", file.file);
                formData.append("folder", "products");
                formData.append("fileType", "image");
                formData.append("referenceId", response.data.product.id);
                formData.append("referenceType", "product");

                return new Promise((resolve, reject) => {
                  mutateAsync(formData).then((data) => {
                    if (data) {
                      responseFromFiles.push(...data.data.files);
                      resolve(data);
                      setIsSuccessModalOpen(true);
                    } else {
                      reject(new Error("No IMAGE DATA RETURNED"));
                    }
                  });
                });
              })
            );

            if (filesUploaded.length !== images.length) {
              throw new Error("Some images failed to upload.");
            }
          },
          onError: () => toast.error("Failed to add listing"),
        }
      );

      // eslint-disable-next-line prefer-const
      let responseFromFiles: any[] = [];
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      (fileInputRef.current as HTMLInputElement).click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      // Limit to a maximum of 10 images
      const newImages = [...images];
      files.forEach((file: any) => {
        if (newImages.length < 10) {
          newImages.push({
            file,
            preview: URL.createObjectURL(file),
            id: Date.now() + Math.random().toString(36).substring(7),
          });
        }
      });
      setImages(newImages);
    }
    // Reset the input so the same file can be selected again
    e.target.value = "";
  };

  const removeImage = (id: string) => {
    const updatedImages = images.filter((image: any) => image.id !== id);
    setImages(updatedImages);
  };

  const handleContinue = () => {
    setStep(step + 1);
  };

  const categoryOptions = categories?.categories.map((category: any) => ({
    label: category.name,
    value: category.id,
  }));

  const subCategoryOptions = subCategories?.categories.map((category: any) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4 max-w-[942px] w-full justify-center items-center mx-auto">
        <Text variant="h1">Add a listing</Text>
        <Text variant="p" className="text-grey-600">
          Add some photos and details about your item. Fill out what you can for
          now—you’ll be able to edit this later.{" "}
          <span className="underline text-black">
            Learn more about what types of items are allowed on Plendify.
          </span>
        </Text>
        <div className="bg-grey-300 p-5">
          <Text variant="h4" weight="medium">
            Plendify is a place for unique and creative goods
          </Text>
          <Text variant="p">
            Our policies help us protect what’s special about our suppliers’
            items. Make sure your item can be sold on our marketplace, and don’t
            use stock images or other photos you found on the internet. Keep in
            mind, if you don’t follow our policies, we may need to remove your
            listings, or suspend your account.{" "}
            <span className="underline">Our Suppliers Policy</span>
          </Text>
        </div>
      </div>
      <section className="grid md:grid-cols-2 gap-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 py-10 flex flex-col gap-4"
        >
          <Text variant="p" weight="extrabold">
            About
          </Text>
          <Input
            placeholder="Product Title *"
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            placeholder="YouTube Video URL (optional)"
            {...register("youtube_video_url")}
            error={errors.youtube_video_url?.message}
          />
          <div className="flex flex-col gap-2">
            <Text variant="span" className="text-grey-200">
              Photo and video
            </Text>
            <Text variant="span">Add up to 10 photos and 1 video.</Text>
          </div>

          <div>
            <div className="flex flex-wrap gap-4">
              {/* Upload button */}
              <div
                className="border-2 border-dashed border-gray-300 p-4 w-20 h-20 flex justify-center items-center cursor-pointer hover:bg-gray-50"
                onClick={handleFileClick}
              >
                <Icon
                  icon="mdi:camera-image"
                  className="text-brand-primary text-xl"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Display uploaded images */}
              {images.map((image: any) => (
                <div key={image.id} className="relative w-20 h-20">
                  <img
                    src={image.preview}
                    alt="Product"
                    className="w-full h-full object-cover border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center -mt-2 -mr-2"
                  >
                    ×
                  </button>
                </div>
              ))}

              <Text variant="span" className="text-grey-200">
                Supported formats are *.jpg and *.png
              </Text>

              <div className="bg-grey-300 p-5">
                <Text variant="h4" weight="medium">
                  We found that listings with video get twice as many orders as
                  listings with just photos
                </Text>
                <Text variant="p">
                  ess than 28% of sellers have listings with video—it may help
                  you stand out! Learn about{" "}
                  <span className="underline">
                    3 Types of Listing Videos That Online Shoppers Love.
                  </span>
                </Text>
              </div>

              <div className="flex flex-col gap-1">
                <Text variant="span" className="text-grey-200">
                  Thumbnail
                </Text>
                <Text variant="span">
                  The thumbnail is a cropped version of your primary photo. It’s
                  what buyers see in Plendify search, recommendations, and on
                  your shop home page.
                </Text>
              </div>

              {images[0] && (
                <div className="w-full h-40 bg-grey-300">
                  <img
                    src={images[0].preview}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1">
                <Input
                  type="textarea"
                  placeholder="Product Description *"
                  {...register("description")}
                  error={errors.description?.message}
                />
                <Text variant="span" className="px-4 text-grey-200">
                  What makes your item special? Buyers will only see the first
                  few lines unless they expand the description.
                </Text>
              </div>

              <div className="flex flex-col col-span-full w-full gap-1">
                <Input
                  type="textarea"
                  className="col-span-full w-full"
                  placeholder="Product details *"
                  {...register("product_details")}
                  error={errors.product_details?.message}
                />
                <div className="flex flex-col gap-1">
                  <Text variant="span" className="px-4 text-grey-200">
                    Include key details like size, scent notes, fragrance type,
                    and packaging.
                  </Text>
                  <Text variant="span" className="px-4 text-grey-200">
                    e.g., Size: 50ml, Fragrance Type: Eau de Parfum, Top Notes:
                    Jasmine, Pear
                  </Text>
                </div>
              </div>

              <div className="flex flex-col col-span-full w-full gap-1">
                <Input
                  type="textarea"
                  className="col-span-full w-full"
                  placeholder="Instructions to buyers for product use (optional)"
                  {...register("product_instructions")}
                  error={errors.product_instructions?.message}
                />
                <div className="flex flex-col gap-1">
                  <Text variant="span" className="px-4 text-grey-200">
                    Instructions for buyers
                  </Text>
                  <Text variant="span" className="px-4 text-grey-200">
                    Enter the personalization instructions you want buyers to
                    see.
                  </Text>
                </div>
              </div>
            </div>
          </div>

          <section className="py-10 border-y border-y-grey-100 mt-12 gap-4 grid">
            <Text variant="p" weight="extrabold">
              Categories
            </Text>

            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category *" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions?.map((option: any) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <Controller
              name="sub_category_ids"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a sub category *" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategoryOptions?.map((option: any) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </section>

          <section className="py-10 border-b border-b-grey-100 gap-4 grid">
            <Text variant="p" weight="extrabold">
              Price & Inventory
            </Text>
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <Select
                  disabled
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger disabled className="col-span-full w-full">
                    <SelectValue placeholder="Select a currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(currencies).map((currency: string) => (
                      <SelectItem key={currency} value={currency}>
                        {currencies[currency as keyof typeof currencies].name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Input
              placeholder="Price *"
              type="number"
              {...register("price")}
              error={errors.price?.message}
            />
            <Input
              placeholder="Quantity in stock *"
              type="number"
              {...register("stock_quantity")}
              error={errors.stock_quantity?.message}
            />
            <Input
              placeholder="SKU (optional)"
              {...register("sku")}
              error={errors.sku?.message}
            />
          </section>

          <section className="py-10 border-b border-b-grey-100 gap-4 grid">
            <Text variant="p" weight="extrabold">
              Product Details
            </Text>

            <Input
              placeholder="Weight in kg *"
              type="number"
              {...register("weight")}
              error={errors.weight?.message}
            />
            <Input
              placeholder="Width in cm *"
              type="number"
              {...register("dimensions.width")}
              error={errors.dimensions?.width?.message}
            />
            <Input
              placeholder="Height in cm *"
              type="number"
              {...register("dimensions.height")}
              error={errors.dimensions?.height?.message}
            />
            <Input
              placeholder="Length in cm *"
              type="number"
              {...register("dimensions.length")}
              error={errors.dimensions?.length?.message}
            />

            <div className="flex gap-4">
              <DoubleButton
                onClick={() => setStep(1)}
                variant="outline"
                size="lg"
                className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white rounded-none w-full cursor-pointer"
              >
                Back
              </DoubleButton>
              <DoubleButton
                onClick={handleContinue}
                disabled={isPending || isUploadListingImagePending}
              >
                Save and Continue
              </DoubleButton>
            </div>
          </section>
        </form>
        <div className="flex flex-col gap-4 py-10 border-t border-t-grey-100">
          <Text variant="p" className="text-grey-200">
            Add some photos and details about your item. Fill out what you can
            for now-you'll will be able to edit this later
          </Text>
          <div className="p-5 bg-grey-300 flex flex-col gap-1">
            <Text variant="h4" weight="medium">
              Plendify is a place for unique and creative goods
            </Text>
            <Text variant="p">
              Our policies help us protect what’s special about our sellers’
              items. Make sure your item can be sold on our marketplace, and
              don’t use stock images or other photos you found on the internet.
              Keep in mind, if you don’t follow our policies, we may need to
              remove your listings, or suspend your account.
              <span
                className="underline"
                onClick={() => navigate(ROUTES.TERMS_CONDITIONS)}
              >
                Our Seller Policy
              </span>
            </Text>
          </div>
        </div>
      </section>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        setIsOpen={setIsSuccessModalOpen}
        title="Successfully Added Listing"
        description="Thank you for adding a listing. Your listing is now live on our marketplace."
        successImage="https://plus.unsplash.com/premium_photo-1664202526047-405824c633e7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvcmV8ZW58MHx8MHx8fDA%3D"
        buttonText="Return to Listings"
        route={ROUTES.SELLERS.ADD_LISTING}
      />
    </div>
  );
};

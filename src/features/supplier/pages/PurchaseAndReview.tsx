import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reviews } from "../components";
import { Purchases } from "../components/purchases";

export const PurchaseAndReview = () => {
  return (
    <div className="py-10">
      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="p-[2px] bg-[#F2F2F3] h-[49px] rounded-none w-full">
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
        </TabsList>
        <TabsContent value="reviews">
          <Reviews />
        </TabsContent>
        <TabsContent value="purchases">
          <Purchases />
        </TabsContent>
      </Tabs>
    </div>
  );
};

import { Text } from "@/components";

export const ShippingReturnsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-b border-gray-200 pb-4">
        <Text variant="h1">Shipping & Returns</Text>
      </div>

      <div className="flex flex-col gap-4">
        <Text variant="p">
          For you to consider a return, it means you have purchased an item from
          our Marketplace and we thank you for that!
        </Text>
        <Text variant="p">
          All items that are purchased and not opened or used (with the
          exception of any clothing & apparel & footwear) can be returned within
          30 days of purchase. Items must be in original condition with no
          evidence of usage, wear or tear. Kindly call our Client Success
          Advisor team on between 8:00 am and 8:00pm Monday through Friday to
          facilitate all returns back to Plendify.
        </Text>
        <Text variant="p">
          Any items regardless of the condition can not be returned if the 90
          day window from date of purchase has elapsed. Chat with us for
          assistance.
        </Text>
      </div>
    </div>
  );
};

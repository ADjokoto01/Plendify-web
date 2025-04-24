import { Text } from "@/components";

export const RefundPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-b border-gray-200 pb-4">
        <Text variant="h1">Refund Policy</Text>
      </div>

      <div className="flex flex-col gap-4">
        <Text variant="p">
          At Plendify, customer satisfaction is our biggest priority.
        </Text>
        <Text variant="p">
          As a result for any valid reason, you would like a refund, our Client
          Success Advisor team will happily assist you.
        </Text>
        <Text variant="p">
          At the Plendify Marketplace, we will be able to provide you with
          Plendify Credits that have a monetary value, which you can utilize
          within 6 months to purchase any item on the Marketplace equivalent to
          the monetary value of the item. Chat with us for assistance.
        </Text>
      </div>
    </div>
  );
};

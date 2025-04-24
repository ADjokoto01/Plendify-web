import { Text } from "@/components";

export function ShippingFees() {
  return (
    <main className="flex flex-col p-8 gap-12 shadow-md">
      <div className="flex flex-col gap-4">
        <Text variant="h1">Understanding shipping rates</Text>
        <Text variant="p">
          Shipping rates are what you charge your customer in addition to the
          cost of the products that they order. The cost of any shipping rates
          are added to a customer's order at checkout.
        </Text>
        <Text variant="p">
          You can set up one or more shipping rates for your customers to choose
          from.
        </Text>
        <Text variant="p">
          When you create shipping rates, you can also specify any restrictions
          or rules around which shipping methods are available based on the
          contents of the customer's cart.
        </Text>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-4">
        <section className="flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-4">
            <Text variant="h1">
              Why our Shipping Rates are relevatively higher
            </Text>
            <div className="flex flex-col gap-2">
              <Text variant="p">
                Being based in Africa, our courier shipping costs are a bit
                higher than what you might find elsewhere in the world.
                <br />
                <br /> But when you choose to buy from us, you’re doing so much
                more than just making a purchase.
              </Text>
              <Text variant="p">
                You’re helping sustain livelihoods, create jobs, and support a
                thriving circular economy right here on the African continent.{" "}
                <br />
                <br />
                The more you shop with us, the stronger we grow—giving us the
                leverage to negotiate better shipping rates over time.
              </Text>
              <Text variant="p">
                Together, we can make a difference, so keep supporting us and be
                part of this exciting journey!
              </Text>
            </div>
          </div>
        </section>
        <div className="h-[400px]">
          <img
            src="https://images.unsplash.com/photo-1609143739217-01b60dad1c67?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNoaXBwaW5nfGVufDB8fDB8fHww"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}

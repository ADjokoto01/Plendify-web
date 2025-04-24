import { Text } from "@/components";

export const StoryPage = () => {
  return (
    <section className="flex flex-col gap-20">
      <div className="max-w-[750px] w-full items-center text-center mx-auto flex flex-col gap-4">
        <h1 className="text-brand-primary uppercase text-7xl font-bold">
          The Plendify Story
        </h1>

        <Text variant="h3" weight="normal">
          At Plendify, we believe rich landscapes and vibrant cultures hold the
          secret to extraordinary beauty and food products. We’re on a mission
          to bring you the best of the world — handcrafted, high-quality
          products made from natural and eco-friendly raw materials. From
          nourishing shea butters to bold, flavorful spices, every item we offer
          tells a story of heritage, innovation, and care.
        </Text>
      </div>

      <div className="w-full h-[573px]">
        <img
          loading="lazy"
          src="https://images.unsplash.com/photo-1660573040968-4104c5b80464?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhdXR5JTIwYmxhY2slMjB3b21lbnxlbnwwfHwwfHx8MA%3D%3D"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
        <div className="flex flex-col gap-4 max-w-[500px]">
          <Text variant="h4" weight="normal">
            Imagine a woman in Ghana, skillfully harvesting wild baobab fruit
            under the golden sun, or a farmer in Ethiopia tending to fields of
            teff with techniques passed down through generations. These are the
            hands behind our products—people who pour their pride into every jar
            and every package.
          </Text>
          <Text variant="h4" weight="normal">
            By choosing Plendify, you’re not just indulging in premium goodness;
            you’re uplifting communities, creating jobs, and supporting
            sustainable practices that honour the earth.
          </Text>
        </div>
        <div className="max-w-[700px] h-[500px] w-full">
          <img
            loading="lazy"
            src="https://images.unsplash.com/photo-1588812068981-c46370419a5c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
        <div className="max-w-[700px] h-[500px] w-full">
          <img
            loading="lazy"
            src="https://images.unsplash.com/photo-1683027301758-5a09c546a65a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHNob3AlMjBvd25lciUyMGJsYWNrJTIwYmVhdXR5fGVufDB8fDB8fHww"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 max-w-[500px] text-right">
          <Text variant="h4" weight="normal">
            We started with a simple dream: to share the world’s brilliance with
            the each other while doing good. For us, that means empowering
            everyone, men, women and youth —growers, artisans, and
            entrepreneurs—who are the heartbeat of this journey. Every purchase
            helps creates meaningful work, promote education, and equal
            opportunities, building a brighter future one product at a time.
          </Text>
          <Text variant="h4" weight="normal">
            Whether it’s our velvety moringa oils that leave your skin glowing
            or our aromatic rooibos teas that warm your soul, we’re here to
            connect you to Africa’s natural treasures. Join us as we redefine
            luxury with purpose, proving that quality and kindness can thrive
            together.
          </Text>
        </div>
      </div>
    </section>
  );
};

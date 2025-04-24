import { Text } from '@/components';

export const AddressShippingAvailable = ({
  findAvailableAddresses,
}: {
  findAvailableAddresses: any;
}) => {
  const shippingAddress = findAvailableAddresses?.shipping_addresses[0];
  return (
    <section className="flex flex-col gap-4">
      <Text weight="extrabold" variant="span">
        Delivery address
      </Text>
      <div className="flex flex-col gap-1">
        <Text variant="span" weight="normal">
          {shippingAddress.first_name} {shippingAddress.last_name}
        </Text>
        <Text variant="span" weight="normal">
          {shippingAddress.address_line1} {shippingAddress.address_line2}
        </Text>
        <Text variant="span" weight="normal">
          {shippingAddress.city}, {shippingAddress.state},{' '}
          {shippingAddress.postal_code}
        </Text>
        <Text variant="span" weight="normal">
          {shippingAddress.country}
        </Text>
        <Text variant="span" weight="normal">
          {shippingAddress.phone}
        </Text>
      </div>
    </section>
  );
};

export const AddressBillingAvailable = ({
  findAvailableAddresses,
  sameAsShipping,
}: {
  findAvailableAddresses: any;
  sameAsShipping: boolean;
}) => {
  const billingAddress = findAvailableAddresses?.billing_addresses[0];
  return (
    <>
      {sameAsShipping && (
        <div className="p-5 bg-grey-300">
          <Text variant="span">
            Your shipping and billing address are the same
          </Text>
        </div>
      )}
      {!sameAsShipping && (
        <section className="flex flex-col gap-4">
          <Text weight="extrabold" variant="span">
            Delivery address
          </Text>
          <div className="flex flex-col gap-1">
            <Text variant="span" weight="normal">
              {billingAddress.first_name} {billingAddress.last_name}
            </Text>
            <Text variant="span" weight="normal">
              {billingAddress.address_line1} {billingAddress.address_line2}
            </Text>
            <Text variant="span" weight="normal">
              {billingAddress.city}, {billingAddress.state},{' '}
              {billingAddress.postal_code}
            </Text>
            <Text variant="span" weight="normal">
              {billingAddress.country}
            </Text>
            <Text variant="span" weight="normal">
              {billingAddress.phone}
            </Text>
          </div>
        </section>
      )}
    </>
  );
};

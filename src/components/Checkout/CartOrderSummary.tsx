import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "./PriceTag";

type OrderSummaryItemProps = {
  label: string;
  value?: string;
  children?: React.ReactNode;
};

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CartOrderSummary = ({ cartData }) => {
  const [total, setTotal] = React.useState();

  React.useEffect(() => {
    const totalTemp = cartData.reduce(
      (accumulator, item) => accumulator + item.price * item.amount,
      0
    );
    setTotal(totalTemp);
    localStorage.setItem("valueCart",totalTemp);
  }, [cartData]);

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <OrderSummaryItem
          label="Subtotal"
          value={formatPrice(total, { currency: "vnd" })}
        />
        <OrderSummaryItem label="Shipping + Tax">
          <Link href="#" textDecor="underline">
            Calculate shipping
          </Link>
        </OrderSummaryItem>
        <OrderSummaryItem label="Coupon Code">
          <Link href="#" textDecor="underline">
            Add coupon code
          </Link>
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(total, { currency: "vnd" })}
          </Text>
        </Flex>
      </Stack>
      <Link href="checkout/personal_info" sx={{ width: "100%" }}>
        <Button
          w={"full"}
          colorScheme="blue"
          size="lg"
          fontSize="md"
          rightIcon={<FaArrowRight />}
        >
          Checkout
        </Button>
      </Link>
    </Stack>
  );
};

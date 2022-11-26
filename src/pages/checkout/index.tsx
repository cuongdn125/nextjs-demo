import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { CartItem } from "../../components/Checkout/CardItem";
import { CartOrderSummary } from "../../components/Checkout/CartOrderSummary";

export default function Cart() {
  const [cartData, setCartData] = React.useState([]);
  React.useEffect(() => {
    const value = localStorage.getItem("listItem");
    const data = !!value ? JSON.parse(value) : [];
    setCartData(data);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("listItem", JSON.stringify(cartData));
  }, [JSON.stringify(cartData)]);

  const onChangeQuantity = (amount: number, id: number) => {
    const newData = cartData.map((item) => {
      if (item?.id === id) {
        return { ...item, amount: amount };
      }
      return item;
    });
    setCartData(newData);
  };
  const onClickDelete = (id: number) => {
    const newData = cartData.filter((item) => item?.id !== id);
    setCartData(newData);
  };
  return (
    <Box
      maxW={{ base: "3xl", lg: "7xl" }}
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      <Stack
        direction={{ base: "column", lg: "row" }}
        align={{ lg: "flex-start" }}
        spacing={{ base: "8", md: "16" }}
      >
        <Stack spacing={{ base: "8", md: "10" }} flex="2">
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart (3 items)
          </Heading>

          <Stack spacing="6">
            {cartData.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                onChangeQuantity={onChangeQuantity}
                onClickDelete={onClickDelete}
              />
            ))}
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link color={mode("blue.500", "blue.200")}>Continue shopping</Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
}

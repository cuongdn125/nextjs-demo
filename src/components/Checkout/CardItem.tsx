import {
  CloseButton,
  Flex,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { Cloudinary } from "../../api_client/productApi";
import { CartProductMeta } from "./CartProductMeta";
import { PriceTag } from "./PriceTag";

type CartItemProps = {
  id: number;
  name: string;
  description: string;
  total: number;
  price: number;
  import_date: Date;
  post_service: string;
  cloudinarys: Cloudinary[];
  amount: number;
  onChangeQuantity?: (quantity: number, id: number) => void;
  onClickDelete?: (id: number) => void;
};

export const CartItem = (props: CartItemProps) => {
  const {
    id,
    name,
    description,
    total,
    price,
    import_date,
    post_service,
    cloudinarys,
    onChangeQuantity,
    onClickDelete,
    amount,
  } = props;

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={name}
        description={description}
        image={
          cloudinarys[0].url ||
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
        }
        isGiftWrapping={false}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{ base: "none", md: "flex" }}
      >
        {/* <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        /> */}
        <NumberInput
          maxW={20}
          min={1}
          onChange={(amount) => onChangeQuantity(parseInt(amount), id)}
          defaultValue={amount}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <PriceTag price={price} currency={'vnd'}/>
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={() => {
            onClickDelete(id);
          }}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <Link
          fontSize="sm"
          textDecor="underline"
          onClick={() => {
            onClickDelete(id);
          }}
        >
          Delete
        </Link>
        {/* <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        /> */}
        <NumberInput
          maxW={20}
          onChange={(amount) => onChangeQuantity(parseInt(amount), id)}
          defaultValue={amount}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <PriceTag price={price} />
      </Flex>
    </Flex>
  );
};

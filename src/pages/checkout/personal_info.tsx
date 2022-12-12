import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Stack,
  Checkbox,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { addDays, format } from "date-fns";
import { createNewOrder } from "../../api_client/orderApi";
import { useToast } from '@chakra-ui/react'

export default function PersonalInfo() {
  const toast = useToast()
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const [cartData, setCartData] = React.useState([]);
  React.useEffect(() => {
    const value = localStorage.getItem("listItem");
    const data = !!value ? JSON.parse(value) : [];
    setCartData(data);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("listItem", JSON.stringify(cartData));
  }, [JSON.stringify(cartData)]);

  const onSubmit = async () => {
    const formatDateImport = format(Date.now(), "yyyy-MM-dd");
    const formatDateExpire = format(addDays(Date.now(), 3), "yyyy-MM-dd");
    const productsOrder=cartData.map(product =>{
      return {
        id:product.id,
        total:product.amount
      }
    })
    const dataOrder={
      is_export:false,
      value: +localStorage.getItem('valueCart'),
      order_date:formatDateImport,
      expire_date:formatDateExpire,
      ProductList:productsOrder,
      user_name:getValues('name'),
      user_address:getValues('address'),
      user_email:getValues('email'),
      user_phonenumber:getValues('phonenumber'),
    }
    console.log(dataOrder);
    try {
      const res =await createNewOrder(dataOrder)
      console.log(res);
      toast({
        title: 'Order Success',
        description: "We've created your order for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      console.log(error)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "100px",
        }}
      >
        <FormControl
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Fill the form to fulfill checkout
          </Heading>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            placeholder="name"
            {...register("name", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="email"
            type="email"
            {...register("email", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input
            id="address"
            placeholder="address"
            {...register("address", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.address && errors.address.message}
          </FormErrorMessage>
          <FormLabel htmlFor="phonenumber">Phone number</FormLabel>
          <Input
            id="phonenumber"
            type="number"
            placeholder="phonenumber"
            {...register("phonenumber", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 9" },
            })}
          />
          <FormErrorMessage>
            {errors.phonenumber && errors.phonenumber.message}
          </FormErrorMessage>
          <Stack spacing={5} direction="row">
            <Checkbox>Thanh toán trực tiếp</Checkbox>
            <Checkbox isDisabled defaultChecked>
              Thanh toán qua VNPay
            </Checkbox>
          </Stack>
          <Button
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            sx={{
              marginTop: "4",
            }}
          >
            Confirm checkout
          </Button>
        </FormControl>
      </Box>
    </form>
  );
}

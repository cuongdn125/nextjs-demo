import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import styled from "styled-components";
import { getListProduct, getProduct, Product } from "../api_client/productApi";
import Loading from "../components/Loading";

const SpanStyled = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;
const BoxProductDetailInfo = styled(Box)`
  font-size: 16px;
  color: #1a202c;
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function ProductDetail(props: { product: Product }) {
  const product = props.product;
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  if (router.isFallback) {
    return <Loading />;
  }

  const handlAddToCart = () => {
    const value = localStorage.getItem("listItem");
    const listItemAddToCart = !!value ? JSON.parse(value) : [];
    const isExit = [...listItemAddToCart].find(
      (item) => item?.id === product.id
    );
    let newList = [];
    if (isExit) {
      newList = [...listItemAddToCart].map((item) => {
        if (item?.id === product.id) {
          return {
            ...item,
            amount: item?.amount + amount,
          };
        }
        return item;
      });
    } else {
      newList = [...listItemAddToCart, { ...product, amount }];
    }
    localStorage.setItem("listItem", JSON.stringify(newList));
    router.push("/checkout");
  };

  const images = [
    { url: "https://picsum.photos/seed/a/1600/900" },
    { url: "https://picsum.photos/seed/b/1920/1080" },
    { url: "https://picsum.photos/seed/c/1366/768" },
  ];

  return (
    <Box
      p={1}
      mx={{
        base: "10px",
        xl: "80px",
      }}
      pb={8}
    >
      <Flex
        flexDirection={{
          base: "column",
          lg: "row",
        }}
      >
        <Box
          flex={1}
          mr={{
            base: "0",
            lg: "30px",
          }}
          display={{
            base: "flex",
            md: "flex",
          }}
          border="1px solid rbga(0,0,0,0.12)"
          justifyContent={"center"}
        >
          <Image
            w={{
              base: "80%",
              md: "100%",
            }}
            // objectFit={"contain"}
            borderRadius={8}
            src={
              product.cloudinarys[0].url ||
              "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
            }
          />
        </Box>
        <Box
          flex={1}
          ml={{
            base: "0",
            lg: "30px",
          }}
          mt={{
            base: "20px",
            lg: "0px",
          }}
        >
          <Heading
            fontSize={{
              base: "24px",
              md: "36px",
              lg: "48px",
            }}
            color="#1A202C"
          >
            {product.name}
          </Heading>
          <Box fontSize="24px" mb={2}>
            ${product.price} VND
          </Box>
          <Flex alignItems="center">
            {/* <StarRatings
              rating={product.rating.rate}
              starDimension="1.8rem"
              starSpacing="1px"
              starRatedColor="#ffc107"
              numberOfStars={5}
            /> */}
            <Box fontSize="1.2rem" fontWeight="500" ml={4}>
              Total: {product.total} product
            </Box>
          </Flex>

          {/* <Box fontSize="24px" color="#718096" mt={6}>
            <SpanStyled>Category:</SpanStyled> {product.category}
          </Box> */}
          <Box fontSize="18px" color="#1A202C" mt={4}>
            {product.description}
          </Box>
          <Divider mt={8} />
          <Box w={"100%"} mt={8}>
            <Box fontSize={"18px"} color="#D69E2E" fontWeight="500">
              FEATURES
            </Box>
            <Flex
              w={"100%"}
              mt={3}
              flexDirection={{
                base: "column",
                sm: "row",
              }}
            >
              <Box flex={1}>
                <Box>Product feature 1</Box>
              </Box>
              <Box
                flex={1}
                mt={{
                  base: "30px",
                  sm: "0",
                }}
              >
                <Box>Product feature 2</Box>
              </Box>
            </Flex>
          </Box>
          <Divider mt={8} />
          <Box w={"100%"} mt={8}>
            <Box fontSize={"18px"} color="#D69E2E" fontWeight="500">
              PRODUCT DETAILS
            </Box>
            <BoxProductDetailInfo mt={4}>
              <SpanStyled>Product detail 1:</SpanStyled>
              Product detail value
            </BoxProductDetailInfo>
            <BoxProductDetailInfo mt={1}>
              <SpanStyled>Product detail 2:</SpanStyled>
              Product detail value
            </BoxProductDetailInfo>
            <Flex alignItems={"center"}>
              <Text mr={2}>Amount: </Text>
              <NumberInput
                min={1}
                onChange={(amount) => setAmount(parseInt(amount))}
                value={amount}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <Box w={"100%"} mt={8}>
              <Button
                w={"100%"}
                textTransform="uppercase"
                colorScheme="teal"
                onClick={handlAddToCart}
              >
                Add to cart
              </Button>
              <Box w={"100%"} mt={4} textAlign="center">
                2-3 business days delivery
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export async function getStaticPaths() {
  const products = await getListProduct();
  const paths = products.map((product) => ({
    params: { productId: product.id.toString() },
  }));
  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const productId = context.params.productId as string;
  const product = await getProduct(productId);
  return {
    props: {
      product,
    },
    revalidate: 30,
  };
}

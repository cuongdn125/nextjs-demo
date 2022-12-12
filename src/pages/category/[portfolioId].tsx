import { Box } from "@chakra-ui/react";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import {
  getPortfolio,
  getListProduct,
  getProductByPortfolio,
  Product,
} from "../../api_client/productApi";
import ListProduct from "../../components/ListProduct";
import Loading from "../../components/Loading";

export default function Category(props: { products: Array<Product> }) {
  const products = props.products;
  const router = useRouter();
  // const portfolioName = router.query.portfolioId as string;
  if (router.isFallback) {
    return <Loading />;
  }
  return (
    <Box w={"100%"} p={4} bg="gray.50">
      <Box
        fontSize={{
          base: "1.4rem",
          md: "1.6rem",
        }}
        fontWeight="bold"
        mb={2}
      >
        {/* {portfolioName.charAt(0).toUpperCase() + portfolioName.slice(1)} */}
      </Box>
      <Box>
        <ListProduct products={products} />
      </Box>
    </Box>
  );
}

export async function getStaticPaths() {
  const portfolios = await getPortfolio();
  const paths = portfolios.map((portfolio) => ({
    params: { portfolioId: `${portfolio.id}` },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const portfolioId = context.params.portfolioId;

  const portfolio = await getProductByPortfolio(portfolioId);
  return {
    props: {
      products: portfolio.products,
    },
    revalidate: 30,
  };
}

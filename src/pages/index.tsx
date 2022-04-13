import { Box } from "@chakra-ui/react";
import { getListProduct, Product } from "../api_client/productApi";
import ListProduct from "../components/ListProduct";

const Index = (props: { products: Array<Product> }) => {
  const products = props.products || [];
  return (
    <Box w={"100%"} p={4} bg="gray.50">
      <ListProduct products={products} />
    </Box>
  );
};

export async function getStaticProps(context) {
  const products = await getListProduct();
  return {
    props: {
      products,
    },
    revalidate: 30,
  };
}

export default Index;

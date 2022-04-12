import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import axiosClient from "../api_client/apiClient";
import { getListProduct } from "../api_client/productApi";
import ListProduct from "../components/ListProduct";
import Loading from "../components/Loading";
import NavBar from "../components/Sidebar";

const Index = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery("products", getListProduct, { keepPreviousData: true });
  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error}</div>;
  // console.log(products);
  return (
    <Box w={"100%"} p={4} bg="gray.50">
      <ListProduct products={products} />
    </Box>
  );
};

// export async function getStaticPaths() {
//   const paths = products.map((product) => ({
//     params: { productId: product.id },
//   }));
//   return {
//     paths: paths,
//     fallback: true, // false or 'blocking'
//   };
// }

// export async function getStaticProps(context) {
//   const {
//     data: products,
//     isLoading,
//     isError,
//     error,
//   } = useQuery("products", getListProduct, { keepPreviousData: true });
//   console.log(context);
//   return {
//     props: {
//       products,
//       isLoading,
//       isError,
//       error,
//     }, // will be passed to the page component as props
//   };
// }

export default Index;

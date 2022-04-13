import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { getCatergory } from "../api_client/productApi";
import MainLayout from "../components/Layouts/main";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider resetCSS theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;

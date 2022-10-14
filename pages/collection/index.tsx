import Layout from "../../Components/Layout/Layout";
import nookies from "nookies";
import CONFIG from "../../CONFIG";
import ImageCard from "../../Components/Gallery/ImageCard";
import SearchBox from "../../Components/Form/SearchBox";
import Gallery from "../../Components/Gallery/Gallery";

export default function Collection({ loggedIn, products }: any) {
  console.log(products);

  let renderCard = null;
  {
    if (products.length) {
      renderCard = (
        <Gallery>
          {products.map((item: any) => (
            <ImageCard
              id={item.id}
              key={item.id}
              name={item.title}
              inWishList={false}
              imageURL={`${CONFIG.API_URL}/product/image/${item.reduced_40}`}
            />
          ))}
        </Gallery>
      );
    } else {
      renderCard = (
        <div className="p-10 bg-gray-50 rounded-sm mt-5 text-xl text-gray-500">
          <p>No products added yet</p>
        </div>
      );
    }
  }
  return (
    <Layout isLoggedIn={loggedIn}>
      {/* Work from here */}
      <div className="h-[175px] flex items-center justify-center search-bg">
        <div className="container mx-auto px-5 lg:px-20 py-10">
          <SearchBox className="bg-white" />
        </div>
      </div>
      <div className="container mx-auto px-5 lg:px-20 py-10 mt-[20px] lg:mt-[50px]">
        <h2 className="text-[35px] lg:text-[42px] font-bold leading-[51px] text-[#464545] mb-[30px] ">
          MY COLLECTIONS
        </h2>
        {/* card start */}
        <div className="row">{renderCard}</div>
        {/* card end */}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);
  const response = await fetch(`${CONFIG.API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const data = await response.json();

  const ProductResponse = await fetch(`${CONFIG.API_URL}/mycollection/`);
  const ProductData = await ProductResponse.json();

  if (data.statusCode >= 400) {
    return {
      props: {
        loggedIn: false,
        products: ProductData || [],
        user: {},
      },
    };
  } else {
    return {
      props: {
        loggedIn: true,
        products: ProductData || [],
        user: data,
      },
    };
  }
}

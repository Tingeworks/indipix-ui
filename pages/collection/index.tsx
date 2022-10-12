import Layout from "../../Components/Layout/Layout";
import nookies from "nookies";
import CONFIG from "../../CONFIG";
import ImageCard from "../../Components/Gallery/ImageCard";
import SearchBox from "../../Components/Form/SearchBox";
export default function Collection({ loggedIn }: any) {
  let collections = [
    {
      id: 1,
      name: "Foods",
      url: "https://images.unsplash.com/photo-1665505808832-f14373ca71c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=438&q=80",
      favorite: false,
    },
    {
      id: 2,
      name: "Foods",
      url: "https://images.unsplash.com/photo-1665505808832-f14373ca71c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=438&q=80",
      favorite: true,
    },
    {
      id: 3,
      name: "Tech",
      url: "https://images.unsplash.com/photo-1665505808832-f14373ca71c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=438&q=80",
      favorite: true,
    },
    {
      id: 4,
      name: "Nature",
      url: "https://images.unsplash.com/photo-1665505808832-f14373ca71c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=438&q=80",
      favorite: true,
    },
  ];
  let renderCard = null;
  if (collections.length) {
    renderCard = collections.map((item, index) => {
      return (
        <div className="lg:col-3 md:col-4 col-12 mb-4" key={index}>
          <ImageCard
            imageURL={item.url}
            id={item.id}
            inWishList={item.favorite}
            name={item.name}
          />
        </div>
      );
    });
  } else {
    renderCard = <h2>No Data found</h2>;
  }
  return (
    <Layout isLoggedIn={loggedIn}>
      {/* Work from here */}
      <div className="lg:h-[175px] flex items-center justify-center search-bg">
        <div className="container">
          <SearchBox className="bg-white" />
        </div>
      </div>
      <div className="container lg:mt-[50px]">
        <h2 className="lg:text-[42px] lg:font-bold lg:leading-[51px] text-[#464545] mb-[30px] ">
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

  const ProductResponse = await fetch(`${CONFIG.API_URL}/product/`);
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

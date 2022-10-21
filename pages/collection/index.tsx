import Layout from "../../Components/Layout/Layout";
import nookies from "nookies";
import CONFIG from "../../CONFIG";
import ImageCard from "../../Components/Gallery/ImageCard";
import SearchBox from "../../Components/Form/SearchBox";
import Gallery from "../../Components/Gallery/Gallery";
import SEO from "../../Components/Misc/SEO";
import Image from "next/image";
import Link from "next/link";

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
      <SEO
        title="Indipix | Categories"
        description="Indipix categories"
        keywords="Indipix, categories"
      />
      {/* Work from here */}
      <div className="h-[175px] flex items-center justify-center search-bg">
        <div className="container mx-auto px-5 lg:px-20 py-10">
          <SearchBox className="bg-white" />
        </div>
      </div>
      {loggedIn ? (
        <div className="container mx-auto px-5 lg:px-20 py-10 mt-[20px] lg:mt-[50px]">
          <h2 className="text-[35px] lg:text-[42px] font-bold leading-[51px] text-[#464545] mb-[30px] ">
            MY COLLECTIONS
          </h2>
          {/* card start */}
          <div className="row">{renderCard}</div>
          {/* card end */}
        </div>
      ) : (
        <div>
          <div className="container mx-auto px-5 lg:px-20 py-10 mt-[20px] lg:mt-[50px]">
            <h2 className="text-[35px] lg:text-[42px] font-bold leading-[51px] text-[#464545] mb-[30px] ">
              Editors Collections
            </h2>
            <Gallery>
              {[
                { id: 0, pic: "kMRMcUcO81M", title: "New Year" },
                { id: 1, pic: "_6kI0qhmxc4", title: "Work From Home" },
                { id: 2, pic: "aB4BJSZoTTI", title: "World Press Day" },
                { id: 3, pic: "R98l5I6OFQY", title: "Climate Action" },
                { id: 4, pic: "tGTVxeOr_Rs", title: "Team Trees" },
                { id: 5, pic: "3hWg9QKl5k8", title: "Fest" },
              ].map((item, index) => (
                <Link href={`/collection/${item.id}`} key={item.id}>
                  <div className="relative  cursor-pointer">
                    <img
                      className="mb-3 rounded-lg"
                      key={index}
                      src={`https://source.unsplash.com/${item.pic}/`}
                    />
                    <div className="flex transition-all items-center justify-center absolute top-0 left-0 blur-0 hover:blur-3xl right-0 bottom-0 z-5 p-6 bg-[#00000038]">
                      <p className=" text-white text-2xl drop-shadow-2xl font-bold block">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </Gallery>
          </div>
        </div>
      )}
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

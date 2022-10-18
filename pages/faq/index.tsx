import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import nookies from "nookies";
import CONFIG from "../../CONFIG";
import ImageCard from "../../Components/Gallery/ImageCard";
import SearchBox from "../../Components/Form/SearchBox";
import Gallery from "../../Components/Gallery/Gallery";
import Accordion from "../../Components/Accordion/Accordion";
import { Grid } from "@nextui-org/react";
import Support from "../../Components/Support/Support";

export default function Faq({ loggedIn }: any) {
  const [id, setId] = useState(null);
  let faqData = [
    {
      id: 1,
      title: "Enim elit etiam natoque pellentesque nibh egestas.",
      content:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
    },
    {
      id: 2,
      title: "Enim elit etiam natoque pellentesque nibh egestas.",
      content:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
    },
  ];

  let supportData = [
    {
      id: 1,
      image: "/support/s1.svg",
      title: "Talk to us",
      content: "We will connect you with a customer care executive immediately",
    },
    {
      id: 2,
      image: "/support/s2.svg",
      title: "Chat with us",
      content: "Don’t worry, we respond within minutes!",
    },
    {
      id: 3,
      image: "/support/s3.svg",
      title: "Talk to us",
      content:
        "Drop us an email about your exact query and we will get back to you!",
    },
  ];

  let renderFaq = null;
  if (faqData.length) {
    renderFaq = faqData?.map((item, index) => {
      return (
        <Grid xs={12} sm={6} key={index}>
          <Accordion title={item.title} key={index} content={item.content} />
        </Grid>
      );
    });
  } else {
    renderFaq = (
      <div className="p-10 bg-gray-50 rounded-sm mt-5 text-xl text-gray-500">
        <p>No products added yet</p>
      </div>
    );
  }

  return (
    <Layout isLoggedIn={loggedIn}>
      {/* Work from here */}
      <div className="h-[289px] flex items-center justify-center search-bg">
        <div className="container mx-auto px-5 lg:px-20 py-10">
          <div className="pt[100px] pb-[30px] text-center">
            <h2 className="text-[45px] font-bold text-[#312525]">
              How can we help you?
            </h2>
          </div>
          <SearchBox className="bg-white" />
        </div>
      </div>
      <div className="container mx-auto px-5 lg:px-20 py-10 mt-[20px] lg:mt-[50px]">
        <h2 className="text-[28px] lg:text-[28px] font-bold leading-[51px] text-[#312F2F] mb-[30px] ">
          FAQs
        </h2>
        {/* card start */}
        <div className="accordion mb-[100px]">
          <Grid.Container gap={2} justify="center">
            {renderFaq}
          </Grid.Container>
        </div>
        {/* card end */}
        {/* support */}
        <h2 className="text-[#312F2F] mb-[30px] font-bold text-[28px]">
          Can’t find what you’re looking for?
        </h2>
        <div className="p-[20px] support-bg rounded-[17px] min-h-[500px]">
          <Grid.Container gap={2} justify="center">
            <Grid xs={12} sm={6}>
              <Support
                image={supportData[0].image}
                title={supportData[0].title}
                content={supportData[0].content}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Support
                image={supportData[1].image}
                title={supportData[1].title}
                content={supportData[1].content}
              />
            </Grid>
          </Grid.Container>
          <Grid.Container gap={2} justify="center">
            <Grid xs={12} sm={6}>
              <Support
                image={supportData[2].image}
                title={supportData[2].title}
                content={supportData[2].content}
              />
            </Grid>
          </Grid.Container>
        </div>
        {/* support end */}
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
  if (data.statusCode >= 400) {
    return {
      props: {
        loggedIn: false,
        user: {},
      },
    };
  } else {
    return {
      props: {
        loggedIn: true,
        user: data,
      },
    };
  }
}

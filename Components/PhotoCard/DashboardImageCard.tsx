import { parseCookies } from "nookies";
import { useState } from "react";
import CONFIG from "../../CONFIG";

export default function DashboardImageCard(props: any) {
  const { jwt } = parseCookies();

  const [downloadData, setDownloadData] = useState({
    state: 0,
    productImage: "",
  });

  const download = (id: number) => {
    fetch(`${CONFIG.API_URL}/orders/?productid=${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwt,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setDownloadData({ state: 1, ...data });
      });
  };
  return (
    <div key={props.index} className="flex flex-col">
      {props.item.id}
      <img
        className="w-36 h-36 object-cover"
        src={`${CONFIG.ROOT_URL}${props.item.thumbnail.url}`}
      />
      {downloadData.state == 0 ? (
        <a
          onClick={() => download(props.item.id)}
          className="w-full bg-red-700 px-2 text-white py-2 block mt-2 text-center"
        >
          Generate Link
        </a>
      ) : (
        <a
          target="_blank"
          rel="noreferrer"
          href={`${CONFIG.ROOT_URL}${downloadData.productImage}`}
          className="w-full bg-red-700 px-2 text-white py-2 block mt-2 text-center"
          download
        >
          Download
        </a>
      )}
    </div>
  );
}

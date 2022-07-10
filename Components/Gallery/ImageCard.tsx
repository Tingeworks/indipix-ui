interface Images {
  name: string;
  address: string;
  authorImg: string;
  galleryImg: string;
}

const ImageCard = ({ galleryImg, name, address, authorImg }: Images) => {
  return (
    <figure className="group relative rounded-xl mb-5">
      <div className="align-right absolute right-0 hidden group-hover:block ">
        <div className="flex p-4">
          <button className="bg-white/20 p-2 cursor-pointer rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button className="bg-white/20 p-2 cursor-pointer ml-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="img">
        <img className="rounded-xl mx-auto" src={galleryImg} alt={name} />
      </div>
      <div className="cursor-pointer hidden group-hover:block">
        <figcaption className="w-full flex justify-between absolute bottom-0 left-0 p-5">
          <div className="flex">
            <img
              className="w-10 rounded-full mx-auto"
              src={authorImg}
              alt={name}
            />

            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-bold text-slate-200">{name}</p>
              <p className="text-sm text-slate-200 truncate">{address.slice(0,25)}</p>
            </div>
          </div>
          <button className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </figcaption>
      </div>
    </figure>
  );
};

export default ImageCard;

import Image from "next/image";

const brandsList = [
  {
    id: 1,
    name: "apple",
    img: "https://res.cloudinary.com/dyp9wkl0p/image/upload/v1675627115/store/icons8-apple-logo-480-min_b9giln.png",
  },
  {
    id: 2,
    name: "samsung",
    img: "https://res.cloudinary.com/dyp9wkl0p/image/upload/v1675627115/store/icons8-samsung-480-min_j0tmn9.png",
  },
  {
    id: 3,
    name: "dell",
    img: "https://res.cloudinary.com/dyp9wkl0p/image/upload/v1675627115/store/icons8-dell-500-min_ks9ydr.png",
  },
  {
    id: 4,
    name: "lg",
    img: "https://res.cloudinary.com/dyp9wkl0p/image/upload/v1675627116/store/icons8-lg-electronics-a-south-korean-multinational-electronics-company-384-min_pvryvd.png",
  },
  {
    id: 5,
    name: "huawei",
    img: "https://res.cloudinary.com/dyp9wkl0p/image/upload/v1675627115/store/icons8-huawei-541-min_mxo2rm.png",
  },
  {
    id: 6,
    name: "sony",
    img: "https://res.cloudinary.com/dyp9wkl0p/image/upload/v1675627952/store/Sony_logo.svg-min_knjpnk.png",
  },
];

function Brands() {
  const renderedBrands = brandsList.map((brand) => {
    return (
      <div
        key={brand.id}
        className="flex flex-col justify-center items-center px-8 py-6 rounded-2xl bg-slate-100 cursor-pointer  duration-300 hover:drop-shadow-lg "
      >
        <Image
          src={brand.img}
          alt={brand.name}
          width={200}
          height={200}
          className="w-20 h-20 object-contain duration-500"
        />
      </div>
    );
  });

  return (
    <div className="pb-8">
      <h1 className="font-bold text-2xl pb-8">Brands you are looking for</h1>
      <div className="flex flex-row gap-16 justify-between">
        {renderedBrands}
      </div>
    </div>
  );
}

export default Brands;

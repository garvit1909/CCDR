import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation]);

const data = [
  {
    icon: "marketing.svg",
    title: "Marketing & Sale",
    count: 1526,
  },
  {
    icon: "customer.svg",
    title: "Customer Help",
    count: 185,
  },
  {
    icon: "finance.svg",
    title: "Finance",
    count: 168,
  },
  {
    icon: "lightning.svg",
    title: "Software",
    count: 1856,
  },
  {
    icon: "human.svg",
    title: "Human Resource",
    count: 165,
  },
  {
    icon: "management.svg",
    title: "Management",
    count: 965,
  },
  {
    icon: "retail.svg",
    title: "Retail & Products",
    count: 563,
  },
  {
    icon: "security.svg",
    title: "Security Analyst",
    count: 254,
  },
  {
    icon: "content.svg",
    title: "Content Writer",
    count: 142,
  },
  {
    icon: "research.svg",
    title: "Market Research",
    count: 532,
  },
];

const CategorySlider3 = ({ onCategoryClick }) => {
  return (
    <div className="swiper-container swiper-group-5 swiper">
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        loop={true}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          575: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          767: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        className="swiper-wrapper pb-25 pt-5"
      >
        {data.map((item, i) => (
          <SwiperSlide className="swiper-slide hover-up" key={i}>
            <div
              onClick={() => onCategoryClick(item.title)}
              style={{ cursor: "pointer" }}
            >
              <div className="item-logo">
                <div className="image-left">
                  <img
                    alt="jobBox"
                    src={`assets/imgs/page/homepage1/${item.icon}`}
                    style={{ marginRight: "10px" }}
                  />
                </div>
                <div className="text-info-right">
                  <h4>{item.title}</h4>
                  <p className="font-xs">
                    <p>{item.count} Problems Active</p>
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider3;

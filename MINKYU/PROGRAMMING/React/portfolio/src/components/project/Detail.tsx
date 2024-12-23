import { detailType } from '../../datas/Projects';
import Slider from 'react-slick';
import { Carousel } from 'react-bootstrap';
import '../../css/Project.css';

function Detail({ detail }: { detail: detailType[] }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        {detail.map((item, index) => (
          <div key={index} className="detail-slide">
            <h3 className="detail-title">{item.name}</h3>
            {item.image ? (
              <img src={item.image} alt={item.name} />
            ) : item.video ? (
              <video controls preload="metadata">
                <source src={item.video} type="video/mp4" />
              </video>
            ) : null}
          </div>
        ))}
      </Slider>
    </div>
    // <Carousel>
    //   {detail.map((item, index) => (
    //     <Carousel.Item className="text-center">
    //       {item.image ? (
    //         <img
    //           className="d-block mx-auto my-20"
    //           src={item.image}
    //           alt={item.name}
    //         />
    //       ) : item.video ? (
    //         <video
    //           className="d-block mx-auto my-20"
    //           controls
    //           preload="metadata"
    //         >
    //           <source src={item.video} type="video/mp4" />
    //         </video>
    //       ) : null}
    //       <Carousel.Caption>
    //         <h3>{item.name}</h3>
    //       </Carousel.Caption>
    //     </Carousel.Item>
    //   ))}
    // </Carousel>
  );
}

export default Detail;

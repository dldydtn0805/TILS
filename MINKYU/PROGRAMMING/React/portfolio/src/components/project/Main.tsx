import { mainType } from '../../datas/Projects';
import { Carousel } from 'react-bootstrap';
import Slider from 'react-slick';
import '../../css/Project.css';

function Main({ main }: { main: mainType[] }) {
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
        {main.map((item, index) => (
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
  );
}

export default Main;

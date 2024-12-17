import { detailType } from '../../datas/Projects';
import Slider from 'react-slick';
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
            <h3>{item.name}</h3>
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

export default Detail;

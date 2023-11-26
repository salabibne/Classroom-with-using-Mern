
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import tenmin from "../../public/assests/partner/10 minute.png"
import cisco from "../../public/assests/partner/cisco.png"
import udemy from "../../public/assests/partner/udemy.png"
import brainstation from "../../public/assests/partner/brainstation.png"
import arroggo from "../../public/assests/partner/arroggo.png"
import bdtask from "../../public/assests/partner/bdtask.jfif"
import tigerit from "../../public/assests/partner/tigerit.png"

const Partners = () => {
    return (
        <div style={{backgroundColor: 'rgb(34, 21, 59)'}}>
            <h2 className='text-center p-12 mb-4 text-purple-800 font-bold text-4xl'>Explore Our Trusted Partnerships: Building Success Together</h2>
            <Swiper
                slidesPerView={5}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>

                    <img width={100} className='rounded-box' src={tenmin}></img>
                    <p className='text-white py-2'>10 Minute School is a Bangladeshi online educational platform offering concise video lessons across various subjects, fostering accessible learning.</p>
                   
                </SwiperSlide>
                <SwiperSlide>
                <img  width={100} className='rounded-box' src={cisco}></img>
                <p className='text-white py-2'>Cisco is a global technology company specializing in networking, security, and collaboration solutions, playing a key role in digital transformation.</p>
                </SwiperSlide>
                <SwiperSlide>
                <img  width={100} className='rounded-box' src={udemy}></img>
                <p className='text-white py-2'>Udemy is an online learning platform with a vast array of courses, enabling individuals worldwide to acquire new skills conveniently.</p>
                </SwiperSlide>
                <SwiperSlide>
                <img  width={100} className='rounded-box' src={brainstation}></img>
                <p className='text-white py-2'>Brain Station 23 is a software development company based in Bangladesh, providing innovative solutions and services for diverse industries globally</p>
                </SwiperSlide>
                <SwiperSlide>
                <img  width={100} className='rounded-box' src={arroggo}></img>
                <p className='text-white py-2'> Get all kinds of genuine medicine from Arogga online Pharmacy at the lowest cost with the fastest delivery at your doorstep.</p>
                </SwiperSlide>
                <SwiperSlide>
                <img  width={100} className='rounded-box' src={bdtask}></img>
                <p className='text-white py-2'>BDTask is a software company based in Bangladesh, specializing in developing innovative solutions and applications for diverse business needs.</p>
                </SwiperSlide>
                <SwiperSlide>
                <img  width={100} className='rounded-box' src={tigerit}></img>
                <p className='text-white py-2'>TigerIT is a technology company based in Bangladesh. They are known for providing various IT solutions and services, including identity management, e-Government, and software development. F</p>
                </SwiperSlide>
                
            </Swiper>
        </div>
    );
};

export default Partners;
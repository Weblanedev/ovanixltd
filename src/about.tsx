import { useEffect, useState } from "react";
export default function AboutUs() {
    const [state, setState] = useState("Mission")
    const Lorem = [
        {
            id: 1,
            value: "2021",
            answer: "Since 2021, we've empowered countless industries to optimize processes and conserve energy, resulting in substantial savings in heating and cooling operations"

        },
        {
            id: 2,
            value: "+200",
            answer: "we are committed to driving tangible results and sustainability. At Counterflow, we believe in maximizing performance while minimizing environmental impact, ensuring a brighter and more efficient future for all"

        },
        {
            id: 3,
            value: "+500",
            answer: "With our innovative approach, we ensure maximum performance and sustainability, making a measurable impact on the bottom line and the environment"

        },
    ]
    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, []);
    return (
        <div>
            {/* <MetaTag title="About Us" /> */}
            <div className='flex justify-center items-center about-hero'>
                <p className='text-white text-[60px] font-[500] recoletafont'>About Us</p>
            </div>
            <div className='2xl:w-[1440px] mx-auto'>
                <div className="pt-[80px]">
                    <p className='text-center text-[30px] lg:w-[50%] mb-[20px] m-auto font-[500] recoletafont text-blue-1000'>Who We Are</p>
                    <p className='w-[90%] lg:w-[65%] text-[18px] leading-[28px] lg:text-[20px] lg:leading-[36px]  pb-[24px] m-auto text-justify  text-gray-1000 manropefont'>
                    At Counterflow, we're pioneers in leveraging technology to streamline operations and drive efficiency across industries. With a team of dedicated professionals, we specialize in providing innovative IT solutions tailored to the unique needs of our clients. From optimizing IT infrastructure and developing custom software to implementing cutting-edge data analytics and cybersecurity measures, we're committed to delivering tangible results that empower businesses to thrive in today's fast-paced digital landscape. At Counterflow, we don't just provide solutions; we forge partnerships, guiding our clients towards sustainable growth and success. With our expertise and passion for innovation, we're here to redefine what's possible in IT and operations.</p>
                    <p className='w-[90%] lg:w-[65%] text-[18px] leading-[28px] lg:text-[20px] lg:leading-[36px] pb-[24px] m-auto text-justify  text-gray-1000 manropefont'>At the heart of our approach is a commitment to understanding our clients' unique needs and objectives. Whether it's optimizing processes, enhancing security, or unlocking the full potential of data, we work collaboratively with our clients to develop tailored strategies that drive tangible results. We believe in the power of technology to transform businesses and create new opportunities for growth.

With a focus on continuous improvement and staying ahead of the curve, we invest in research and development to ensure that our solutions remain at the forefront of innovation. From cloud computing and digital transformation to cybersecurity and beyond, we offer a comprehensive suite of services designed to meet the evolving needs of modern enterprises. </p>
                </div>
                <div className='flex justify-center'>
                    <div className='pt-[24px] gap-[40px] w-[90%] h-[300px] sm:w-[720px] sm:h-[450px] lg:w-[900px] lg:h-[600px] relative'>
                        <img src='https://th.bing.com/th/id/R.ca2ebe84d3cfe02fd44b26872adc274e?rik=9Oyq1E1SECfotg&pid=ImgRaw&r=0' className='rounded-[12px]' alt=""></img>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row items-center py-[50px] sm:py-[110px] px-[20px] lg:px-[60px] xl:px-[100px] gap-[35px] lg:gap-[136px]'>
                    <div className='sm:w-[90%] lg:w-[50%]'>
                        {/* <h1 className='manropefont text-[14px] leading-[28px] font-[400] text-blue-1100'>WHAT WE OFFER</h1> */}
                        <div className='flex justify-between mb-[20px] sm:justify-center sm:gap-[50px] lg:gap-[0px] lg:justify-between sm:mb-[30px]'>
                            <h1 className={`recoletafont text-[22px] sm:text-[32px] xl:text-[40px] cursor-pointer leading-[68px] font-[600] sm:mb-[0px] sm:mt-[4px] ${state === "Mission" ? " text-blue-1000 border-b-2 border-blue-1000" : " text-gray-1000"} `} onClick={() => setState("Mission")}>Our Mission</h1>
                            <h1 className={`recoletafont text-[22px] sm:text-[32px] xl:text-[40px] cursor-pointer leading-[68px] font-[600] sm:mb-[0px] sm:mt-[4px] ${state === "Vision" ? " text-blue-1000 border-b-2 border-blue-1000" : " text-gray-1000"} `} onClick={() => setState("Vision")}>Our Vision</h1>
                        </div>
                        {
                            state === "Mission" && <p className='manropefont text-justify text-[16px] leading-[24px] sm:text-[18px] sm:leading-[36px] font-[400] text-gray-1000 w-full'>
                           To empower businesses with innovative technology solutions that optimize operations, drive efficiency, and fuel sustainable growth. Through collaboration, expertise, and a commitment to excellence, we strive to be the trusted partner that helps our clients achieve their goals and realize their full potential in the digital era.
                            </p>
                        }
                        {state === "Vision" && <p className='manropefont text-justify text-[16px] leading-[24px] sm:text-[18px] sm:leading-[36px] font-[400] text-gray-1000 w-full'>
                        To be the leading force in reshaping the future of IT and operations, delivering transformative solutions that inspire progress, unlock possibilities, and create lasting value for our clients and partners. With a relentless focus on innovation, integrity, and customer-centricity, we aim to redefine industry standards and set new benchmarks for success in the ever-evolving world of technology.
                        </p>}
                        {/* <div className='mt-[30px] lg:w-[50%]'>
                        <div className="w-[100%] h-[248px] sm:w-[500px] sm:h-[400px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[400px] relative">
                            <img src="/assets/how-we-work-two.jpg" alt="Red Triangle" className='rounded-2xl' />
                        </div>
                    </div> */}
                        {/* <Button className='text-blue-1100 text-[14px] mt-[30px] bg-blue-1200 sm:text-[18px] manropefont'>Get Started</Button> */}

                        <div className='sm:w-[100%] lg:w-[50%] block lg:hidden mt-[30px]'>
                            <div className="w-[100%] h-[248px] sm:h-[400px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[400px] relative">
                                <img src="https://th.bing.com/th/id/OIP.850iyjdYjaE7VvCUwMpiwwHaE8?rs=1&pid=ImgDetMain" alt="Red Triangle" className='rounded-2xl' />
                            </div>
                        </div>
                    </div>
                    <div className='sm:w-[90%] lg:w-[50%] hidden lg:block'>
                        <div className="w-[320px] h-[248px] sm:w-[500px] sm:h-[400px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[400px] relative">
                            <img src="https://th.bing.com/th/id/OIP.850iyjdYjaE7VvCUwMpiwwHaE8?rs=1&pid=ImgDetMain" alt="Red Triangle" className='rounded-2xl' />
                        </div>
                    </div>
                </div>

                {/* <div className='flex flex-col-reverse lg:flex-row items-center py-[50px] sm:py-[110px] px-[20px] lg:px-[20px] xl:px-[100px] gap-[35px] lg:gap-[136px]'>

                <div className="w-full h-[248px] sm:h-[400px] lg:w-[440px] lg:h-[500px] xl:w-[636px] xl:h-[450px] relative">
                    <img src="/assets/how-we-work-two.jpg" fill={true} alt="Red Triangle" className='rounded-2xl' />
                </div>
                <div>
                    <h1 className='manropefont text-[14px] leading-[28px] font-[400] text-blue-1100'>WHAT WE OFFER</h1>
                    <h1 className='recoletafont text-[32px] sm:text-[40px] leading-[68px] font-[600] sm:mb-[0px] sm:mt-[4px] text-blue-1000'>Our Vision</h1>
                    <p className='manropefont text-justify text-[16px] leading-[24px] sm:text-[18px] sm:leading-[36px] font-[400] text-gray-1000 w-full lg:w-[425px]'>
                        Our Vision is to be innovators and leaders in the concept of travel by positioning our company in the market within the best tourism companies in the world.
                    </p>
                    <Button className='text-blue-1100 text-[14px] bg-blue-1200 sm:text-[18px] manropefont'>Explore <span className='ml-[5px]'>&#8594;</span></Button>

                </div>
            </div> */}

                <div className='py-[50px] sm:pb-[50px]'>
                    <h1 className='recoletafont text-[32px] leading-[40px] lg:text-[40px] lg:leading-[68px] font-[600] mb-[8px] sm:mb-[0px] sm:mt-[4px] text-blue-1000 sm:w-[60%] text-center m-auto'>Numbers matter - so here are a few important ones</h1>
                    <div className='mt-[30px] lg:mt-[59px] px-[50px] flex flex-col lg:flex-row justify-between gap-[32px]'>
                        {Lorem.map((e, idx) => {
                            return (

                                <div className='bg-blue-1400 px-[30px] py-[57px] w-fit relative rounded-[24px]' key={idx}>
                                    <div className="w-[40px] h-[40px] relative">
                                        <img src="https://www.westgatemigrationservices.com/_next/image?url=%2Fassets%2Fimgavatar.png&w=1920&q=75" alt="Red Triangle" className='rounded-2xl' />
                                    </div>
                                    <div className='flex gap-[12px] mt-[30px] mb-[20px]'>
                                        <h1 className='recoletafont font-[600] text-[35px] leading-[24px] text-blue-1000'>{e.value}</h1>
                                    </div>
                                    <p className='manropefont text-[16px] sm:leading-[30px] text-blue-1000'>{e.answer}</p>

                                </div>

                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

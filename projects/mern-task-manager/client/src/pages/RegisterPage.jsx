import React from 'react';
import registerImage from '../assets/image/register.svg';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import RegisterForm from '../components/registerForm/RegisterForm';

const Homepage = () => {
  return (
    <>
      <section className="flex">
        <Banner image={registerImage} />
        <div className="flex-1 w-32 flex flex-col items-center justify-center h-screen">
          <RegisterForm />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Homepage;

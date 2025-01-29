import React from 'react';
import homeImage from '../assets/image/home.svg';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import LoginForm from '../components/loginForm/LoginForm';

const Homepage = () => {
  return (
    <>
      <section className="flex">
        <Banner image={homeImage} />
        <div className="flex-1 w-32 flex flex-col items-center justify-center h-screen">
          <LoginForm />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Homepage;

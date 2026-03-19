// import React from 'react'
// import Header from '../components/Header'
// import SpecialityMenu from '../components/SpecialityMenu'
// import TopDoctors from '../components/TopDoctors'
// import Banner from '../components/Banner'

// const Home = () => {
//   return (
//     <div>
//         <Header />
//         <SpecialityMenu />
//         <TopDoctors />
//         <Banner />
//     </div>
//   )
// }

// export default Home

import React, { lazy, Suspense } from "react";
import Header from '../components/Header'
const SpecialityMenu = lazy(() => import("../components/SpecialityMenu"));
const TopDoctors = lazy(() => import("../components/TopDoctors"));
const Banner = lazy(() => import("../components/Banner"));

const Home = () => {
  return (
    <Suspense fallback={<div className="text-center py-10">Please Wait...</div>}>
      <div>
        <Header />
        <SpecialityMenu />
        <TopDoctors />
        <Banner />
      </div>
    </Suspense>
  );
};

export default React.memo(Home);
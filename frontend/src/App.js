import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {NavBar} from "./components/NavBar";
import {Home} from "./pages/home/Home";
import {PackagePage} from "./pages/packages/PackagePage";
import {PackageForm} from "./pages/package/PackageForm";
import {LockerPage} from "./pages/lockers/LockerPage";

export default function App() {
  return (
      <>
        <NavBar/>
        <Routes>
            <Route index element={<Home/>}/>
            <Route path='/parcels' element={<PackagePage/>}/>
            <Route path='/parcels/:parcelId' element={<PackageForm/>}/>
            <Route path='/lockers' element={<LockerPage/>}/>
        </Routes>
      </>
  )
}

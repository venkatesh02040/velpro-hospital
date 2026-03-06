// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import './App.css';
import { Toaster } from "react-hot-toast";

import FloatingContact from "./Components/FloatingContact/FloatingContact"; // 👈 add this

import Home from './Pages/Home/Home';
import Blog from './Pages/Blogs/Blogs';
import BlogDetail from "./Pages/BlogDetails/BlogDetails";
import Contact from './Pages/Contact/Contact';
import Departments from './Pages/Departments/Departments';
import Doctors from './Pages/Doctors/Doctors';
import Gallery from './Pages/Gallery/Gallery';
import Facilities from './Pages/Facilities/Facilities';
import HealthCheckup from './Pages/HealthCheckup/HealthCheckup';
import About from './Pages/About/About';
import DepartmentDetail from './Pages/DepartmentDetail/DepartmentDetail';
import HomeCareServices from './Pages/HomeCareServices/HomeCareServices';
import DoctorDetail from './Pages/DoctorDetail/DoctorDetail';
import Careers from './Pages/Careers/Careers';
import CareerDetail from './Pages/CareerDetail/CareerDetail';
import BookingSuccess from './Pages/Success/BookingSuccess';
import Appointments from './Pages/Appointments/Appointments';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/:slug" element={<DepartmentDetail />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:slug" element={<DoctorDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/health-checkup" element={<HealthCheckup />} />
        <Route path="/homecare-services" element={<HomeCareServices />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/success/:id" element={<BookingSuccess />} />
        <Route path="/careers/:slug" element={<CareerDetail />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>

      {/* 👇 Floating Widget */}
      <FloatingContact />

    </>
  );
}

export default App;

import CategoryCarousel from './CategoryCarousel'
import HeroSection from './HeroSection'
import Navbar from './shared/Navbar'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const {user} = useSelector(store => store.auth)
  const navigate = useNavigate()

  useEffect(()=>{
    if(user?.role === "recruiter" ){
     navigate("/admin/companies")
    }
  })

  useGetAllJobs()
  return (
    <div>
      <Navbar/>

      <HeroSection />
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>



    </div>
  )
}

export default Home

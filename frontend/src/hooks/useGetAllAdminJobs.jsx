import axios from "axios"
import { useEffect } from "react"
import { JOB_API_END_POINT } from "../utils/constant"
import { useDispatch } from "react-redux"
import { setAllAdminJobs } from "../redux/jobSlice"


const useGetAdminAllJobs = () => {
     const dispatch = useDispatch()
     useEffect(()=>{
      const fetchAllAddminJobs = async() =>{
        try{
           const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs` , {withCredentials : true})
           if(res.data.success){
             dispatch(setAllAdminJobs(res.data.jobs))

           }

        }catch(error){
          console.log(error)
        }
      }
      fetchAllAddminJobs()
     },[])
}

export default useGetAdminAllJobs


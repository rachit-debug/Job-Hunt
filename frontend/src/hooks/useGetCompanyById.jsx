import axios from "axios"
import { useEffect } from "react"
import { COMPANY_API_END_POINT } from "../utils/constant"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "../redux/companySlice"



const useGetCompanyById = (comapnyId) => {
     const dispatch = useDispatch()

     useEffect(()=>{
      const fetchSingleCompany = async() =>{
        try{
           const res = await axios.get(`${COMPANY_API_END_POINT}/get/${comapnyId}` , {withCredentials : true})
           if(res.data.success){
             dispatch(setSingleCompany(res.data.company))

           }

        }catch(error){
          console.log(error)
        }
      }
      fetchSingleCompany()
     },[comapnyId,dispatch])
}

export default useGetCompanyById


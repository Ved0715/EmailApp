import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../redux/appSlice";


const useGetAllEmails = async () => {
    const dispatch = useDispatch();
    const {emails} = useSelector(store => store.app);
    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/v1/email/getallemails" ,{
                    withCredentials:true
                })
                // console.log(res.data.emails)
                dispatch(setEmails(res.data.emails));
            } catch (error) {
                console.error(error)
            }
        }
        fetchEmails();
    } , []);
};

export default useGetAllEmails;
import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import './Browse.css';
// const randomJobs = [1, 2, 45,5,7,8,44,25,3];

const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='browse-main max-w-7xl mx-auto my-10 '>
                <h1 className='font-bold text-xl ml-[2.5rem] mt-[8rem]'>Search Results
                     ({
                     allJobs.length})
                     </h1>
                <div className='browse-next grid grid-cols-3 gap-4 mt-6 ml-[2rem] w-[92rem]'>
                    {
                        allJobs.map((
                            job) => {
                            return (
                                <Job
                                key={job._id} job={job}
                                />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse
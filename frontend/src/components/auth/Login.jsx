import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useDispatch, useSelector} from 'react-redux'
import {setLoading, setUser,} from '@/redux/authSlice'
import './Login.css';


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  
  const {
    loading
    ,user
  } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(()=>{
      if(user){
          navigate("/");
      }
  },[])

  return (
    <div>
      <Navbar />

      <div className='login-main flex items-center justify-center w-full mt-6 ml-[330px]'>
        <form
          onSubmit={submitHandler}
          className=' login-form w-[620px] border border-gray-200 rounded-md p-4 my-10'
        >
          <h1 className='font-bold text-xl mb-5'>Login</h1>
          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type='email'
              value={input.email}
              name='email'
              onChange={changeEventHandler}
              placeholder='abc@gmail.com'
            />
          </div>

          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type='password'
              value={input.password}
              name='password'
              onChange={changeEventHandler}
              placeholder='*******'
            />
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className='flex items-center space-x-2'>
                <Input
                  type='radio'
                  name='role'
                  value='student'
                  id='r1'
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className='cursor-pointer peer hidden'
                />
                <Label
                  htmlFor='r1'
                  className='cursor-pointer bg-gray-200 p-2 rounded  text-gray-800  peer-checked:bg-green-500 peer-checked:text-white'
                >
                  Student
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Input
                  type='radio'
                  name='role'
                  value='recruiter'
                  id='r2'
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className='cursor-pointer peer hidden'
                />
                <Label
                  htmlFor='r2'
                  className='cursor-pointer bg-gray-200 p-2 rounded text-gray-800 peer-checked:bg-red-500 peer-checked:text-white'
                >
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? 
            <Button className='w-full my-4'>
              <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />
              Please wait{" "}
            </Button>
          : 
            <Button
              type='submit'
              variant='outline'
              className='w-full my-4 mt-[-10px] bg-[#4040e8] hover:bg-[#62fffa] text-white outline-black'
            >
              Login
            </Button>
          }
          <span className='text-sm '>
            Don't have an Account ?
            <Link to='/signup' className='text-blue-600'>
              <Button
                type='submit'
                variant='outline'
                className='submit-signup w-20 my-4 ml-[340px] bg-[#4040e8] hover:bg-[#62fffa] text-white outline-black'
              >
                Sign Up
              </Button>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;

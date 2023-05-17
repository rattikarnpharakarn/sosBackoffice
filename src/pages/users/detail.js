import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { Routes, Route, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import { ImageGroup, Image } from 'react-fullscreen-image'
import moment from 'moment';
import TextField from '@mui/material/TextField';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const Detail = () => {
    const { id } = useParams();
    const [data, setData] = useState();

    console.log(id);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg');
                const apiUrl = `http://localhost:80/SosApp/accounts/admin/user/${id}`;
                const config = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg';
                // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
                axios.get(apiUrl, { headers: { Authorization: AuthStr } })
                    .then(response => {
                        // If request is good...
                        console.log(response.data.data);
                        setData(response.data.data);

                    })
                    .catch((error) => {
                        console.log('error ' + error);
                    });
                // return data;
            } catch (error) {
                // throw new Error(error);
                console.error(error);
                return error.response;
            }
        }

        fetchData();
    }, []);

    const image = data?.imageProfile
    return (
        <div>
            <p className="text-3xl text-center mb-12">Detail</p>
            <Grid container spacing={2} className='mb-10'>
                <Grid item xs={3}>
                    <img src={`data:image/jpeg;base64,${image}`} />
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={2} className='mb-10'>
                        <Grid item xs={4}>
                            <span className='mr-5'>ชื่อจริง: </span><span className='text-2xl'>{data?.firstName}</span>
                        </Grid>
                        <Grid item xs={4}>
                            <span className='mr-5'>นามสกุล: </span><span className='text-2xl'>{data?.lastName}</span>
                        </Grid>
                        <Grid item xs={4}>
                            <span className='mr-5'>วันเกิด: </span><span className='text-2xl'>{moment(data?.birthday).format('MM/DD/YYYY')}</span>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} >
                        <Grid item xs={4}>
                            <span className='mr-5'>เบอร์โทรศัพท์: </span><span className='text-2xl'>{data?.phoneNumber}</span>
                        </Grid>
                        <Grid item xs={4}>
                            <span className='mr-5'>เพศ: </span><span className='text-2xl'>{data?.gender === 'F' ? 'Female' : 'Male'}</span>
                        </Grid>
                        <Grid item xs={4}>
                            <span className='mr-5'>สถานะ: </span><span className='text-2xl'>{data?.userRole.name}</span>
                        </Grid>
                    </Grid>



                </Grid>

            </Grid>
            <hr></hr>
            <p className='mt-2 mb-10 text-center text-xl'>Verify ID Card</p>
            <div className='w-3/6 m-auto'>
                {/* 
                <img src={`data:image/jpeg;base64,${data?.idCard?.pathImage}`} />
                <div className='text-center mb-5'>
                    <span className='mr-5'>รหัสบัตรประชาชน: </span> <span className='text-xl mb-5'>{data?.idCard?.textIDCard}</span>
                </div> */}
                {/* <TextField
                    id="outlined-multiline-static"
                    label="เหตุผลที่ไม่ให้ผ่านการยืนยันตัวตนด้วยรูปบัตรประชาชน"
                    multiline
                    rows={4}
                    variant="outlined"
                />
                <div className='text-center mt-5'>

                 <Button variant="contained" >Submit</Button>
                </div> */}
                <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <img src={`data:image/jpeg;base64,${data?.idCard?.pathImage}`} />
                        <div className='text-center mb-5'>
                            <span className='mr-5'>รหัสบัตรประชาชน: </span> <span className='text-xl mb-5'>{data?.idCard?.textIDCard}</span>
                        </div>
                    </Grid>
                    <Grid item xs={4.4}>
                        <p  className='mt-20 text-3xl text-[#16a34a]'>ยืนยันตัวตนสำเร็จ </p>
                    </Grid>
                    <Grid item xs={1} >
                        <TaskAltIcon className='text-[#16a34a] mt-20 text-4xl ' sx={{height:50}}/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Detail
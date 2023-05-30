'use client';

import RoomTable from './RoomTable'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import axios from 'axios';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


export default function Page() {
  const { useState } = React;

  const [data, setData] = useState([]);
  let [teacherNo, SetDataTeacherNo] = useState();
  let [roomNo, SetDataRoom] = useState();

  function handleOnChangeTeacher(No) {
    SetDataTeacherNo(No.target.value);
  }

  function handleOnChangeRoom(Room) {
    SetDataRoom(Room.target.value);
  }

  return (
    <div className='subBody'>
      <hr className="hrStyle"></hr>
      <Box className='scores-search'>
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
          <Grid item xs={3}>
            <TextField id="outlined-room" label="Room" type="search" onChange={handleOnChangeRoom} />
          </Grid>
          <Grid item xs={3}>
            <TextField id="outlined-teacherNo" label="TeacherNo" type="search" onChange={handleOnChangeTeacher} />
          </Grid>

          <Grid item xs={2}>
            <Button variant="contained" size="large"
              onClick={() => {
                let URL = "https://localhost:7117/api/Room";
                if (teacherNo != null && teacherNo.trim() != "") {
                  URL += "/TeacherNo/" + teacherNo;
                }
                else if (roomNo != null && roomNo.trim() != "") {
                  URL += "/RoomNo/" + roomNo;
                }
                console.log(URL);

                var responseData = [];
                axios
                  .get(URL)
                  .then(function (response) {
                    if (response.status == 200) {
                      console.log("Query success");

                      response.data.forEach(ele => {
                        let t = {
                          roomNo: ele.roomNo,
                          teacherNo: ele.teacherNo,
                        };
                        responseData.push(t);
                      });

                      console.log(responseData);
                      setData(responseData);
                    }
                    else {
                      console.log("query failed");
                      setData(responseData);
                    }
                  })
                  .catch(function (error) {
                    console.log(error.response);
                    setData(responseData);
                  });
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
      <RoomTable data={data} setData={setData} />
    </div>
  )
}
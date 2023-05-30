'use client';

import StudentTable from './StudentTable'
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
  let [studentNo, SetDataNo] = useState();
  let [firstName, SetDataName] = useState();
  let [roomNo, SetDataRoom] = useState();

  function handleOnChangeStudentNo(No) {
    SetDataNo(No.target.value);
  }

  function handleOnChangefirstName(Name) {
    SetDataName(Name.target.value);
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
            <TextField id="outlined-studentNo" label="StudnetNo" type="search" onChange={handleOnChangeStudentNo} />
          </Grid>
          <Grid item xs={3}>
            <TextField id="outlined-firstName" label="FirstName" type="search" onChange={handleOnChangefirstName} />
          </Grid>
          <Grid item xs={3}>
            <TextField id="outlined-room" label="Room" type="search" onChange={handleOnChangeRoom} />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" size="large"
              onClick={() => {
                let URL = "https://localhost:7117/api/Students";
                if (studentNo != null && studentNo.trim() != "") {
                  URL += "/No/" + studentNo;
                }
                else if (firstName != null && firstName.trim() != "") {
                  URL += "/Name/" + firstName;
                }
                else if (roomNo != null && roomNo.trim() != "") {
                  URL += "/Room/" + roomNo;
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
                          studentNo: ele.studentNo,
                          firstname: ele.firstName,
                          surname: ele.lastName,
                          dateOfBirth: ele.dateOfBirthday,
                          gender: (ele.gender == "female") ? 0 : 1,
                          roomNo: ele.roomNo,
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
      <StudentTable data={data} setData={setData} />
    </div>
  )
}
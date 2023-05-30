'use client';

import TeacherTable from './TeacherTable'
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
  let [teacherNo, SetDateNo] = useState();
  let [firstName, SetDateName] = useState();

  function handleOnChangeTeacherNo(No) {
    SetDateNo(No.target.value);
  }

  function handleOnChangefirstName(Name) {
    SetDateName(Name.target.value);
  }

  return (
    <div className='subBody'>
      <hr className="hrStyle"></hr>
      <Box className='scores-search'>
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
          <Grid item xs={3}>
            <TextField id="outlined-teacherNo" label="TeacherNo" type="search" onChange={handleOnChangeTeacherNo} />
          </Grid>
          <Grid item xs={3}>
            <TextField id="outlined-firstName" label="FirstName" type="search" onChange={handleOnChangefirstName} />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" size="large"
              onClick={() => {
                let URL = "https://localhost:7117/api/Teachers";
                if (teacherNo != null && teacherNo.trim() != "") {
                  URL += "/No/" + teacherNo;
                }
                else if (firstName != null && firstName.trim() != "") {
                  URL += "/Name/" + firstName;
                }
                console.log(URL);

                axios
                  .get(URL)
                  .then(function (response) {
                    var responseData = [];

                    response.data.forEach(ele => {
                      let t = {
                        teacherNo: ele.teacherNo,
                        firstname: ele.firstName,
                        surname: ele.lastName,
                        dateOfBirth: ele.dateOfBirthday,
                        gender: (ele.gender == "female") ? 0 : 1,
                        email: ele.email,
                      };
                      responseData.push(t);
                    });
                    setData(responseData);

                    console.log(responseData);

                  });
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
      <TeacherTable data={data} setData={setData} />
    </div>
  )
}
'use client';

import ScoreTable from './ScoreTable'
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
  let [subject1, SetDataSubject1] = useState();
  let [roomNo, SetDataRoom] = useState();
  let [subject2, SetDataSubject2] = useState();

  function handleOnChangeStudentNo(No) {
    SetDataNo(No.target.value);
  }

  function handleOnChangeSubject1(Name) {
    SetDataSubject1(Name.target.value);
  }

  function handleOnChangeRoom(Room) {
    SetDataRoom(Room.target.value);
  }

  function handleOnChangeSubject2(Name) {
    SetDataSubject2(Name.target.value);
  }

  return (
    <div className='subBody'>
      <hr className="hrStyle"></hr>
      <div className='scores-search-2columns'>
        <Grid container>
          <Grid container className='scores-search-text' direction="row" justifyContent="space-around" alignItems="center">
            <Grid item>
              <TextField id="outlined-studentNo" label="StudnetNo" type="search" onChange={handleOnChangeStudentNo} />
            </Grid>
            <Grid item>
              <TextField id="outlined-subject1" label="Subject" type="search" onChange={handleOnChangeSubject1} />
            </Grid>
          </Grid>

          <Grid container className='scores-search-text' direction="row" justifyContent="space-around" alignItems="center">
            <Grid item>
              <TextField id="outlined-room" label="Room" type="search" onChange={handleOnChangeRoom} />
            </Grid>
            <Grid item>
              <TextField id="outlined-subject2" label="Subject" type="search" onChange={handleOnChangeSubject2} />
            </Grid>
          </Grid>
        </Grid>

        <div className='scores-search-button'>
          <Button variant="contained" size="large"
            onClick={() => {
              let URL = "https://localhost:7117/api/Score";
              if (studentNo != null && studentNo.trim() != "") {
                URL += "/StudentNo/" + studentNo;
                if (subject1 != null && subject1.trim() != "") {
                  URL += "/Subject/" + subject1;
                }
              }
              else if (roomNo != null && roomNo.trim() != "") {
                URL += "/RoomNo/" + roomNo;
                if (subject2 != null && subject2.trim() != "") {
                  URL += "/Subject/" + subject2;
                }
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
                        id: ele.id,
                        studentNo: ele.studentNo,
                        subject: ele.subject,
                        score: ele.score,
                        grade: ele.grade,
                        testDate: ele.testDate,
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
        </div>
      </div>
      <ScoreTable data={data} setData={setData} />
    </div>
  )
}
import React from 'react'
import MaterialTable from "@material-table/core";
import axios from 'axios';

export default function StudentScores(props) {
  const { useState } = React;

  const columns = [
    { title: 'Id', field: 'id', initialEditValue: 0, type: 'numeric', editable:'never'},
    { title: 'Subject', field: 'subject', initialEditValue: '...' },
    { title: 'Score', field: 'score', initialEditValue: 0.0  },
    { title: 'Grade', field: 'grade', initialEditValue: 0, type: 'numeric'},
    {title: 'TestDate', field: 'testDate', type: 'date' },
    {title: 'StudentNo', field: 'studentNo' }
  ]

  return (
    <MaterialTable
      title="ExamScores"
      columns={columns}
      data={props.data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            //console.log(newData);

            let addData = {
              studentNo: newData.studentNo,
              testDate: newData.testDate,
              grade: newData.grade,
              score: newData.score,
              subject: newData.subject,
              id: newData.id
            };

            axios
              .post("https://localhost:7117/api/Score", addData, {headers: {'accept': "text/plain", 'content-Type': "application/json; charset=utf-8"}})
              .then(function (response) {
                if (response.status == 200) {

                  newData.id = response.data.id;
                  console.log("Add success", newData);
                  props.setData([...props.data, newData]);

                  resolve();
                }
                else {
                  console.log("Add failed", newData);
                  reject();
                }
              })
              .catch(function (error) {
                console.log(error.response);
              });
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            if(newData.id != oldData.id)
            {
              reject();
            }
            else
            {
              let dataUpdate = [...props.data];
              let target = dataUpdate.find((el) => el.id === oldData.id);
              let index = dataUpdate.indexOf(target);
              
              let updateData = {
                studentNo: newData.studentNo,
                testDate: newData.testDate,
                grade: newData.grade,
                score: newData.score,
                subject: newData.subject,
                id: newData.id
              };

              axios
              .put("https://localhost:7117/api/Score", updateData , {headers: {'accept': "text/plain", 'content-Type': "application/json; charset=utf-8"}})
              .then(function (response) {
                if (response.status == 200) {

                  dataUpdate[index] = newData;
                  props.setData([...dataUpdate]);

                  console.log("update success", oldData.id);

                  resolve();
                }
                else {
                  console.log("update failed", oldData.id);
                  reject();
                }
              })
              .catch(function (error) {
                console.log(error.response);
              });
            }
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            const dataDelete = [...props.data].filter(el => el.id != oldData.id);

            let url = "https://localhost:7117/api/Score/Id/" +oldData.id;
            axios
              .delete(url)
              .then(function (response) {
                if (response.status == 200) {
                  props.setData([...dataDelete]);

                  console.log("Delete success", oldData.id);
                  resolve();
                }
                else {
                  console.log("Delete failed", oldData.id);
                  reject();
                }
              })
              .catch(function (error) {
                console.log(error.response);
                });
          }),
      }}
    />
  )
}

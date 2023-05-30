import React from 'react'
import MaterialTable from "@material-table/core";
import axios from 'axios';

export default function TeacherTable(props) {
  const { useState } = React;

  const columns = [
    { title: 'TeacherNo', field: 'teacherNo', initialEditValue: '...', editable:'onAdd' },
    { title: 'FirstName', field: 'firstname', initialEditValue: '...' },
    { title: 'Surname', field: 'surname', initialEditValue: '...' },
    { title: 'DateOfBirth', field: 'dateOfBirth', type:'date' },
    {
      title: 'Gender',
      field: 'gender',
      lookup: { 0: 'female', 1: 'male' },
    },
    {title: 'Email', field: 'email', initialEditValue: '...@gmail.com' }
  ]

  return (
    <MaterialTable
      title="Teachers"
      columns={columns}
      data={props.data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            //console.log(newData);

            let addData = {
              TeacherNo: newData.teacherNo,
              firstName: newData.firstname,
              lastName: newData.surname,
              gender: newData.gender == 0 ? "female" : "male",
              dateOfBirthday: newData.dateOfBirth,
              email: newData.email
            };

            axios
              .post("https://localhost:7117/api/Teachers", addData, {headers: {'accept': "text/plain", 'content-Type': "application/json; charset=utf-8"}})
              .then(function (response) {
                if (response.status == 200) {
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
            if(newData.teacherNo != oldData.teacherNo)
            {
              reject();
            }
            else
            {
              let dataUpdate = [...props.data];
              let target = dataUpdate.find((el) => el.teacherNo === oldData.teacherNo);
              let index = dataUpdate.indexOf(target);
              
              let updateData = {
                TeacherNo: newData.teacherNo,
                firstName: newData.firstname,
                lastName: newData.surname,
                gender: newData.gender == 0 ? "female" : "male",
                dateOfBirthday: newData.dateOfBirth,
                email: newData.email
              };

              axios
              .put("https://localhost:7117/api/Teachers", updateData , {headers: {'accept': "text/plain", 'content-Type': "application/json; charset=utf-8"}})
              .then(function (response) {
                if (response.status == 200) {

                  dataUpdate[index] = newData;
                  props.setData([...dataUpdate]);

                  console.log("update success", oldData.teacherNo);

                  resolve();
                }
                else {
                  console.log("update failed", oldData.teacherNo);
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
            const dataDelete = [...props.data].filter(el => el.teacherNo != oldData.teacherNo);

            axios
              .delete("https://localhost:7117/api/Teachers/No", { data: [oldData.teacherNo] })
              .then(function (response) {
                if (response.status == 200) {
                  props.setData([...dataDelete]);

                  console.log("Delete success", oldData.teacherNo);
                  resolve();
                }
                else {
                  console.log("Delete failed", oldData.teacherNo);
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

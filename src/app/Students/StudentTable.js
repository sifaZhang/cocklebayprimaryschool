import React from 'react'
import MaterialTable from "@material-table/core";
import axios from 'axios';

export default function StudentTable(props) {
  const { useState } = React;

  const columns = [
    { title: 'StudentNo', field: 'studentNo', initialEditValue: '...', editable:'onAdd' },
    { title: 'FirstName', field: 'firstname', initialEditValue: '...' },
    { title: 'Surname', field: 'surname', initialEditValue: '...' },
    { title: 'DateOfBirth', field: 'dateOfBirth', type:'date'},
    {
      title: 'Gender',
      field: 'gender',
      lookup: { 0: 'female', 1: 'male' },
    },
    {title: 'RoomNo', field: 'roomNo', initialEditValue: '' }
  ]

  return (
    <MaterialTable
      title="Students"
      columns={columns}
      data={props.data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            //console.log(newData);

            let addData = {
              StudentNo: newData.studentNo,
              firstName: newData.firstname,
              lastName: newData.surname,
              gender: newData.gender == 0 ? "female" : "male",
              dateOfBirthday: newData.dateOfBirth,
              RoomNo: newData.roomNo
            };

            axios
              .post("https://localhost:7117/api/Students", addData, {headers: {'accept': "text/plain", 'content-Type': "application/json; charset=utf-8"}})
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
            if(newData.studentNo != oldData.studentNo)
            {
              reject();
            }
            else
            {
              let dataUpdate = [...props.data];
              let target = dataUpdate.find((el) => el.studentNo === oldData.studentNo);
              let index = dataUpdate.indexOf(target);
              
              let updateData = {
                StudentNo: newData.studentNo,
                firstName: newData.firstname,
                lastName: newData.surname,
                gender: newData.gender == 0 ? "female" : "male",
                dateOfBirthday: newData.dateOfBirth,
                RoomNo: newData.roomNo
              };

              axios
              .put("https://localhost:7117/api/Students", updateData , {headers: {'accept': "text/plain", 'content-Type': "application/json; charset=utf-8"}})
              .then(function (response) {
                if (response.status == 200) {

                  dataUpdate[index] = newData;
                  props.setData([...dataUpdate]);

                  console.log("update success", oldData.studentNo);

                  resolve();
                }
                else {
                  console.log("update failed", oldData.studentNo);
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
            const dataDelete = [...props.data].filter(el => el.studentNo != oldData.studentNo);

            let url = "https://localhost:7117/api/Students/No/" +oldData.studentNo;
            axios
              .delete(url)
              .then(function (response) {
                if (response.status == 200) {
                  props.setData([...dataDelete]);

                  console.log("Delete success", oldData.studentNo);
                  resolve();
                }
                else {
                  console.log("Delete failed", oldData.studentNo);
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

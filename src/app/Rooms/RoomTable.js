import React from 'react'
import MaterialTable from "@material-table/core";
import axios from 'axios';

export default function RoomTable(props) {
  const { useState } = React;

  const columns = [
    { title: 'RoomNo', field: 'roomNo', initialEditValue: '...', editable:'onAdd' },
    { title: 'TeacherNo', field: 'teacherNo', initialEditValue: '...' },
  ]

  return (
    <MaterialTable
      title="Rooms"
      columns={columns}
      data={props.data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            //console.log(newData);

            let addData = {
              RoomNo: newData.roomNo,
              teacherNo: newData.teacherNo,
            };

            axios
              .post("https://localhost:7117/api/Room", addData, {headers: {'accept': "text/plain", 'content-Type': "application/json; charset=utf-8"}})
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
            if(newData.roomNo != oldData.roomNo)
            {
              reject();
            }
            else
            {
              let dataUpdate = [...props.data];
              let target = dataUpdate.find((el) => el.roomNo === oldData.roomNo);
              let index = dataUpdate.indexOf(target);
              
              let updateData = {
                RoomNo: newData.roomNo,
                teacherNo: newData.teacherNo,
              };

              axios
              .put("https://localhost:7117/api/Room", updateData , {headers: {'accept': "text/plain", 'content-Type': "application/json; charset=utf-8"}})
              .then(function (response) {
                if (response.status == 200) {

                  dataUpdate[index] = newData;
                  props.setData([...dataUpdate]);

                  console.log("update success", oldData.roomNo);

                  resolve();
                }
                else {
                  console.log("update failed", oldData.roomNo);
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
            const dataDelete = [...props.data].filter(el => el.roomNo != oldData.roomNo);

            let url = "https://localhost:7117/api/Room/No/" + oldData.roomNo;
            axios
              .delete(url)
              .then(function (response) {
                if (response.status == 200) {
                  props.setData([...dataDelete]);

                  console.log("Delete success", oldData.roomNo);
                  resolve();
                }
                else {
                  console.log("Delete failed", oldData.roomNo);
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

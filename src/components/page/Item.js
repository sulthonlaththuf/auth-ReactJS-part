import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import MaterialTable from 'material-table'
import UserContext from '../context/UserContext'

function Item() {
  const { userData, setUserData } = useContext(UserContext)
  const [columns, setColumns] = useState([
    { title: 'Item', field: 'item' },
    { title: 'Price', field: 'price', type: 'numeric'},
    { title: 'Stock', field: 'stock', type: 'numeric' },
    { title: 'Description', field: 'description' },
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const getItems = async() => {
      try{
        const url = "http://localhost:1337/api/items"
        const items = await axios.get(url, {
          headers : {'x-auth-token' : userData.token}
        })
        setData(items.data.result);
      }catch(err){
        console.log(err)
      }
    }

    getItems()
  }, [] );

  return (
    <MaterialTable
      title="Items"
      columns={columns}
      data={data}
      
      options={{
        actionsColumnIndex: -1
      }}
      editable={{
        onRowAdd: async (newData) => {
          try{
            const url = 'http://localhost:1337/api/items/add'
            const result = await axios.post(url, newData, {
              headers : {'x-auth-token' : userData.token}
            })
            setData([...data, newData])
          }catch(err){
            console.log(err)
          }
        },
        onRowUpdate: async (newData, oldData) => {
          try{
            const url = "http://localhost:1337/api/items/update/" + oldData._id
            const result = await axios.post(url, newData, {
              headers : {'x-auth-token' : userData.token}
            })
            const dataUpdate = [...data]
            const index = oldData.tableData.id
            dataUpdate[index] = newData
            setData([...dataUpdate])
          }catch(err){
            console.log(err)
          }
        },
        onRowDelete: async (oldData) => {
          try{
            const url = "http://localhost:1337/api/items/" + oldData._id
            const result = await axios.delete(url, {
              headers : {'x-auth-token' : userData.token}
            })
            const dataDelete = [...data];
            const index = oldData.tableData.id;
            dataDelete.splice(index, 1);
            setData([...dataDelete]);
          }catch(err){
            console.log(err)
          }
        }
      }}
    />
  )
}

export default Item


  

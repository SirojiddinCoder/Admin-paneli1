import React, { useEffect, useState } from 'react';
import './Home.css';
import { Button, Modal } from 'antd';

export const Home = () => {

  const [category, setCategory] = useState([]);
  const [open,setOpen] = useState(false)
  const [id,setId] = useState(null)

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNzkyMjA5OSwiZXhwIjoxNzQ5NDU4MDk5fQ.JmBj6V8Q7M_qY-n1Afv9QFv0wIRW2sPUtHg0rto80FU';

  const urlImg = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";
  console.log(urlImg);

  const getCategory = () => {
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategory(data.data);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);



  const handleOk=(id)=>{
    setId(id)
    setOpen(true)
  }

  const handleClose=()=>{
    setOpen(false)
  }

  const deleteCategory=(e)=>{
    e.preventDefault();
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      },
      method:"DELETE"
    })
      .then(res => res.json())
      .then(data => {

         const newCategory = category.filter((item=>item.id!==id))
         setCategory(newCategory)
    setOpen(false)
      });

  }

  return (
    <div className='container1'>
      <button type="primary"  className='add-button'>ADD CATEGORY</button>


      <table>
        <thead>
          <tr>
            <th>Name En</th>
            <th>Name Ru</th>
            <th>Images</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {category && category.map((item, index) => (
            <tr key={index}>
              <td>{item.name_en}</td>
              <td>{item.name_ru}</td>
              <td>
                <img src={`${urlImg}${item.image_src}`} alt={item.name_en} />
              </td>
              <td>
                <button className='edit-button'>Edit</button>
                <button onClick={()=>handleOk(item.id)} className='delete-button'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>  

      <Modal footer={null} title="Basic Modal" open={open} onOk={handleOk} onCancel={handleClose}>
       <p>Ochirishi xoxlayszmi ? ....</p>
       <button onClick={handleClose} className='close-button'>Bekor qilish</button>
       <button onClick={deleteCategory} className='delete-button'>O'chirish</button>
      </Modal>

    </div>
  );
};

export default Home;

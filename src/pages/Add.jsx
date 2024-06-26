import React, { useEffect, useState } from 'react';
import './Home.css';
import { Button, Modal } from 'antd';
import { toast } from 'react-toastify';

export const Home = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameEn, setNameEn] = useState('');
  const [nameRu, setNameRu] = useState('');
  const [picture, setPicture] = useState(null);
  const [Category, setCategory] = useState([]);
  const tokenxon = localStorage.getItem('accessToken');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formData = new FormData();
  formData.append("name_en", nameEn);
  formData.append("name_ru", nameRu);
  formData.append("images", picture);

  const CategoryCreate = (e) => {
    e.preventDefault();
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/categories', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${tokenxon}`
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if(data?.success === true) {
        toast.success("Muvofaqiyatli...");
        getCategory();
        handleCancel();
      } else {
        toast.error("Xatolik yuz berdi");
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
  };

  const getCategory = () => {
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/categories')
    .then((res) => res.json())
    .then((data) => {
      setCategory(data?.data);
    });
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className='container1'>
      <Button type="primary" onClick={showModal} className='add-button'>
        Category Add
      </Button>
      <Modal
        title="Category qo'shish"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form>
          <input onChange={(e) => setNameEn(e.target.value)} type="text" placeholder='name en' required />
          <input onChange={(e) => setNameRu(e.target.value)} type="text" placeholder='name ru' required />
          <input onChange={(e) => setPicture(e.target.files[0])} type="file" accept="image/*" required />
          <button onClick={CategoryCreate} className='add-button' type='button'>Qo'shish</button>
        </form>
      </Modal>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>Name_en</th>
            <th>Name_ru</th>
            <th>images</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            Category.map((item, index) => (
              <tr key={index}>
                <td>{item?.name_en}</td>
                <td>{item?.name_ru}</td>
                <td>
                  <img src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`} alt="rasm bor" />
                </td>
                <td>
                  <button className='edit-button'>Edit</button>
                  <button className='delete-button'>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Home;

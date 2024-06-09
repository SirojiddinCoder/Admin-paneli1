import React, { useEffect, useState } from 'react';
import './Home.css';
import { Button, Modal, message, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState({ name_en: "", name_ru: "", images: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNzkyMjA5OSwiZXhwIjoxNzQ5NDU4MDk5fQ.JmBj6V8Q7M_qY-n1Afv9QFv0wIRW2sPUtHg0rto80FU';
  const urlImg = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  const getCategory = () => {
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategory(data.data);
      })
      .catch(error => {
        toast.error("Xatolik yuz berdi: " + error.message);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleOk = (id) => {
    setId(id);
    setOpen(true);
  }

  const handleEdit = (item) => {
    setId(item.id);
    setOpen1(true);
    setData({ name_en: item.name_en, name_ru: item.name_ru, images: item.image_src });
  }

  const editCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_en", data.name_en);
    formData.append("name_ru", data.name_ru);
    formData.append("images", data.images);

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "PUT",
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          handleClose();
          getCategory();
          message.success("Muvafaqiyatli...");
        } else {
          message.error("Xatolik yuz berdi");
        }
      })
      .catch(error => {
        console.log(error);
        message.error("Xatolik yuz berdi");
      });
  };

  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
  }

  const deleteCategory = () => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const newCategory = category.filter((item) => item.id !== id);
          setCategory(newCategory);
          setOpen(false);
          toast.success("Muvaffaqiyatli o'chirildi");
        } else {
          toast.error("Xatolik yuz berdi");
          setOpen(false);
        }
      })
      .catch(error => {
        toast.error("Xatolik yuz berdi");
        setOpen(false);
      });
  }

  const addCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_en", data.name_en);
    formData.append("name_ru", data.name_ru);
    formData.append("images", data.images);

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          handleClose();
          getCategory();
          message.success("Muvafaqiyatli qo'shildi...");
        } else {
          message.error("Xatolik yuz berdi");
        }
      })
      .catch(error => {
        console.log(error);
        message.error("Xatolik yuz berdi");
      });
  };

  const handleAddClick = () => {
    setOpen1(true);
    setData({ name_en: "", name_ru: "", images: null });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = category.slice(startIndex, endIndex);

  return (
    <div className='container1'>
      <Button type="primary" className='add-button' onClick={handleAddClick}>ADD CATEGORY</Button>

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
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name_en}</td>
              <td>{item.name_ru}</td>
              <td>
                <img src={`${urlImg}${item.image_src}`} alt={item.name_en} />
              </td>
              <td>
                <Button onClick={() => handleEdit(item)} className='edit-button' icon={<EditOutlined />} />
                <Button onClick={() => handleOk(item.id)} className='delete-button' icon={<DeleteOutlined />} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          total={category.length}
          pageSize={itemsPerPage}
          showSizeChanger={false}
        />
      </div>

      <Modal footer={null} title="Delete" open={open} onCancel={handleClose}>
        <p>Are you sure you want to delete?</p>
        <Button onClick={handleClose} className='close-button'>Cancel</Button>
        <Button onClick={deleteCategory} className='delete-button'>Delete</Button>
      </Modal>

      <Modal footer={null} title="Add Category" open={open1} onCancel={handleClose}>
        <form onSubmit={addCategory}>
          <input onChange={(e) => setData({ ...data, name_en: e.target.value })} value={data.name_en} type="text" placeholder='Name En' required />
          <input onChange={(e) => setData({ ...data, name_ru: e.target.value })} value={data.name_ru} type="text" placeholder='Name Ru' required />
          <input onChange={(e) => setData({ ...data, images: e.target.files[0] })} type="file" accept="image/*" placeholder='Select Image' required />
          <button className='add-button' type='submit'>Add</button>
        </form>
      </Modal>
    </div>
  );
};

export default Home;

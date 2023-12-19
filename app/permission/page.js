'use client'
import { useSession } from "next-auth/react"
import { fetchData } from '@/utility/fetchData'
import React, { useEffect, useState } from 'react'
import { HiCheck, HiOutlinePencilAlt, HiOutlineTrash, HiOutlineX, HiPlus } from "react-icons/hi";
import Modal from "@/components/ui/Modal";
import { deleteData } from "@/utility/deleteData";
import { postData } from "@/utility/postData";
import { updateData } from "@/utility/updateData";

export default function Permission() {
  const { data: session } = useSession();
  const [permission, setPermission] = useState(null);
  
  const [modalState, setModalState] = useState({ isCreating: false, isEditing: false, });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = (data) => {
    setFormData(data);
    setModalState({ ...modalState, isEditing: true });
  };

  const handleDeleteClick = async (id) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${id}?`);
    if (confirmed) {
      setLoading(true);
      try {
        await deleteData(`/permissions/`, id, session);
        fetchPermissionData();
      } catch (err) {
        setError("Error deleting student");
        console.error(err);
      }
      setLoading(false);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!formData || !session?.user?.accessToken) {
      return null
    }
    setLoading(true);
    try {
      modalState.isCreating
        ? await postData("/permissions", formData, session)
        : await updateData(`/permissions/`, formData._id, formData, session);
        fetchPermissionData();
    } catch (err) {
      console.error("An error occurred:", err.message);
    } finally {
      setLoading(false);
      setFormData({});
      setModalState({ isCreating: false, isEditing: false });
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleModalCLose = () => {
    setModalState({ isCreating: false, isEditing: false });
    setFormData({})
  }

  // Create an asynchronous function to fetch the data
  const fetchPermissionData = async () => {
    try {
      // Call the fetchData function and update the state with the result
      const data = await fetchData('/permissions', session);
      setPermission(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error if needed
    }
  };

  useEffect(() => {
    if (session) {
      fetchPermissionData();
    }
  }, [session]);

  return (
    <div className="p-4 rounded-lg bg-dark-component">
      <div className="flex items-center justify-start space-x-8">
        <h1 className="font-bold text-xl py-3">Permission</h1>
        <button
          onClick={() => setModalState({ ...modalState, isCreating: true })}
          className="w-10 h-10 flex items-center justify-center text-xl 
        active:bg-gray-800 active:text-gray-100 hover:text-green-500 hover:bg-gray-700 rounded-lg">
          <span><HiPlus /></span>
        </button>
      </div>
      <table class="table-auto w-full">
        <thead className="h-16 px-4">
          <tr className="uppercase text-left">
            <th>SN</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {permission && permission.map((p, i)=>(
            <tr key={i} className="h-16 px-4 border-b border-slate-600">
              <td>{i+1}</td>
              <td>{p.perm_name}</td>
              <td>{p.perm_desc}</td>
              <td>
                <span className={`${p.isactive ? 'bg-green-600/20 text-green-500' : 'bg-rose-600/20 text-rose-500'} rounded-full px-2 py-1`}>
                  {p.isactive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="flex h-16 text-xl items-center justify-start space-x-8">
                <button
                  onClick={() => handleEditClick(p)}
                  title="Edit"
                  className="w-10 h-10 flex items-center justify-center rounded-lg
                active:bg-blue-800 active:text-gray-100 hover:text-sky-500 hover:bg-gray-700">
                  <span><HiOutlinePencilAlt /></span>
                </button>
                <button
                  onClick={() => handleDeleteClick(p._id)}
                  title="Delete"
                  className="w-10 h-10 flex items-center justify-center rounded-lg
                active:bg-gray-800 active:text-gray-100 hover:text-rose-500 hover:bg-gray-700">
                  <span><HiOutlineTrash /></span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Create and Edit modal */}
      <Modal isOpen={modalState.isCreating || modalState.isEditing}>
        <div className="flex flex-col items-center justify-center space-y-8 py-4">
          <div className="w-full flex items-center justify-between space-x-32 pb-2 border-b border-slate-600">
            <h1>{modalState.isCreating ? 'Create new permission' : 'Edit permission'}</h1>
            <button
              type="button"
              onClick={handleModalCLose}
              className="w-10 h-10 text-lg flex items-center justify-center rounded-lg
              active:bg-gray-800 active:text-gray-100 hover:text-rose-500 hover:bg-gray-700"
            >
              <HiOutlineX />
            </button>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex flex-col space-y-2">
                <span>Title:</span>
                <input
                  type="text"
                  name="perm_name"
                  value={formData?.perm_name}
                  onChange={handleInputChange}
                  required
                  className="bg-dark-bg py-2 px-1 rounded outline-none border border-slate-600 focus:ring-1 ring-primary"
                />
              </label>
              <label className="w-fit flex flex-col items-start justify-start space-y-2">
                <span>Is Active:</span>
                <div className="w-12 h-6 relative bg-dark-bg rounded-full cursor-pointer">
                  <input
                    type="checkbox"
                    name="isactive"
                    checked={formData.isactive || false}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <span 
                    className={`${formData?.isactive ? 'left-7 bg-primary' : 'left-1 bg-gray-300'}
                    absolute top-1 w-4 h-4 rounded-full transition-all duration-200`}
                  />
                </div>
              </label>
              <label className="flex flex-col space-y-2 md:col-span-2">
                <span>Description:</span>
                <textarea
                  type="text"
                  name="perm_desc"
                  value={formData?.perm_desc}
                  onChange={handleInputChange}
                  required
                  className="bg-dark-bg py-2 px-1 rounded outline-none border border-slate-600 focus:ring-1 ring-primary"
                />
              </label>
            </div>
            <div className="flex items-center justify-center w-full pt-4">
              <button
                type="submit"
                className="w-fit px-3 h-10 flex items-center justify-center text-xl space-x-3
                active:bg-gray-800 active:text-gray-100 hover:text-green-500 hover:bg-gray-700 rounded-lg">
                <span>Submit </span>
                <span><HiCheck /></span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

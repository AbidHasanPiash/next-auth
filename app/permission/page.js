'use client'
import { useSession } from "next-auth/react"
import { fetchData } from '@/utility/fetchData'
import React, { useEffect, useState } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineX, HiPlus } from "react-icons/hi";
import Modal from "@/components/ui/Modal";

export default function Permission() {
  const { data: session } = useSession();
  const [permission, setPermission] = useState(null);
  
  const [modalState, setModalState] = useState({ isCreating: false, isEditing: false, });
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEditClick = (data) => {
    setFormData(data);
    setModalState({ ...modalState, isEditing: true });
  };

  const handleDeleteClick = async (id) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${id}?`);
    if (confirmed) {
      setLoading(true);
      try {
        await deleteData(`api/v1/blog/`, id);
        fetchDataFromAPI(`api/v1/blog`, setApiBlogData);
      } catch (err) {
        setError("Error deleting student");
        console.error(err);
      }
      setLoading(false);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const prepData = new FormData();

      prepData.append("title", formData.title);
      prepData.append("category", formData.category);
      prepData.append("description", formData.description);
      prepData.append("blogImage", formData.blogImage);

      modalState.isCreating
        ? await postData("api/v1/blog", prepData, true)
        : await updateData(`api/v1/blog/`, formData.id, prepData, true);
      fetchDataFromAPI(`api/v1/blog`, setApiBlogData);
    } catch (err) {
      console.error("An error occurred:", err.message);
    } finally {
      setLoading(false);
      setFormData({});
      setModalState({ isCreating: false, isEditing: false });
    }
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

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
                  onClick={() => handleDeleteClick(p.id)}
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
              onClick={() => setModalState({ isCreating: false, isEditing: false })}
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
                  value={formData.perm_name}
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
                    value={formData.isactive}
                    onChange={handleInputChange}
                    required
                    className="sr-only peer"
                  />
                  <span 
                    className="absolute left-1 top-1 w-4 h-4 rounded-full transition-all duration-200
                    bg-gray-300 peer-checked:bg-primary peer-checked:left-7"
                  />
                </div>
              </label>
              <label className="flex flex-col space-y-2 md:col-span-2">
                <span>Description:</span>
                <textarea
                  type="text"
                  name="perm_desc"
                  value={formData.perm_desc}
                  onChange={handleInputChange}
                  required
                  className="bg-dark-bg py-2 px-1 rounded outline-none border border-slate-600 focus:ring-1 ring-primary"
                />
              </label>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

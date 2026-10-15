import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = {
  success: (message = "Success!", options = {}) => {
    toast.success(message, { position: "top-right", autoClose: 3000, ...options });
  },

  error: (message = "Something went wrong!", options = {}) => {
    toast.error(message, { position: "top-right", autoClose: 3000, ...options });
  },

  info: (message = "Info", options = {}) => {
    toast.info(message, { position: "top-center", autoClose: 3000, ...options });
  },

  Container: () => <ToastContainer 
                      position="top-center"
                      autoClose={3000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                    />,
};

export default Toast;

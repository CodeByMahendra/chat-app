

import React, { useEffect } from 'react';
import Signup from './components/Signup'; 
import Login from './components/Login';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from './redux/userSlice';
import HomePage from './components/HomePage';
import Final from './components/Final';

function App() { 
  const { authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();
// const url = "http://localhost:3005"
  const url = "https://chat-app-vkfw.onrender.com";
  
  useEffect(() => {
    let socketio;

    if (authUser) {
      socketio = io(url, {

      // socketio = io(`${process.env.REACT_APP_BACKEND_URL}`, {
        query: {
          userId: authUser._id
        }
      });

      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        socketio.close();
      };
    }

  }, [authUser, dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: authUser ? <Navigate to="/chat" /> : <Navigate to="/login" />
    },
    {
      path: "/login",
      element: authUser ? <Navigate to="/chat" /> : <Login url={url}/>
    },
    {
      path: "/signup",
      element: <Signup url={url} />
    },
    {
      path: "/chat",
      element: authUser ? <HomePage /> : <Navigate to="/login" />
    },
    {
      path: "/msg",
      element: authUser ? <Final /> : <Navigate to="/login" />
    },

  ],
  {
    future: {
      v7_startTransition: true,  // Enables React.startTransition for state updates
      v7_relativeSplatPath: true, // Updates relative route resolution within splat routes
    }
  }
);

  return (
    <RouterProvider router={router} />
  );
}

export default App;

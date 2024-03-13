import { View, Text } from 'react-native'
import React from 'react'
interface Errors {
   email?: string;
   password?: string;
   confirm?: string;
 }
export const validateForm = (email: string, password: string, confirmPass?: string) => {
   let formIsValid = true;
   const newErrors: Errors = {};

   if (!email) {
     newErrors.email = 'Vui lòng nhập email';
     formIsValid = false;
   } else if (!/\S+@\S+\.\S+/.test(email)) {
     newErrors.email = 'Email không hợp lệ';
     formIsValid = false;
   }

   if (!password) {
     newErrors.password = 'Vui lòng nhập mật khẩu';
     formIsValid = false;
   } else if (password.length < 6) {
     newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
     formIsValid = false;
   }

   if (password != confirmPass) {
     newErrors.confirm = 'Password không khớp';
   }

   return [formIsValid, newErrors];
}


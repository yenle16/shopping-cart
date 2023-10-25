import React, { useState } from 'react';
import styles from './UserCard.module.css';
import { UserProps } from '../../pages/admin/admin-manage-user/AdminManageUser';

export function UserCard(user: UserProps) {
  return (
    <div className={`flex items-center justify-between ${styles['card-item']}`}>
      <h3>FirstName: {user.name.firstname}</h3>
      <h3>LastName: {user.name.lastname}</h3>
      <h3>email: {user.email}</h3>
      <h3>username: {user.username}</h3>
      <h3>phone: {user.phone}</h3>
    </div>
  );
}

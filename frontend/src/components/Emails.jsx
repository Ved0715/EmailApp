import React, { useEffect, useState } from 'react'

import Email from './Email'
import useGetAllEmails from '../hooks/useGetAllEmails'
import { useSelector } from 'react-redux';
import { use } from 'react';

const Emails = () => {
  useGetAllEmails();
  const {emails , searchText} = useSelector(store => store.app);
  const [filterEmail , setFilterEmail] =useState(emails);

  useEffect(() => {
    const filterEmail =emails.filter((email)=> {
      return email.subject.toLowerCase().includes(searchText.toLowerCase()) || email.message.toLowerCase().includes(searchText.toLowerCase()) || email.to.toLowerCase().includes(searchText.toLowerCase())
    });
    setFilterEmail(filterEmail)
  },[searchText , emails])

  return (
    <div>
      {
        filterEmail && filterEmail?.map((email) => <Email key={email._id} email={email} />)
      }
    </div>
  )
}

export default Emails
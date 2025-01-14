import React, { useEffect } from 'react'

import Email from './Email'
import useGetAllEmails from '../hooks/useGetAllEmails'
import { useSelector } from 'react-redux';

const Emails = () => {
  useGetAllEmails();
  const {emails} = useSelector(store => store.app);
  return (
    <div>
      {
        emails && emails?.map((email) => <Email key={email._id} email={email} />)
      }
    </div>
  )
}

export default Emails
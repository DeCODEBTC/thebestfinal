import React, { useEffect } from 'react'
import { Navigate, Route, Routes as RouteDom, useNavigate } from 'react-router-dom'
import useAccessToken from '../hooks/useAccessToken'
import PeopleList from '../screens/protected/People/List'
import SignIn from '../screens/public/auth/SignIn'
import SignUp from '../screens/public/auth/SignUp'

const Routes: React.FC = () => {
  const { getAccessToken } = useAccessToken()
  const navigate = useNavigate()
  useEffect(() => {
    if (!getAccessToken()) {
      navigate('/auth/sign-in')
    }
  }, [])
  return (
    <>
      <RouteDom>
        <Route path="auth">
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route path="/" element={<PeopleList />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </RouteDom>
    </>
  )
}

export default Routes

import React from 'react'
import { Link } from 'react-router'
import DeleteProfile from './profileSettings/DeleteProfile'

const ProfileSetting = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <Link to={"/passwordChange"} className="bg-gray-300  text-center px-4 py-2 rounded">Change password</Link>
      <DeleteProfile/>
    </div>
  )
}

export default ProfileSetting
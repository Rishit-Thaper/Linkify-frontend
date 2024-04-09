import React from 'react'
import { AuthChecker } from '../libs/AuthChecker'

const CreateProfile = () => {
    AuthChecker();
  return (
    <div>CreateProfile</div>
  )
}

export default CreateProfile
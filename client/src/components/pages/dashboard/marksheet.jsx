import React from 'react'
import { useParams } from 'react-router-dom'
const Marksheet = () => {
  const { testId } = useParams()
  return <p>{testId}</p>
}
export default Marksheet
import React from 'react'
import { useParams } from "react-router-dom";

export const FacilityPages:React.FC = ():JSX.Element => {
    const params = useParams();
  return (
    <div>{params.facility}</div>
  )
}

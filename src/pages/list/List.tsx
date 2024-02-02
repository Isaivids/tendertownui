import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const List = () => {
  const params: any = useParams();
  const [pageName, setPageName] = useState<any>()
  useEffect(() => {
    setPageName(params.id)
  }, [params.id])
  
  return (
    <div>Here's your {pageName}</div>
  )
}

export default List
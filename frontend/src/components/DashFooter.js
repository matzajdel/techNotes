import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"

import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const DashFooter = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeButton = () => navigate('/dash')

    let goHomeButton = null
    if (pathname !== '/dash')
    {
        goHomeButton = (
          <button
              title="Home"
              className="dash-footer__button icon-button"
              onClick={onGoHomeButton}
          ><FontAwesomeIcon icon={faHouse} /></button>
        )
    }

    const content = (
      <footer className="dash-footer">
          {goHomeButton}
          <p>Current User:</p>
          <p>Status:</p>
      </footer>
    ) 

    return content
}

export default DashFooter
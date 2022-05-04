import React, { useContext } from 'react'
import Logo from '../logo'
import { ApiContext } from '@/presentation/contexts'

import Styles from './header-styles.scss'
import { useLogout } from '@/presentation/hooks'

const Header: React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext)
  const logout = useLogout()

  const handleLogout = (e: React.MouseEvent): void => {
    e.preventDefault()
    logout()
  }

  return (

    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="userName">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={handleLogout}> Sair </a>
        </div>
      </div>
    </header>
  )
}

export default Header

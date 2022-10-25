import './Sider.css'

import { Events24, Identification24, Power24, UserAvatar24 } from '@carbon/icons-react'

import AccountContext from '../contexts/AccountContext'
import FadeAnimation from '../components/FadeAnimation'
import Panel from '../components/Panel'
import PanelLink from '../components/PanelLink'
import PanelSection from '../components/PanelSection'
import React from 'react'
import axios from 'axios'
import getAccount from '../api/getAccount'
import { navigate } from '@reach/router'
import { toast } from 'react-toastify'

function Sider({ children }) {
  // SEND GET ACCOUNT REQUEST
  const has_token = localStorage.getItem('q-agri-web-token') ? true : false
  const Account = getAccount(has_token, { refreshInterval: 300000 })

  // INFORMATION STATE
  const [status, setStatus] = React.useState('loading')

  // ON FETCH ACCOUNT
  React.useEffect(() => {
    if (has_token && Account.loading) setStatus('loading')
    if (Account.error) setStatus('error')
    if (Account.data) setStatus('success')
  }, [Account.loading, Account.error, Account.data])

  // SEND SIGN OUT REQUEST
  function signOut() {
    const URL = process.env.BASE_URL + '/logout'
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-agri-web-token')}` } }

    axios
      .post(URL, null, CONFIG)
      .then((response) => {
        if (response.status === 204) {
          localStorage.removeItem('q-agri-web-token')
          navigate('/', { replace: true })
        } else if (response.status === 403) toast.error('User credential is forbidden')
        else if (response.status === 500) toast.error('Unexpected server error occurs')
      })
      .catch((error) => console.log(error))
  }

  // IF NO TOKEN, SIGN OUT
  if (!has_token) {
    navigate('/', { replace: true })
    location.reload()
  }

  // IF EXISTING ACCOUNT SESSION, SIGN OUT
  if (Account.error?.response?.status === 403) {
    localStorage.removeItem('q-agri-web-token')
    navigate('/', { replace: true })
    location.reload()
  }

  return (
    <FadeAnimation>
      <div className="sider">
        {status === 'success' && (
          <Panel>
            <PanelSection>
              <PanelLink to="/your-account" tooltip="Your Account">
                <UserAvatar24 />
              </PanelLink>
              <PanelLink permission="read_farmer" permissions={Account.data.permissions} to="/farmers" tooltip="Farmers">
                <Events24 />
              </PanelLink>
              {/* <PanelLink to="/settlement-area" tooltip="Settlement Area">
                <Hotel24 />
              </PanelLink>
              <PanelLink to="/population" tooltip="Population">
                <PedestrianFamily24 />
              </PanelLink>
              <PanelLink to="/agriculture" tooltip="Agriculture">
                <CropGrowth24 />
              </PanelLink>
              <PanelLink to="/road-lifeline" tooltip="Road Lifeline">
                <TrafficFlow24 />
              </PanelLink>
              <PanelLink to="/incidents" tooltip="Incidents">
                <TrafficIncident24 />
              </PanelLink>
              <PanelLink to="/evacuation" tooltip="Evacuation">
                <HealthCross24 />
              </PanelLink> */}
              <PanelLink permission="read_user" permissions={Account.data.permissions} to="/users" tooltip="User Accounts">
                <Identification24 />
              </PanelLink>
              <div className="panel-link" onClick={signOut} title="Sign Out">
                <Power24 />
              </div>
            </PanelSection>
          </Panel>
        )}
        <div>{Account.data && <AccountContext.Provider value={Account.data}>{children}</AccountContext.Provider>}</div>
      </div>
    </FadeAnimation>
  )
}

export default Sider

import './Sider.css'

import { CropGrowth24, Hotel24, Identification24, Industry24, TrafficIncident24 } from '@carbon/icons-react'
import { HealthCross24, PedestrianFamily24, Power24, TrafficFlow24, UserAvatar24 } from '@carbon/icons-react'

import FadeAnimation from '../components/FadeAnimation'
import Panel from '../components/Panel'
import PanelLink from '../components/PanelLink'
import PanelSection from '../components/PanelSection'
import React from 'react'
import { navigate } from '@reach/router'

function Sider({ children }) {
  return (
    <FadeAnimation>
      <div className="sider">
        <Panel>
          <PanelSection>
            <PanelLink to="/your-account" tooltip="Your Account">
              <UserAvatar24 />
            </PanelLink>
            <PanelLink to="/settlement-area" tooltip="Settlement Area">
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
            </PanelLink>
            <PanelLink to="/users" tooltip="User Accounts">
              <Identification24 />
            </PanelLink>
            <div className="panel-link" onClick={() => navigate('/', { replace: true })} title="Sign Out">
              <Power24 />
            </div>
          </PanelSection>
        </Panel>
        <div>{children}</div>
      </div>
    </FadeAnimation>
  )
}

export default Sider

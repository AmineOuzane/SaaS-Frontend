import React from 'react'
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import PinIcon from '@rsuite/icons/Pin';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';

const CustomSidenav = () => {
  return (
    <div style={{ width: 240 }}>
    <Sidenav defaultOpenKeys={['3', '4']}>
      <Sidenav.Body>
        <Nav activeKey="1">
          <Nav.Item eventKey="1" icon={<DashboardIcon />}>
            Tableau de bord
          </Nav.Item>

          <Nav.Menu eventKey="3" title="Demande d'approbation" icon={<PinIcon />}>
            <Nav.Item eventKey="3-1">Service</Nav.Item>
            <Nav.Item eventKey="3-2">Token</Nav.Item>
            <Nav.Item eventKey="3-3">Logs</Nav.Item>
          </Nav.Menu>

          <Nav.Menu eventKey="3" title="OTP" icon={<PinIcon />}>
            <Nav.Item eventKey="3-1">Service</Nav.Item>
            <Nav.Item eventKey="3-2">Token</Nav.Item>
            <Nav.Item eventKey="3-3">Logs</Nav.Item>
          </Nav.Menu>


          <Nav.Menu eventKey="3" title="Marketing SMS" icon={<PinIcon />}>
            <Nav.Item eventKey="3-1">Service</Nav.Item>
            <Nav.Item eventKey="3-2">Token</Nav.Item>
            <Nav.Item eventKey="3-3">Logs</Nav.Item>
          </Nav.Menu>

          <Nav.Menu eventKey="4" title="Settings" icon={<GearCircleIcon />}>
            <Nav.Item eventKey="4-1">Applications</Nav.Item>
            <Nav.Item eventKey="4-2">Channels</Nav.Item>
            <Nav.Item eventKey="4-3">Versions</Nav.Item>
            <Nav.Menu eventKey="4-5" title="Custom Action">
              <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
              <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
            </Nav.Menu>
          </Nav.Menu>

        </Nav>
      </Sidenav.Body>
    </Sidenav>
  </div>
  )
}

export default CustomSidenav
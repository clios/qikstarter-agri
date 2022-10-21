import './RoadTypeTable.css'

import React from 'react'

function RoadTypeTable() {
  return (
    <div className="frlfrtt">
      <p>Road Length (m) of Municipalities by Road Classification</p>
      <table>
        <thead>
          <tr>
            <th className="text-left">Municipalities</th>
            <th className="text-right">National Road</th>
            <th className="text-right">Provincial Road</th>
            <th className="text-right">Municipal Road</th>
            <th className="text-right">Barangay Road</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-blue">Aglipay</td>
            <td className="text-right">3,397</td>
            <td className="text-right">8,631</td>
            <td className="text-right">0</td>
            <td className="text-right">10,700</td>
          </tr>
          <tr>
            <td className="text-blue">Cabarroguis</td>
            <td className="text-right">0</td>
            <td className="text-right">63</td>
            <td className="text-right">0</td>
            <td className="text-right">2,748</td>
          </tr>
          <tr>
            <td className="text-blue">Diffun</td>
            <td className="text-right">0</td>
            <td className="text-right">0</td>
            <td className="text-right">0</td>
            <td className="text-right">0</td>
          </tr>
          <tr>
            <td className="text-blue">Maddela</td>
            <td className="text-right">21,253</td>
            <td className="text-right">5,010</td>
            <td className="text-right">454</td>
            <td className="text-right">8,7942</td>
          </tr>
          <tr>
            <td className="text-blue">Nagtipunan</td>
            <td className="text-right">177</td>
            <td className="text-right">0</td>
            <td className="text-right">0</td>
            <td className="text-right">1,817</td>
          </tr>
          <tr>
            <td className="text-blue">Saguday</td>
            <td className="text-right">0</td>
            <td className="text-right">0</td>
            <td className="text-right">0</td>
            <td className="text-right">0</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default RoadTypeTable

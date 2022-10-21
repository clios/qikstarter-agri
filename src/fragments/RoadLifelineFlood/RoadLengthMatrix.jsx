import './RoadLengthMatrix.css'

import React from 'react'

function RoadLengthMatrix() {
  return (
    <div className="frlfrlt">
      <p>Road Lifeline Matrix (m)</p>
      <table>
        <thead>
          <tr>
            <th className="text-left">Municipalities</th>
            <th className="text-left">Susceptibility</th>
            <th className="text-right">National Road</th>
            <th className="text-right">Provincial Road</th>
            <th className="text-right">Municipal Road</th>
            <th className="text-right">Barangay Road</th>
          </tr>
        </thead>
        <tbody>
          {/* AGLIPAY */}
          <tr>
            <td rowSpan={4} className="text-blue">
              Aglipay
            </td>
            <td className="text-red">Very High</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">0</td>
          </tr>
          <tr>
            <td className="text-orange">High</td>
            <td className="text-right text-orange">1,805</td>
            <td className="text-right text-orange">7,524</td>
            <td className="text-right text-orange">0</td>
            <td className="text-right text-orange">7,881</td>
          </tr>
          <tr>
            <td className="text-yellow">Moderate</td>
            <td className="text-right text-yellow">113</td>
            <td className="text-right text-yellow">1107</td>
            <td className="text-right text-yellow">0</td>
            <td className="text-right text-yellow">2,727</td>
          </tr>
          <tr>
            <td className="text-green">Low</td>
            <td className="text-right text-green">1,479</td>
            <td className="text-right text-green">0</td>
            <td className="text-right text-green">0</td>
            <td className="text-right text-green">92</td>
          </tr>
          {/* CABARROGUIS */}
          <tr>
            <td rowSpan={4} className="text-blue">
              Cabarroguis
            </td>
            <td className="text-red">Very High</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">0</td>
          </tr>
          <tr>
            <td className="text-orange">High</td>
            <td className="text-right text-orange">0</td>
            <td className="text-right text-orange">63</td>
            <td className="text-right text-orange">0</td>
            <td className="text-right text-orange">2,748</td>
          </tr>
          <tr>
            <td className="text-yellow">Moderate</td>
            <td className="text-right text-yellow">0</td>
            <td className="text-right text-yellow">0</td>
            <td className="text-right text-yellow">0</td>
            <td className="text-right text-yellow">0</td>
          </tr>
          <tr>
            <td className="text-green">Low</td>
            <td className="text-right text-green">0</td>
            <td className="text-right text-green">0</td>
            <td className="text-right text-green">0</td>
            <td className="text-right text-green">0</td>
          </tr>
          {/* DIFFUN */}
          <tr>
            <td rowSpan={4} className="text-blue">
              Diffun
            </td>
            <td className="text-red">Very High</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">0</td>
          </tr>
          <tr>
            <td className="text-orange">High</td>
            <td className="text-right text-orange">0</td>
            <td className="text-right text-orange">0</td>
            <td className="text-right text-orange">0</td>
            <td className="text-right text-orange">0</td>
          </tr>
          <tr>
            <td className="text-yellow">Moderate</td>
            <td className="text-right text-yellow">0</td>
            <td className="text-right text-yellow">0</td>
            <td className="text-right text-yellow">0</td>
            <td className="text-right text-yellow">0</td>
          </tr>
          <tr>
            <td className="text-green">Low</td>
            <td className="text-right text-green">0</td>
            <td className="text-right text-green">0</td>
            <td className="text-right text-green">0</td>
            <td className="text-right text-green">0</td>
          </tr>
          {/* MADDELA */}
          <tr>
            <td rowSpan={4} className="text-blue">
              Maddela
            </td>
            <td className="text-red">Very High</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">0</td>
          </tr>
          <tr>
            <td className="text-orange">High</td>
            <td className="text-right text-orange">569</td>
            <td className="text-right text-orange">623</td>
            <td className="text-right text-orange">0</td>
            <td className="text-right text-orange">6,459</td>
          </tr>
          <tr>
            <td className="text-yellow">Moderate</td>
            <td className="text-right text-yellow">6,472</td>
            <td className="text-right text-yellow">1,641</td>
            <td className="text-right text-yellow">454</td>
            <td className="text-right text-yellow">25,131</td>
          </tr>
          <tr>
            <td className="text-green">Low</td>
            <td className="text-right text-green">14,212</td>
            <td className="text-right text-green">2,746</td>
            <td className="text-right text-green">0</td>
            <td className="text-right text-green">295</td>
          </tr>
          {/* NAGTIPUNAN */}
          <tr>
            <td rowSpan={4} className="text-blue">
              Nagtipunan
            </td>
            <td className="text-red">Very High</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">1153</td>
          </tr>
          <tr>
            <td className="text-orange">High</td>
            <td className="text-right text-orange">0</td>
            <td className="text-right text-orange">0</td>
            <td className="text-right text-orange">0</td>
            <td className="text-right text-orange">369</td>
          </tr>
          <tr>
            <td className="text-yellow">Moderate</td>
            <td className="text-right text-yellow">0</td>
            <td className="text-right text-yellow">0</td>
            <td className="text-right text-yellow">0</td>
            <td className="text-right text-yellow">0</td>
          </tr>
          <tr>
            <td className="text-green">Low</td>
            <td className="text-right text-green">177</td>
            <td className="text-right text-green">0</td>
            <td className="text-right text-green">0</td>
            <td className="text-right text-green">295</td>
          </tr>
          {/* SAGUDAY */}
          <tr>
            <td rowSpan={4} className="text-blue">
              Saguday
            </td>
            <td className="text-red">Very High</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">0</td>
          </tr>
          <tr>
            <td className="text-orange">High</td>
            <td className="text-right text-orange">0</td>
            <td className="text-right text-orange">0</td>
            <td className="text-right text-orange">0</td>
            <td className="text-right text-orange">0</td>
          </tr>
          <tr>
            <td className="text-yellow">Moderate</td>
            <td className="text-right text-yellow">0</td>
            <td className="text-right text-yellow">0</td>
            <td className="text-right text-yellow">0</td>
            <td className="text-right text-yellow">0</td>
          </tr>
          <tr>
            <td className="text-green">Low</td>
            <td className="text-right text-green">0</td>
            <td className="text-right text-green">0</td>
            <td className="text-right text-green">0</td>
            <td className="text-right text-green">0</td>
          </tr>
          <tr className="footer">
            <th className="text-left">Municipalities</th>
            <th className="text-left">Susceptibility</th>
            <th className="text-right">National Road</th>
            <th className="text-right">Provincial Road</th>
            <th className="text-right">Municipal Road</th>
            <th className="text-right">Barangay Road</th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default RoadLengthMatrix

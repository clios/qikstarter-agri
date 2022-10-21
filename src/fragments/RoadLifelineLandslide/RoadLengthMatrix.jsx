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
            <td className="text-right text-red">1,692</td>
            <td className="text-right text-red">0</td>
            <td className="text-right text-red">1,630</td>
          </tr>
          <tr>
            <td className="text-orange">High</td>
            <td className="text-right text-orange">8,713</td>
            <td className="text-right text-orange">14,513</td>
            <td className="text-right text-orange">0</td>
            <td className="text-right text-orange">45,879</td>
          </tr>
          <tr>
            <td className="text-yellow">Moderate</td>
            <td className="text-right text-yellow">20,796</td>
            <td className="text-right text-yellow">19,850</td>
            <td className="text-right text-yellow">491</td>
            <td className="text-right text-yellow">73,654</td>
          </tr>
          <tr>
            <td className="text-green">Low</td>
            <td className="text-right text-green">9,405</td>
            <td className="text-right text-green">32,309</td>
            <td className="text-right text-green">3,267</td>
            <td className="text-right text-green">77,556</td>
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
            <td className="text-right text-orange">13,148</td>
            <td className="text-right text-orange">0</td>
            <td className="text-right text-orange">6,689</td>
          </tr>
          <tr>
            <td className="text-yellow">Moderate</td>
            <td className="text-right text-yellow">1,762</td>
            <td className="text-right text-yellow">47,692</td>
            <td className="text-right text-yellow">1,342</td>
            <td className="text-right text-yellow">7,843</td>
          </tr>
          <tr>
            <td className="text-green">Low</td>
            <td className="text-right text-green">6,014</td>
            <td className="text-right text-green">15,852</td>
            <td className="text-right text-green">5,757</td>
            <td className="text-right text-green">6,119</td>
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
            <td className="text-right text-orange">1,177</td>
            <td className="text-right text-orange">18,350</td>
            <td className="text-right text-orange">0</td>
            <td className="text-right text-orange">44,189</td>
          </tr>
          <tr>
            <td className="text-yellow">Moderate</td>
            <td className="text-right text-yellow">740</td>
            <td className="text-right text-yellow">51,620</td>
            <td className="text-right text-yellow">5,451</td>
            <td className="text-right text-yellow">96,653</td>
          </tr>
          <tr>
            <td className="text-green">Low</td>
            <td className="text-right text-green">10,408</td>
            <td className="text-right text-green">37,855</td>
            <td className="text-right text-green">34,261</td>
            <td className="text-right text-green">91,080</td>
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
            <td className="text-right text-orange">18,722</td>
            <td className="text-right text-orange">4,497</td>
            <td className="text-right text-orange">479</td>
            <td className="text-right text-orange">26,442</td>
          </tr>
          <tr>
            <td className="text-yellow">Moderate</td>
            <td className="text-right text-yellow">7,749</td>
            <td className="text-right text-yellow">23,388</td>
            <td className="text-right text-yellow">530</td>
            <td className="text-right text-yellow">49,318</td>
          </tr>
          <tr>
            <td className="text-green">Low</td>
            <td className="text-right text-green">11,116</td>
            <td className="text-right text-green">9,258</td>
            <td className="text-right text-green">2,247</td>
            <td className="text-right text-green">41,565</td>
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
            <td className="text-right text-red">0</td>
          </tr>
          <tr>
            <td className="text-orange">High</td>
            <td className="text-right text-orange">31,422</td>
            <td className="text-right text-orange">7,956</td>
            <td className="text-right text-orange">9,266</td>
            <td className="text-right text-orange">26,939</td>
          </tr>
          <tr>
            <td className="text-yellow">Moderate</td>
            <td className="text-right text-yellow">31,975</td>
            <td className="text-right text-yellow">9,271</td>
            <td className="text-right text-yellow">15,326</td>
            <td className="text-right text-yellow">38,832</td>
          </tr>
          <tr>
            <td className="text-green">Low</td>
            <td className="text-right text-green">6,015</td>
            <td className="text-right text-green">676</td>
            <td className="text-right text-green">2,823</td>
            <td className="text-right text-green">13,254</td>
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
            <td className="text-right text-yellow">918</td>
            <td className="text-right text-yellow">0</td>
            <td className="text-right text-yellow">4,104</td>
          </tr>
          <tr>
            <td className="text-green">Low</td>
            <td className="text-right text-green">13,001</td>
            <td className="text-right text-green">29,766</td>
            <td className="text-right text-green">5,318</td>
            <td className="text-right text-green">51,236</td>
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

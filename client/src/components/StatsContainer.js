import { useAppContext } from '../context/appContext'
import StatsItems from './StatsItems'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'
const StatsContainer = () => {
  const { stats } = useAppContext()
  const defaultStats = [
    {
      title: 'Pending applications',
      count: stats.Pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Interviews scheduled',
      count: stats.Interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'Declined',
      count: stats.Declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },

    {
      title: 'Declined',
      count: stats.Accept || 0,
      icon: <FaBug />,
      color: 'white',
      bcg: 'green',
    },
  ]

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatsItems key={index} {...item} />
      })}
    </Wrapper>
  )
}

export default StatsContainer
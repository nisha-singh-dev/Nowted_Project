
import Recent from './Recent'
import Header from './Header'
import Folder from './Folder'
import More from './More'

const Sidebar = () => {
  return (
    <div className='w-2/10 h-screen bg-gray-950 text-white pb-4 flex flex-col justify-between'>
        
        <Header />
        <Recent />
        <Folder />
        <More />
    </div>
  )
}

export default Sidebar

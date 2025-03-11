import noteview from "../../assets/noteview.svg"
const Defaultnotecontent = () => {
  return (
    <div className='flex flex-col items-center w-6/10 bg-gray-950 justify-center h-screen text-center px-4'>
      <img src={noteview} alt="" />
      <div className='text-2xl text-white font-bold'>Select a note to view</div>
      <div className='text-sm text-gray-500'>Choose a note from the list on the left to view its contents, or create a new note to add to your collection.</div>
    </div>
  )
}

export default Defaultnotecontent

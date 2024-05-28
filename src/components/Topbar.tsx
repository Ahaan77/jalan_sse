const Topbar = () => {

    return (
        <div style={{ zIndex: 9999 }} className='h-20 border-b border-white bg-stone-200 border-opacity-20 sticky top-0 flex items-center justify-between'>
            <div className='text-black text-xl lg:text-2xl lg:mx-10 mx-5 font-bold'>
                Roof Selector
            </div>
            <div className="mr-10">
                Powered by Ahaan 👨🏼‍💻
            </div>
        </div>
    )
}

export default Topbar
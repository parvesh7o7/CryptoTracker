import { Oval } from 'react-loader-spinner'
function Loader() {
    return (
        <>
            <div className="loader">
                <Oval
                    height={80}
                    width={80}
                    color="#00f2fe"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="rgba(0, 242, 254, 0.2)"
                    strokeWidth={3}
                    strokeWidthSecondary={4}
                />
            </div>
        </>
    )
}
export default Loader;
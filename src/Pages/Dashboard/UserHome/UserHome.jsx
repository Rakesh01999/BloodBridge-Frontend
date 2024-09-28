
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/images/bb.png"

const UserHome = () => {
    const { user } = useAuth();
    return (
        <div>
            <div className="p-4 flex flex-col items-center">
                <h2 className="text-xl md:text-3xl lg:text-4xl mt-20 text-center mx-auto">
                    <span >Hi </span>
                    <span className="font-bold">
                        {
                            user?.displayName ? user.displayName : 'Back'
                        }
                    </span>
                </h2>
                <div className="w-full max-w-lg">
                    <div>
                        <div data-aos="zoom-out-right">
                            <h2 className="text-2xl text-center my-4">
                                Welcome to Blood Bridge .
                            </h2>
                            <h2 className="text-xl text-center mb-4">
                                Donate <span className="font-bold text-red-500">Blood</span>  Save life .
                            </h2>
                        </div>
                    </div>
                </div>
                <div data-aos="zoom-out-down">
                    <div className="flex justify-center">
                        <img src={logo} className="w-[500px]" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
